export interface IProduct {
  id: string;
  title: string;
  description: string;
  status: Status;
}

export enum Status {
  'ACTIVE' = 'active',
  'INACTIVE' = 'inactive',
}
