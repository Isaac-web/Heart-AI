import OrgainzationInfoForm from '@/components/OrgainzationInfoForm';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import PhoneNumberVerificationForm from '@/components/PhoneNumberVerificationForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorOnboardingPage = () => {
  const [step, setstep] = useState(0);
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (step < 2) setstep((prev) => prev + 1);
    else navigate('/doctor/dashboard');
  };

  return (
    <section className="py-10 mt-10">
      {step === 0 && <PersonalInfoForm onDone={handleNextStep} />}
      {step === 1 && <PhoneNumberVerificationForm onDone={handleNextStep} />}
      {step === 2 && (
        <OrgainzationInfoForm
          onDone={handleNextStep}
          title="Profesional Info"
          description="Tell us about your practice hub! Provide basic details about your hospital below, including its name and location, to help us tailor your experience and connect you with relevant resources."
        />
      )}
    </section>
  );
};

export default DoctorOnboardingPage;
