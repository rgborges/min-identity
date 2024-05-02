import { encode, TAlgorithm } from "jwt-simple";
import { ISession } from "../model/session.model";
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