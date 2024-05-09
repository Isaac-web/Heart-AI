import Alert from '@/components/Alert';
import Form from '@/components/form/Form';
import FormSubmitButton from '@/components/form/FormSubmitButton';
import FormTextfield from '@/components/form/FormTextfield';
import { useAppStore } from '@/store';
import { RegistrationFormData } from '@/types';
import { Email, Lock } from '@mui/icons-material';

import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(7).required(),
  confirmPassword: Yup.string().min(7).required(),
});

const SignUpPage = () => {
  const store = useAppStore();
  const navigate = useNavigate();

  const handleSignUp = async (data: RegistrationFormData) => {
    await store.auth.doctor.register(data);

    const error = getError();
    if (!error)
      navigate(`/onboarding/doctor?doctorId=${getCurrentDoctor()._id}`);
  };

  const getError = () => {
    return store.getError(store.auth.doctor.register.name);
  };

  const getCurrentDoctor = () => {
    return store.auth.doctor.data;
  };

  const handleCloseAlert = () => {
    store.removeError(store.auth.doctor.register.name);
  };

  return (
    <section className="w-full min-h-screen flex">
      <div className="w-1/2 bg-slate-700"></div>
      <div className="w-1/2  flex justify-center py-10">
        <div className="min-w-[30em] max-w-[30em]">
          <div>
            <div className="mb-12 flex flex-col items-start">
              <h3 className="text-2xl font-semibold text-left mb-5 dark:text-white/90">
                New Account
              </h3>
              <span className="text-sm  text-left w-full">
                Join our community of healthcare professionals. Sign up below to
                unlock exclusive features of our AI powered platform.
              </span>
            </div>

            {getError() && (
              <div className="mb-5">
                <Alert
                  title="Registration failed"
                  message={getError()?.message || ''}
                  onClose={handleCloseAlert}
                />
              </div>
            )}

            <Form
              initialValues={{ email: '', password: '', confirmPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSignUp}
            >
              <div className=" flex flex-col gap-2">
                <div>
                  <FormTextfield
                    label="Email"
                    name="email"
                    placeholder="example@email.com"
                    startAdornment={<Email fontSize="small" />}
                  />
                </div>

                <div>
                  <FormTextfield
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Please enter your password"
                    startAdornment={<Lock fontSize="small" />}
                  />
                </div>
                <div>
                  <FormTextfield
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    startAdornment={<Lock fontSize="small" />}
                  />
                </div>

                <div className="mt-8">
                  <FormSubmitButton>Register</FormSubmitButton>
                </div>
              </div>
            </Form>

            <div className="my-8 w-full ">
              <span className="w-full inline-block text-center text-sm">
                OR
              </span>
            </div>

            <div className="flex gap-5 mb-10">
              <button className="text-center flex-1  btn btn-outline ">
                Continue with Google
              </button>
              <button className="text-center flex-1  btn btn-outline">
                Continue with Apple
              </button>
            </div>
          </div>

          <div className="">
            <p className="text-center mb-20 text-sm">
              Already have a Doctor's account?{' '}
              <Link to="/login" className="text-primary cursor-pointer">
                Login
              </Link>
            </p>

            <p className="text-center text-xs">
              By Creating An Account, You agree to our{' '}
              <span className="text-primary cursor-pointer">terms</span> and{' '}
              <span className="text-primary cursor-pointer">conditions</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;

// const Alert = ({ message, icon, title, onClose }: AppAlertProps) => {
//   return (
//     <div role="alert" className="alert shadow-lg">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         className="stroke-error shrink-0 w-6 h-6"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//         ></path>
//       </svg>
//       <div>
//         <h3 className="font-bold">{title}</h3>
//         <div className="text-xs">{message}</div>
//       </div>
//       <button className="btn btn-sm" onClick={onClose}>
//         <Close fontSize="small" />
//       </button>
//     </div>
//   );
// };
