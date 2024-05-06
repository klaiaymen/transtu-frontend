import {AppUser} from "../../user/model/user.model";

export enum MtType{
  metro,bus,tgm
}
export interface MoyenTransport{
  id:number;
  label:string;
  code:string;
  type:MtType;
  assignedToDistrict: boolean;
  assignedToLigne: boolean;
  disabled:boolean;
  users: AppUser[]
}
