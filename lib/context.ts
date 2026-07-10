import type { MainCompany, Subsidiary, BusinessFunction, Persona } from './types'

export interface Option<T extends string> {
  id: T
  name: string
}

export const MAIN_COMPANIES: Option<MainCompany>[] = [
  { id: 'hlmg_management', name: 'HLMG Management Co.' },
  { id: 'hong_leong_industries', name: 'Hong Leong Industries Berhad' },
  { id: 'hume_cement_industries', name: 'Hume Cement Industries Berhad' },
  { id: 'malaysian_pacific_industries', name: 'Malaysian Pacific Industries' },
]

export const MAIN_COMPANY_LABELS: Record<MainCompany, string> = {
  hlmg_management: 'HLMG Management Co.',
  hong_leong_industries: 'Hong Leong Industries Berhad',
  hume_cement_industries: 'Hume Cement Industries Berhad',
  malaysian_pacific_industries: 'Malaysian Pacific Industries',
}

export const SUBSIDIARY_LABELS: Record<Subsidiary, string> = {
  hong_leong_yamaha_motor: 'Hong Leong Yamaha Motor',
  hong_leong_yamaha_marine: 'Hong Leong Yamaha Marine',
  guocera: 'Guocera Sdn Bhd',
  gencode: 'GenCode',
  hume_cement: 'Hume Cement',
  carsem_malaysia: 'Carsem Malaysia',
  carsem_bangkok: 'Carsem Bangkok',
  carsem_china: 'Carsem China',
}

export const SUBSIDIARIES_BY_COMPANY: Record<MainCompany, Option<Subsidiary>[]> = {
  hlmg_management: [],
  hong_leong_industries: [
    { id: 'hong_leong_yamaha_motor', name: SUBSIDIARY_LABELS.hong_leong_yamaha_motor },
    { id: 'hong_leong_yamaha_marine', name: SUBSIDIARY_LABELS.hong_leong_yamaha_marine },
    { id: 'guocera', name: SUBSIDIARY_LABELS.guocera },
    { id: 'gencode', name: SUBSIDIARY_LABELS.gencode },
  ],
  hume_cement_industries: [{ id: 'hume_cement', name: SUBSIDIARY_LABELS.hume_cement }],
  malaysian_pacific_industries: [
    { id: 'carsem_malaysia', name: SUBSIDIARY_LABELS.carsem_malaysia },
    { id: 'carsem_bangkok', name: SUBSIDIARY_LABELS.carsem_bangkok },
    { id: 'carsem_china', name: SUBSIDIARY_LABELS.carsem_china },
  ],
}

export const BUSINESS_FUNCTIONS: Option<BusinessFunction>[] = [
  { id: 'general_management', name: 'General Management' },
  { id: 'support_functions', name: 'Support Functions (Finance, IT, HR, Legal, IA, CoSec)' },
  { id: 'sales_marketing_commercial_customer_service', name: 'Sales/Marketing/Commercial/Customer Service' },
  { id: 'manufacturing_supply_chain_operations_logistics', name: 'Manufacturing/Supply Chain/Operations/Logistics' },
  { id: 'digital_solutions_delivery', name: 'Digital Solutions Delivery' },
]

export const BUSINESS_FUNCTION_LABELS: Record<BusinessFunction, string> = {
  general_management: 'General Management',
  support_functions: 'Support Functions',
  sales_marketing_commercial_customer_service: 'Sales/Marketing/Commercial/Customer Service',
  manufacturing_supply_chain_operations_logistics: 'Manufacturing/Supply Chain/Operations/Logistics',
  digital_solutions_delivery: 'Digital Solutions Delivery',
}

export const PERSONAS: Option<Persona>[] = [
  { id: 'senior_leadership', name: 'Senior Leadership (CXO/VP)' },
  { id: 'people_managers', name: 'People Managers (Director/Senior Manager)' },
  { id: 'manager_executive', name: 'Manager/Executive' },
]

export const PERSONA_LABELS: Record<Persona, string> = {
  senior_leadership: 'Senior Leadership (CXO/VP)',
  people_managers: 'People Managers (Director/Senior Manager)',
  manager_executive: 'Manager/Executive',
}

export function companyLabel(company: { mainCompany: MainCompany; subsidiary: Subsidiary | null }): string {
  const mainName = MAIN_COMPANY_LABELS[company.mainCompany]
  if (!company.subsidiary) return mainName
  return `${mainName} — ${SUBSIDIARY_LABELS[company.subsidiary]}`
}
