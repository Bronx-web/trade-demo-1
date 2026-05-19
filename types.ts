
export type ServiceType = 'brick' | 'block' | 'veneer' | 'retaining';

export interface RateConfig {
  labor: Record<ServiceType, number>;
  materials: Record<ServiceType, number>;
  taxRate: number;
}

export interface QuoteData {
  serviceType: ServiceType;
  area: number;
  complexity: number;
  includeMaterials: boolean;
}

export interface QuoteBreakdown {
  laborCost: number;
  materialCost: number;
  subtotal: number;
  tax: number;
  total: number;
}
