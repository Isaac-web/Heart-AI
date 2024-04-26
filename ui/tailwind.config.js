/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#13183F",
      },
    },
  },
  plugins: [],
};


//  {
//    features.map((feature) => {
//      return (
//        <div className="bg-[#F3F4FF] rounded-lg mx-5 mt-4 md:flex">
//          <div className="py-11 pl-5">
//            <h3 className="text-dark-blue font-semibold">{feature.title}</h3>
//            <p className="text-[#83869A]">{feature.description}</p>
//          </div>
//        </div>
//      );
//    });
//  }
