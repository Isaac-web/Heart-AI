import Form from './form/Form';
import FormTextfield from './form/FormTextfield';
import FormSubmitButton from './form/FormSubmitButton';

interface PersonalInfoFormProps {
  title?: string;
  description?: string;
  onDone?(): void;
}

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
          validationSchema={null}
          initialValues={{ email: '' }}
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
              <FormTextfield name={'sex'} placeholder="Sex" />
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
