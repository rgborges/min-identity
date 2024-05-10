import { PrismaClient } from "@prisma/client";
import { ISession } from "../model/session.model";
import { User } from "../model/user.model";

export class SessionRespository {
      _connection: PrismaClient;
      constructor(connection: PrismaClient) {
            this._connection = connection;
      }

      async insertSession(session: ISession) {
            //TODO: Register the session into database
      }
      async removeSession(session: ISession) {
            //TODO: Remove a session
      }
      async getSession(user: User) {

      }
      
}