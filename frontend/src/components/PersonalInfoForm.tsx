import Form from './form/Form';
import FormTextfield from './form/FormTextfield';
import FormSubmitButton from './form/FormSubmitButton';
import FormSelectInput from './form/FormSelectInput';
import * as Yup from 'yup';

interface PersonalInfoFormProps {
  title?: string;
  description?: string;
  onDone?(): void;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(3).required().label('First name'),
  lastName: Yup.string().min(3).required().label('Last name'),
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
  const handleSubmit = () => {
    // console.log(data);

    if (onDone) onDone();
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
            firstName: '',
            lastName: '',
            age: '',
            sex: '',
          }}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-1">
              <FormTextfield name={'firstName'} placeholder="First Name" />
            </div>

            <div className="col-span-1">
              <FormTextfield name={'lastName'} placeholder="Last name" />
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
              <FormSubmitButton className="w-28">Continue</FormSubmitButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
