import Form from './form/Form';
import FormTextfield from './form/FormTextfield';
import FormSubmitButton from './form/FormSubmitButton';
import FormSelectInput from './form/FormSelectInput';
import * as Yup from 'yup';
import { DoctorUpdateFormData, UserUpdateFormData } from '@/types';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppStore } from '@/store';

interface PersonalInfoFormProps {
  title?: string;
  description?: string;
  onDone?(): void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).required().label('Name'),
  age: Yup.number().min(18).max(120).required().label('Age'),
  sex: Yup.string().length(1).required().label('Sex'),
});

const options = [
  { label: 'Male', value: '1' },
  { label: 'Female', value: '0' },
];

const PersonalInfoForm = ({
  title = 'Personal Data',
  description = `Let's get to know you better! Fill in your personal details below to
  complete your profile and enhance your professional presence within
  our community.`,
  onDone,
}: PersonalInfoFormProps) => {
  const [searchParams] = useSearchParams();
  const store = useAppStore();
  const location = useLocation();

  const getDoctorUpdateError = () =>
    store.getError(store.auth.doctor.update.name);

  const getPatientUpdateError = () =>
    store.getError(store.auth.user.update.name);

  const isPending = (): boolean => {
    return store.auth.doctor.isPending || store.auth.user.isPending;
  };

  const handleDoctorUpdate = async (data: DoctorUpdateFormData) => {
    const userId = searchParams.get('doctorId');

    if (userId) {
      await store.auth.doctor.update(userId, data);
      const error = getDoctorUpdateError();
      if (!error) {
        if (onDone) onDone();
      }
    }
  };

  const handleUpdatePatient = async (data: UserUpdateFormData) => {
    await store.auth.user.update(data);

    const error = getPatientUpdateError();

    if (!error) {
      if (onDone) onDone();
    }
  };

  const handleSubmit = (data: UserUpdateFormData | DoctorUpdateFormData) => {
    if (location.pathname === '/onboarding/patient') {
      handleUpdatePatient(data);
    } else if (location.pathname === '/onboarding/doctor') {
      handleDoctorUpdate(data);
    }
  };

  return (
    <div className="container max-w-xl mx-auto">
      <div>
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-5 dark:text-white/90">
            {title}
          </h3>
          <p className="text-sm">{description}</p>
        </div>

        <Form
          validationSchema={validationSchema}
          initialValues={{
            name: '',
            age: NaN,
            sex: NaN,
          }}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <FormTextfield name={'name'} placeholder="Name" />
            </div>

            <div className="col-span-1">
              <FormTextfield name={'age'} placeholder="Age" />
            </div>

            <div className="col-span-1">
              <FormSelectInput name="sex" placeholder="Sex" options={options} />
            </div>

            <div className="col-span-2">
              <textarea
                className="textarea textarea-bordered w-full text-md"
                placeholder="Bio"
              ></textarea>
            </div>

            <div className="col-span-2 flex justify-end">
              <FormSubmitButton className="w-28" loading={isPending()}>
                Continue
              </FormSubmitButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
