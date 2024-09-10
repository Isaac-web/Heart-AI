import Lottie from 'react-lottie';
import maintenanceAnimation from '../assets/animations/maintenace_animation.json';
import logo from '../assets/images/logo.png';

const MaintenanceScreen = () => {
  return (
    <div className="flex md:hidden py-20 flex-col gap-y-5  justify-center items-center">
      <div>
        <div>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: maintenanceAnimation,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={150}
            width={150}
          />
        </div>
        <div className="flex items-center container max-w-xs">
          <img className="h-12 w-auto" src={logo} alt="Heart AI Logo" />
          <p className="text-xs py-10 px-5">
            Sorry, this site is being optimized for mobile screens. Please try
            viewing them on a larger screen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceScreen;
