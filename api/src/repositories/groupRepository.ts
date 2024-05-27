import { Groups, Organizations, PrismaClient } from "@prisma/client";
/*
* Store/Read Group data from the Prisma ORM repository.
*/
export class GroupRespository {

      db: PrismaClient;
      constructor(db: PrismaClient) {
            this.db = db;
      }

      async insertGroup(group: Groups, organization: Organizations) {
            
      }
}