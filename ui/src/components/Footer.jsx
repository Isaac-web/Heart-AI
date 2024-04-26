import { Link } from "react-router-dom"


const Footer = () => {
  return (
   <div>
        <div className="mt-auto flex justify-between px-5 p-8 bg-dark-blue">
            <h1 className="text-white mt-2 font-bold text-xl">HeartAI</h1>
<<<<<<< HEAD
              <Link className="bg-gradient-to-r from-[#4851FF] to-[#F02AA6] rounded-full text-white px-4 py-2" to="/auth">Get Started</Link>
=======
              <button className="bg-gradient-to-r from-[#4851FF] to-[#F02AA6] rounded-full text-white px-4 py-2 active:scale-[.98] active:duration-75 hover:scale-[1.42] ease-in-out hover:animate-bounce">Get Started</button>
>>>>>>> c8471501fc1a1477372d4c263b0bbb57a98c6941
        </div>
   </div>
  )
}

export default Footer