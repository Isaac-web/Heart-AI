import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section className="px-5 mt-10">
        <h2 className="font-bold text-3xl pb-3 md:text-center ">
          Healthcare, at your call.
        </h2>
        <p className="text-[#83869A] pb-7 md:text-center">
          Welcome! This app helps <br /> you understand your heart health by{" "}
          <br /> estimating your risk of heart disease.
        </p>
        <div className="md:flex md:justify-center md:mt-5">
          <Link
            className="bg-gradient-to-r from-[#FF6F48] to-[#F02AA6] text-white px-6 py-2 rounded-full"
            to="/auth"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
};

export default Hero;
