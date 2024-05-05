import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="mt-auto flex justify-between px-5 p-8 bg-[#13183F]">
        <h1 className="text-white mt-2 font-bold text-xl">HeartAI</h1>
        <Link
          className="bg-gradient-to-r from-[#4851FF] to-[#F02AA6] rounded-full text-white px-4 py-2 active:scale-[.98] active:duration-75  hover:scale-[1.08] ease-in-out"
          to="/auth"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Footer;
