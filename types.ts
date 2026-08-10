
/**
 * ServiceType / QuoteRates are unused on this client — the booking page runs a
 * triage form rather than a quote calculator (see components/TriageForm.tsx).
 * Kept because the template still supports rate-based quoting for trades that
 * genuinely price by area.
 */
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
