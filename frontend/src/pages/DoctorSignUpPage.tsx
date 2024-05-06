import { Link } from 'react-router-dom';

const DoctorSignUpPage = () => {
  return (
    <section className="w-full h-screen flex">
      <div className="w-1/2 bg-slate-700"></div>
      <div className="w-1/2  flex justify-center pt-20">
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

            <div className=" flex flex-col space-y-8 ">
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input type="text" className="grow" placeholder="Email" />
                </label>
              </div>

              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    className="grow"
                    placeholder="Password"
                  />
                </label>
              </div>
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    className="grow"
                    placeholder="Confirm Password"
                  />
                </label>
              </div>

              <div>
                <button className="btn w-full bg-primary dark:text-white">
                  Register
                </button>
              </div>
            </div>

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

export default DoctorSignUpPage;
