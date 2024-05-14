import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full min-h-screen flex">
      <div className="w-full lg:w-1/2 flex justify-center py-10 bg-white">
        <div className="min-w-[30em] mt-48">
          <div>
            <div className="mb-12 flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-center mb-5 ">
                Sign In to HeartAI
              </h3>
            </div>

            <div className="flex flex-col">
              <button
                className="bg-indigo-600 rounded-lg px-3 py-2 text-white mb-4"
                onClick={() => navigate("/login/doctor")}
              >
                Doctor
              </button>
              <span className="mb-4 text-center">OR</span>
              <button
                className="bg-indigo-600 rounded-lg px-3 py-2 text-white mb-8"
                onClick={() => navigate("/login/patient")}
              >
                Patient
              </button>
            </div>
          </div>

          <div className="">
            <p className="text-center text-xs">
              By Creating An Account, You agree to our{" "}
              <span className="text-primary cursor-pointer">terms</span> and{" "}
              <span className="text-primary cursor-pointer">conditions</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2 bg-[#598DFF] p-11">
        <img src="src/assets/images/doctor.png" alt="" />
      </div>
    </section>
  );
};

export default Auth;
