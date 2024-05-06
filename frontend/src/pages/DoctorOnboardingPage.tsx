import OrgainzationInfoForm from '@/components/OrgainzationInfoForm';

const DoctorOnboardingPage = () => {
  return (
    <section className="pt-20 mt-10">
      {/* <PersonalInfoForm />
      <PhoneNumberVerificationForm /> */}
      <OrgainzationInfoForm
        title="Profesional Info"
        description="Tell us about your practice hub! Provide basic details about your hospital below, including its name and location, to help us tailor your experience and connect you with relevant resources."
      />
    </section>
  );
};

export default DoctorOnboardingPage;
