import Form from './form/Form';
import FormSubmitButton from './form/FormSubmitButton';

interface PhoneNumberVerificationForm {
  onDone?(): void;
}

const PhoneNumberVerificationForm = ({
  onDone,
}: PhoneNumberVerificationForm) => {
  const handleSubmit = () => {
    if (onDone) onDone();
  };

  return (
    <div className="container max-w-xl mx-auto">
      <div className="mb-10">
        <h3 className="text-2xl font-semibold dark:text-white/90 mb-5">
          Contact Information
        </h3>
        <p className="text-sm">
          Help us keep you connected securely. Verify your phone number below to
          ensure seamless communication and access to important updates and
          alerts.
        </p>
      </div>

      <Form
        initialValues={{ phone: '' }}
        onSubmit={handleSubmit}
        validationSchema={null}
      >
        <div className="flex flex-col gap-y-8">
          <input
            type="text"
            placeholder="Input Your Phone Number"
            className="input input-bordered w-full"
          />

          <FormSubmitButton className="btn btn-primary w-full">
            Verify
          </FormSubmitButton>
        </div>
      </Form>
    </div>
  );
};

export default PhoneNumberVerificationForm;