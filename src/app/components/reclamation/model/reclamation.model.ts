export interface Reclamation {
  id: number;
  state: string;
  reportingSourceEtat: string;
  reportingSourceTel: string;
  reportingSourceNomPrenom: string;
  lieu: string;
  //heure: string;
  typeAccidentIncident: string;
  typeDegat: string;
  notes: string;
  photos?: PhotoReclamation[];
}

export interface PhotoReclamation {
  id?: number;
  nom: string;
  url: string;
}
