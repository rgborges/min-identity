import { User } from "../model/tbuser.model";


export class userRepository {
      _db: any;
      constructor(db: any) {
            this._db = db;
      }

      insertUser(user: User) {
      }



}