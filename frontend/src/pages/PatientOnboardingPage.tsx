import PersonalInfoForm from '@/components/PersonalInfoForm';
import PhoneNumberVerificationForm from '@/components/PhoneNumberVerificationForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientOnboardingPage = () => {
  const [step, setstep] = useState(0);
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (step < 1) setstep((prev) => prev + 1);
    else navigate('/dashboard/patient');
  };

  return (
    <section className="py-10 mt-10">
      {step === 0 && <PersonalInfoForm onDone={handleNextStep} />}
      {step === 1 && <PhoneNumberVerificationForm onDone={handleNextStep} />}
    </section>
  );
};

export default PatientOnboardingPage;
