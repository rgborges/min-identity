import { Organizations, Prisma, PrismaClient } from "@prisma/client";
import { Guid } from "guid-typescript";

export class OrganizationRepository {
      
      _db: PrismaClient;
      constructor(db: PrismaClient) {
           this._db = db; 
      }
      async insert(organization: Organizations): Promise<any> {
            try {
                  await this._db.organizations.create({
                        data: {
                              id: Guid.create().toString(),
                              domainName: organization.domainName,
                              ownerId: organization.ownerId,
                        }
                  })
                  return organization;
            } catch (err) {
                  throw err;
            }
      }
      async getAll() : Promise<Object[]> {
            return await this._db.organizations.findMany();
      }
}