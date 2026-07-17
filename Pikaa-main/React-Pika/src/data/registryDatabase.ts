export interface BusinessRegistryEntry {
  company_name: string;
  legal_form: string;
  region: string;
  city: string;
  postal_code: string;
  address_line: string;
}

export const registryDatabase: Record<string, Record<string, BusinessRegistryEntry>> = {
  AL: {
    K12345678A: {
      company_name: 'ELITA DIGITAL SH.P.K.',
      legal_form: 'Shoqëri me Përgjegjësi të Kufizuar (SH.P.K.)',
      region: 'Tiranë',
      city: 'Bashkia Tiranë',
      postal_code: '1001',
      address_line: 'Bulevardi Dëshmorët e Kombit, Ndërtesa 14, Hyrja 2',
    },
    L98765432B: {
      company_name: 'VALA CONSULTING',
      legal_form: 'Person Fizik (Sole Proprietorship)',
      region: 'Durrës',
      city: 'Bashkia Durrës',
      postal_code: '2001',
      address_line: 'Rruga Taulantia, Pallati 5, Kati 3',
    },
  },
  KS: {
    330123456: {
      company_name: 'DARDANIA TECH SH.P.K.',
      legal_form: 'Shoqëri me Përgjegjësi të Kufizuar (SH.P.K.)',
      region: 'Rajoni i Prishtinës',
      city: 'Prishtinë',
      postal_code: '10000',
      address_line: 'Rruga Nëna Terezë, Hyrja A, Nr. 45',
    },
    530654321: {
      company_name: 'KOSOVA COMMERCE B.I.',
      legal_form: 'Biznes Individual (B.I.)',
      region: 'Rajoni i Prizrenit',
      city: 'Prizren',
      postal_code: '20000',
      address_line: 'Rruga e Shadervanit, Nr. 12',
    },
  },
};
