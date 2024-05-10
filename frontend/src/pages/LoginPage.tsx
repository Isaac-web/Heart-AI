import Alert from '@/components/Alert';
import Form from '@/components/form/Form';
import FormSubmitButton from '@/components/form/FormSubmitButton';
import FormTextfield from '@/components/form/FormTextfield';
import { useAppStore } from '@/store';
import { LoginFormData } from '@/types';
import { Email, Key } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(7).required(),
});

const LoginPage = () => {
  const store = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();

  const getError = () => {
    return store.getError(store.auth.doctor.login.name);
  };

  const handleCloseAlert = () => {
    return store.removeError(store.auth.doctor.login.name);
  };

  const isPending = (): boolean => {
    return store.auth.doctor.isPending;
  };

  const handleDoctorLogin = async (data: LoginFormData) => {
    await store.auth.doctor.login(data);
    const error = getError();
    if (!error) {
      navigate('/portal/doctor/overview', { replace: true });
    }
  };

  const handlePatientLogin = async (data: LoginFormData) => {
    await store.auth.user.login(data);
    const error = getError();
    if (!error) {
      navigate('/dashboard/patient', { replace: true });
    }
  };

  const handleLogin = (data: LoginFormData) => {
    if (location.pathname.startsWith('/login/doctor')) {
      handleDoctorLogin(data);
    } else if (location.pathname.startsWith('/login/patient')) {
      handlePatientLogin(data);
    }
  };

  const getUserType = (): string => {
    if (location.pathname.startsWith('/login/doctor')) return 'doctor';

    return 'patient';
  };

  return (
    <section className="w-full min-h-screen flex">
      <div className="w-full lg:w-1/2 flex justify-center py-10">
        <div className="min-w-[30em]">
          <div>
            <div className="mb-12 flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-center mb-5 dark:text-white/90">
                Login
              </h3>
              <span className="text-sm  text-center w-full">
                We suggest you use your work email
              </span>
            </div>

            {getError() && (
              <div className="mb-5">
                <Alert
                  title="Login failed"
                  message={getError()?.message || ''}
                  onClose={handleCloseAlert}
                />
              </div>
            )}

            <Form
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={handleLogin}
              validationSchema={validationSchema}
            >
              <div className="flex flex-col space-y-5 ">
                <div>
                  <FormTextfield
                    name="email"
                    label="Email"
                    placeholder="example@email.com"
                    startAdornment={<Email fontSize="small" />}
                  />
                </div>

                <div>
                  <FormTextfield
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Input your user password"
                    startAdornment={<Key fontSize="small" />}
                  />
                </div>

                <div>
                  <FormSubmitButton loading={isPending()}>
                    Login
                  </FormSubmitButton>
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
              Don't have an account yet?{' '}
              <Link
                to={`/register/${getUserType()}`}
                className="text-primary cursor-pointer"
              >
                Sign Up
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

      <div className="w-1/2 bg-slate-700"></div>
    </section>
  );
};

export default LoginPage;
