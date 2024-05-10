import { decode, encode, TAlgorithm } from "jwt-simple";
import { DecodeResult, ISession } from "../model/session.model";
import exp from "constants";

export interface IEncodeResult {
      token?: string;
      expires?: number;
      issued?: number;
}
export function encodeSession(secretKey: string, partialSession: ISession) : IEncodeResult {
   const algorithm: TAlgorithm = "HS512";

   const issued = Date.now();
   const fiteenMinutesInMs = 15 * 60 * 1000;
   const expires = issued + fiteenMinutesInMs;
   const session: ISession = {
      ...partialSession,
      createdAt: issued,
      expiresAt: expires
   };

   return {
      token: encode(session, secretKey, algorithm),
      issued: issued,
      expires: expires
   };
}


export function decodeSession(secretKey: string, tokenString: string):  DecodeResult {
   const algorithm: TAlgorithm = "HS256";

   let result: ISession;

   try {
      result = decode(tokenString, secretKey, false, algorithm)
   } catch (err: any) {

      if (err.message === "No token supplied" || err.message === "Not enough or too many segments") {
         return {
            type: "invalid-token"
         };
      }

      if (err.message === "Signature verification failed" || err.message === "Algorithm not suported") {
         return {
            type: "integrit-error"
         };
      }

      if (err.message.indexOf("Unexpected token") === 0) {
         return {
            type: "invalid-token"
         }
      }
      throw err;
   }
   return {
      type: "valid",
      session: result
   }
}