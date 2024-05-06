import {MoyenTransport} from "../../moyens-transport/model/moyenTransport.model";
import {AppRole} from "../../role/model/role.model";
export interface AppUser {
  userId?: number|undefined;
  username?: string;
  password?: string|undefined;
  email?: string|undefined;
  tel?: string|undefined;
  roles?: AppRole[];
  moyenTransport?: MoyenTransport;
  assignedToMt?: boolean;
  disabled:boolean;
}
