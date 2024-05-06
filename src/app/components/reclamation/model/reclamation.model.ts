import {AppUser} from "../../user/model/user.model";

export interface Reclamation {
  id: number;
  state: string;
  reportingSourceEtat: string;
  reportingSourceTel: string;
  reportingSourceNomPrenom: string;
  lieu: string;
  date: string;
  typeAccidentIncident: string;
  typeDegat: string;
  notes: string;
  photos?: PhotoReclamation[];
  district:string;
  codeMt:string;
  user: AppUser;
}

export interface PhotoReclamation {
  id?: number;
  nom: string;
  url: string;
}
