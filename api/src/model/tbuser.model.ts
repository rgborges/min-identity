import { Guid } from "guid-typescript";
import { geteuid } from "process";
import { Roles } from "./roles";

export class User {
      id: Guid;
      name: string;
      surName: string;
      email: string;
      role: Roles;
      
      constructor(name: string, surName: string, email: string, role: Roles = Roles.USER) {
            this.id = Guid.create();
            this.name = name;
            this.email = email;
            this.surName = surName;
            this.role = role;
      }
/**
 * Attach the ID returned from the database.
 */
      attachExternalId(uuid: Guid) {
            this.id = uuid;
      }
}
