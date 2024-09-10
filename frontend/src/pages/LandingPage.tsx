import Logo from '../assets/images/logo-white.png';
import hvd from '../assets/video/web_heart_rate.mp4';
import { Link } from 'react-router-dom';
import { PiStethoscopeBold } from 'react-icons/pi';
import { MdOutlineSick } from 'react-icons/md';

const NewLandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-5 lg:px-8">
        <div className="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-55 backdrop-blur-md"></div>
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center md:object-center"
          src={hvd}
          autoPlay
          loop
          muted
        />
        <div className="relative z-10">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav
              className="flex items-center justify-between p-4 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">HeartAi</span>
                  <img className="h-12 w-auto" src={Logo} alt="" />
                </a>
              </div>
            </nav>
          </header>

          <div className="relative z-10">
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
                  <Link to="/login/doctor">
                    <button className="btn btn-primary text-white">
                      <PiStethoscopeBold className="text-lg" />
                      <span>Doctor Login</span>
                    </button>
                  </Link>
                  <Link to="/login/patient">
                    <button className="btn text-primary bg-white border-0">
                      <span>Patient Login</span>
                      <MdOutlineSick className="text-lg" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewLandingPage;
