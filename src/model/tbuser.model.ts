import { Guid } from "guid-typescript";
import { geteuid } from "process";

export class User {
      id: Guid;
      name: string;
      surName: string;
      email: string;
      /**
       *
       */
      constructor(name: string, surName: string, email: string) {
            this.id = Guid.create();
            this.name = name;
            this.email = email;
            this.surName = surName;
      }
}