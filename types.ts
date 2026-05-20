
export enum ServiceType {
  BRICK = 'brick',
  BLOCK = 'block',
  VENEER = 'veneer',
  RETAINING = 'retaining'
}

export interface QuoteRates {
  labour: Record<ServiceType, number>;
  materials: Record<ServiceType, number>;
  taxRate: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}
