import Alert from '@/components/Alert';
import Form from '@/components/form/Form';
import FormSubmitButton from '@/components/form/FormSubmitButton';
import FormTextfield from '@/components/form/FormTextfield';
import { useAppStore } from '@/store';
import { LoginFormData } from '@/types';
import { Email, FormatQuote, Key } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import loginImage from '../assets/images/doctor-background-2.jpg';
import googleIcon from '../assets/images/google.png';
import appleIcon from '../assets/images/apple-logo.png';
import appLogo from '../assets/images/logo-white.png';

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
    return store.auth.doctor.isPending || store.auth.user.isPending;
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
      navigate('/portal/patient', { replace: true });
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
      <div className="w-full lg:w-1/2 flex flex-col lg:flex-row justify-center py-20">
        <div className="min-w-[30em] p-10 lg:p-0">
          <div>
            <div className="mb-12 flex flex-col items-start">
              <h3 className="text-2xl font-semibold  mb-5 dark:text-white/90">
                Login
              </h3>
              <span className="text-sm  w-full">
                {getUserType() == 'doctor'
                  ? 'Welcome back! Please sign in below to access your doctor account.'
                  : 'Welcome back! Please sign in below to access your patient account.'}
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
              <button className="text-center flex-1 flex items-center justify-center  btn btn-outline ">
                <div>
                  <img className="h-6 w-6" src={googleIcon} />
                </div>
                <div>Continue with Google</div>
              </button>
              <button className="text-center flex-1 flex items-center justify-center  btn btn-outline ">
                <div>Continue with Apple</div>
                <div>
                  <img className="h-6 w-6" src={appleIcon} />
                </div>
              </button>
            </div>
            <p className="text-xs text-center mb-10 -mt-5">
              Please note that Login with Google and Apple are not available
              yet.
            </p>
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

      <div
        className="w-1/2 bg-slate-700 hidden lg:block relative"
        style={{
          backgroundImage: `url('${loginImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="w-full h-full flex items-end"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div
            className="w-full h-4/6 bg-gradient-to-b px-10 lg:px-16"
            style={{
              background:
                'linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9))',
            }}
          >
            <div>
              <img className="w-16 h-16 -ml-2" src={appLogo} />
            </div>

            <div className="max-w-xl">
              <div className="text-white -ml-2">
                <FormatQuote fontSize="large" />
              </div>
              <p className="text-white/70 text-lg">
                Nurture your heart; it's the essence of life. Feed it with love,
                exercise, and good nutrition, for a heart cared for, gives life
                abundantly.
              </p>
              <div className="divider" />
              <div>
                <p className="text-xl text-white/80">Dr. Mehmet Oz</p>
                <p className="text-sm">cardiothoracic surgeon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
