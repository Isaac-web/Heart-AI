import { useState } from 'react';
import AppTextInput from './AppTextInput';
import Form from './form/Form';
import FormTextfield from './form/FormTextfield';
import { Email } from '@mui/icons-material';

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
    if (onDone) onDone();
  };

  return (
    <div className="container max-w-xl mx-auto">
      {/* <Form
        validationSchema={null}
        initialValues={{ email: '' }}
        onSubmit={() => {
          console.log('Server called...');
        }}
      >
        <FormTextfield
          name={'email'}
          label="Email"
          placeholder="Input your name..."
          startAdornment={
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
            </>
          }
        />
      </Form> */}

      <div>
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-5 dark:text-white/90">
            {title}
          </h3>
          <p className="text-sm">{description}</p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1">
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="col-span-2">
            <input
              type="text"
              placeholder="Date Of Birth"
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-2">
            <textarea
              className="textarea textarea-bordered w-full text-md"
              placeholder="Bio"
            ></textarea>
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              className="btn btn-primary min-w-28 dark:text-white"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
