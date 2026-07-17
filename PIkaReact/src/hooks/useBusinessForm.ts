import { useState } from 'react';
import { fetchBusinessData } from '../services/businessService';

export interface FormData {
  admin_name: string;
  admin_email: string;
  admin_password: string;
  admin_password_confirm: string;
  country: string;
  fiscal_number: string;
  legal_form: string;
  company_name: string;
  brand_name: string;
  region: string;
  city: string;
  address_line: string;
  postal_code: string;
  company_phone: string;
  company_website: string;
  uploaded_document: string;
  agree_terms: boolean;
}

const initialFormData: FormData = {
  admin_name: '',
  admin_email: '',
  admin_password: '',
  admin_password_confirm: '',
  country: '',
  fiscal_number: '',
  legal_form: '',
  company_name: '',
  brand_name: '',
  region: '',
  city: '',
  address_line: '',
  postal_code: '',
  company_phone: '',
  company_website: '',
  uploaded_document: '',
  agree_terms: false,
};

export function useBusinessForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 5;

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const selectCountry = (countryCode: string) => {
    setFormData((prev) => ({
      ...prev,
      country: countryCode,
      fiscal_number: '',
      company_name: '',
      legal_form: '',
      region: '',
      city: '',
      address_line: '',
      postal_code: '',
    }));
    setIsFetched(false);
    setErrorMessage(null);
  };

  const handleSearch = async () => {
    const fiscal = formData.fiscal_number.trim().toUpperCase();

    if (!fiscal) {
      setErrorMessage("Ju lutem shkruani NIPT ose NUI për të kërkuar.");
      return;
    }

    // Format validation
    if (formData.country === 'AL') {
      const niptPattern = /^[A-Z]\d{8}[A-Z]$/i;
      if (!niptPattern.test(fiscal)) {
        setErrorMessage("Formati i NIPT është i gabuar. Duhet të jetë si: K12345678A");
        return;
      }
    } else if (formData.country === 'KS') {
      const nuiPattern = /^\d{9}$/;
      if (!nuiPattern.test(fiscal)) {
        setErrorMessage("NUI duhet të ketë saktësisht 9 shifra (p.sh. 330123456).");
        return;
      }
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const matched = await fetchBusinessData(formData.country, fiscal);
      setFormData((prev) => ({
        ...prev,
        fiscal_number: fiscal,
        company_name: matched.company_name,
        legal_form: matched.legal_form,
        region: matched.region,
        city: matched.city,
        postal_code: matched.postal_code,
        address_line: matched.address_line,
      }));
      setIsFetched(true);
    } catch (error: any) {
      setErrorMessage(error.message || "Kërkimi dështoi.");
      setIsFetched(false);
    } finally {
      setIsLoading(false);
    }
  };

  const validateStep = (step: number): boolean => {
    setErrorMessage(null);

    if (step === 1) {
      const { admin_name, admin_email, admin_password, admin_password_confirm } = formData;
      if (!admin_name.trim() || !admin_email.trim() || !admin_password || !admin_password_confirm) {
        setErrorMessage("Ju lutemi plotësoni të gjitha fushat e kërkuara për llogarinë.");
        return false;
      }
      if (admin_password !== admin_password_confirm) {
        setErrorMessage("Fjalëkalimet nuk përputhen.");
        return false;
      }
      if (admin_password.length < 8) {
        setErrorMessage("Fjalëkalimi duhet të jetë së paku 8 karaktere.");
        return false;
      }
    }

    if (step === 2) {
      if (!formData.country) {
        setErrorMessage("Ju lutemi zgjidhni njërin nga shtetet për të vazhduar.");
        return false;
      }
    }

    if (step === 3) {
      if (!isFetched) {
        setErrorMessage("Duhet të kërkoni dhe auto-plotësoni të dhënat e biznesit përmes NIPT/NUI.");
        return false;
      }
    }

    if (step === 4) {
      const { company_phone, uploaded_document } = formData;
      if (!company_phone.trim()) {
        setErrorMessage("Ju lutem shkruani numrin e telefonit të biznesit.");
        return false;
      }
      if (!uploaded_document) {
        setErrorMessage("Ju lutem ngarkoni dokumentin e kërkuar.");
        return false;
      }
    }

    if (step === 5) {
      if (!formData.agree_terms) {
        setErrorMessage("Duhet të konfirmoni saktësinë e të dhënave për të përfunduar.");
        return false;
      }
    }

    return true;
  };

  const navigateStep = (direction: number) => {
    const nextStep = currentStep + direction;

    if (direction > 0 && !validateStep(currentStep)) {
      return;
    }

    if (nextStep < 1 || nextStep > totalSteps + 1) return;

    if (nextStep === totalSteps + 1) {
      setIsSubmitted(true);
      return;
    }

    setCurrentStep(nextStep);
  };

  const simulateUpload = () => {
    const fileName = formData.country === 'AL' ? 'QKB_Ekstrakt_Kopje.pdf' : 'ARBK_Certifikate.pdf';
    setField('uploaded_document', fileName);
    setErrorMessage(null);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setIsFetched(false);
    setIsLoading(false);
    setErrorMessage(null);
    setIsSubmitted(false);
  };

  return {
    formData,
    currentStep,
    totalSteps,
    isFetched,
    isLoading,
    errorMessage,
    isSubmitted,
    setField,
    selectCountry,
    handleSearch,
    navigateStep,
    simulateUpload,
    resetForm,
    setErrorMessage,
  };
}
