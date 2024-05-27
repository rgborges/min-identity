import { PrismaClient } from "@prisma/client";
import { User } from "../model/user.model";
import { Guid } from "guid-typescript";
import { Roles } from "../model/roles";


export class UserRespository {
      db: PrismaClient;
      constructor(db: PrismaClient) {
            this.db = db;
      }

      async insertUser(user: User) {
            try {
                  const newUser = await this.db.rootUsers.create({
                        data: {
                              fullname: user.name + ' ' + user.surName,
                              email: user.email,
                              locked: false,
                        }
                  })

                  user.id = Guid.parse(newUser.id);

                  return user;

            } catch (err) {
                  console.log(err);
            }
      }
      async get(): Promise<Object[]> {
            return await this.db.rootUsers.findMany();
      }

      async getByEmail(searchedEmail: string): Promise<any> {
            try {
                  const data = await this.db.rootUsers.findUnique({
                        where: {
                              email: searchedEmail
                        }
                  })
                  return data;

            } catch (err) {
                  console.log(err)
            }

      }

      async getById(id: string): Promise<any> {
            try {
                  const data = await this.db.rootUsers.findUnique({
                        where: {
                              id: id 
                        }
                  })
                  return data;

            } catch (err) {
                  console.log(err)
            }

      }
}