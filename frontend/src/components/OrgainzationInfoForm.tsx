import { DoctorUpdateFormData } from '@/types';
import Form from './form/Form';
import { useSearchParams } from 'react-router-dom';
import FormSubmitButton from './form/FormSubmitButton';
import FormTextfield from './form/FormTextfield';
import { useAppStore } from '@/store';
import * as Yup from 'yup';
import FormSelectInput from './form/FormSelectInput';

interface OrganizationInfoForm {
  title?: string;
  description?: string;
  onDone?(): void;
}

const validationSchema = () =>
  Yup.object().shape({
    hospital: Yup.string().max(256).required().label('Hospital'),
    supportingDocumentUrl: Yup.string().max(1024).label('Medical License'),
  });

const OrgainzationInfoForm = ({
  title,
  description,
  onDone,
}: OrganizationInfoForm) => {
  const [searchParams] = useSearchParams();
  const store = useAppStore();

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
      <div>
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-5 dark:text-white/90">
            {title}
          </h3>
          <p className="text-sm">{description}</p>
        </div>

        <Form
          initialValues={{ hospital: '', supportingDocumentUrl: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <div className="flex flex-col gap-y-8">
            <div className="w-full">
              <FormSelectInput
                name="hospital"
                placeholder="Hospital"
                options={[
                  {
                    label: '37 Military Hospital',
                    value: '37 Military Hospital',
                  },
                ]}
              />
            </div>

            {/* <div className="w-full">
              <FormTextfield
                name="supportingDocumentUrl"
                placeholder="Medical Licence"
              />
            </div> */}

            <div className="col-span-2 flex justify-end">
              <FormSubmitButton>Finish</FormSubmitButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default OrgainzationInfoForm;
