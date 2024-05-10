import { Guid } from "guid-typescript";
import { date } from "zod";

export interface ISession {
       id: String;
       username: String;
       createdAt?: number;
       expiresAt?: number;
}


export type PartialSession = Omit<ISession, "issued" | "expires">;


export type DecodeResult = 
| {
      type: "valid";
      session: ISession;
} |
{
      type: "integrit-error";
}
| {
      type: "invalid-token";
}

export type ExpirationStatus = "expired" | "active" | "grace";

export class createSession {
      create(secret: String, username: string) : ISession {
            return {
                  id: Guid.create().toString(),
                  username: username,
            };
      }
}