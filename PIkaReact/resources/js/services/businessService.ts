import { registryDatabase, BusinessRegistryEntry } from '../data/registryDatabase';

export function fetchBusinessData(country: string, fiscalNumber: string): Promise<BusinessRegistryEntry> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const countryDB = registryDatabase[country];
      const matched = countryDB ? countryDB[fiscalNumber] : null;
      if (matched) {
        resolve(matched);
      } else {
        reject(
          new Error(
            "Kërkimi dështoi. Ky numër nuk u gjet në regjistrat tanë të testimit. (Përdorni shembujt e sugjeruar)"
          )
        );
      }
    }, 1000);
  });
}
