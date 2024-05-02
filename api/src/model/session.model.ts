export interface ISession {
       id: String;
       username: String;
       createdAt: number;
       expiresAt: number;
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