import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Logo from '../assets/images/logo-white.png';
import { useNavigate } from 'react-router-dom';
import hvd from '../assets/video/heart_rate.mp4';
import ProcessCard from '@/components/ProcessCard';
import aid from '../assets/images/aid.jpg';
import hospital from '../assets/images/hospital.jpg';
import young from '../assets/images/young.jpg';
import prediction from '../assets/images/prediction.jpg';

interface NavigationItem {
  name: string;
  href: string;
}
const navigation: NavigationItem[] = [];

const NewLandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-5 lg:px-8">
        <div className="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-55"></div>
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center md:object-center"
          src={hvd}
          autoPlay
          loop
          muted
        ></video>
        <div className="relative z-10">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav
              className="flex items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">HeartAi</span>
                  <img className="h-12 w-auto" src={Logo} alt="" />
                </a>
              </div>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-100"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                    />
                  </svg>
                </button>
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-semibold leading-6 text-gray-100"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <a
                  href="/auth"
                  className="text-sm font-semibold leading-6 text-gray-100 bg-indigo-600 rounded-md px-3.5 py-2.5"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </nav>
            <Dialog
              className="lg:hidden"
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
            >
              <div className="fixed inset-0 z-50" />
              <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">HeartAi</span>
                    <img className="h-8 w-auto" src={Logo} alt="" />
                  </a>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="py-6">
                      <a
                        href="/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900"
                      >
                        Log in
                      </a>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          </header>
          <div className="relative z-10">
            {/* Your main content */}
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-gray-100/20 hover:ring-gray-100">
                  View this article about heart disease.{' '}
                  <a
                    href="https://www.mayoclinic.org/diseases-conditions/heart-disease/symptoms-causes/syc-20353118"
                    className="font-semibold text-indigo-600"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    Read it <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  HeartAI
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-100">
                  Get personalized heart health analysis and guidance from
                  accredited doctors backed by AI
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="/login/doctor"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Doctor Login
                  </a>
                  <a
                    href="/login/patient"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Patient Login
                  </a>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center my-10 text-gray-600">
        Process
      </h1>
      <div
        id="process"
        className="grid-cols-1 px-16 sm:grid md:grid-cols-4 mb-4"
      >
        <ProcessCard
          header="Vitals"
          paragraph="Visit the hospital for the doctor to check your vitals."
          imgSrc={hospital}
        />
        <ProcessCard
          header="Prediction"
          paragraph="Doctor inputs your vitals to the predictions model form to check your heart disease status."
          imgSrc={prediction}
        />
        <ProcessCard
          header="Upload"
          paragraph="Your heart disease prediction status together with your vitals is posted on your portal on HeartAI."
          imgSrc={young}
        />
        <ProcessCard
          header="Check"
          paragraph="Create patient account on HeartAi web site and to access your report. You can ask HeartAI questions on your results for clarification."
          imgSrc={aid}
        />
      </div>

      <div className="text-center mt-16 mb-10">
        <a
          href="/auth"
          className="text-sm font-semibold leading-6 text-gray-100 bg-indigo-600 rounded-md px-20 py-4"
        >
          Log in <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
};
export default NewLandingPage;
