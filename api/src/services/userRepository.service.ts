import { PrismaClient } from "@prisma/client";
import { User } from "../model/tbuser.model";
import { Guid } from "guid-typescript";


export class UserRespository {
      db: PrismaClient;
      constructor(db: PrismaClient) {
            this.db = db;
      }

      async insertUser(user: User) {
            try {
                  const newUser = await this.db.user.create({
                        data: {
                              fullname: user.name + ' ' + user.surName,
                              email: user.email,
                              locked: false
                        }
                  })

                  user.id = Guid.parse(newUser.id);

                  return user;

            } catch (err) {
                  console.log(err);
            }
      }
      async get(): Promise<Object[]> {
            return await this.db.user.findMany();
      }

      async getByEmail(searchedEmail: string): Promise<any> {
            try {
                  const data = await this.db.user.findUnique({
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
                  const data = await this.db.user.findUnique({
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