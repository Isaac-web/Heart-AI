import { DoctorUpdateFormData } from '@/types';
import Form from './form/Form';
import FormSubmitButton from './form/FormSubmitButton';
import * as Yup from 'yup';
import FormTextfield from './form/FormTextfield';
import { useAppStore } from '@/store';
import { useSearchParams } from 'react-router-dom';

interface PhoneNumberVerificationForm {
  onDone?(): void;
}

const validationSchema = Yup.object().shape({
  phone: Yup.string().max(15).required().label('Phone Number'),
});

const PhoneNumberVerificationForm = ({
  onDone,
}: PhoneNumberVerificationForm) => {
  const store = useAppStore();
  const [searchParams] = useSearchParams();

  const getError = () => {
    return store.getError(store.auth.doctor.update.name);
  };

  const handleSubmit = async (data: DoctorUpdateFormData) => {
    const doctorId = searchParams.get('doctorId');

    if (doctorId) {
      await store.auth.doctor.update(doctorId, data);

      if (!getError()) {
        if (onDone) onDone();
      }
    }
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
        validationSchema={validationSchema}
      >
        <div className="flex flex-col gap-y-8">
          <div>
            <FormTextfield name="phone" placeholder="Input Your Phone Number" />
          </div>

          <FormSubmitButton className="btn btn-primary w-full">
            Verify
          </FormSubmitButton>
        </div>
      </Form>
    </div>
  );
};

export default PhoneNumberVerificationForm;
