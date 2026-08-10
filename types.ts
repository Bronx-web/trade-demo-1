
export enum ServiceType {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  NETWORKING = 'networking',
  SOLAR = 'solar'
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
