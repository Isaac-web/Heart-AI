import { Link } from "react-router-dom"

const Header = () => {
    return (
        <>
            <section className="flex justify-between mt-8 px-5">
                <h1 className="text-dark-blue font-bold text-xl mt-2">HeartAI</h1>
<<<<<<< HEAD
                <Link className="bg-dark-blue rounded-full text-white px-4 py-2 font-light" to="/auth">Get Started</Link>
=======
                <button className="bg-gradient-to-br from-dark-blue to-blue-900 rounded-full hover:bg-blue-950 text-white px-4 py-2 font-light active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out">Get Started</button>
>>>>>>> c8471501fc1a1477372d4c263b0bbb57a98c6941
            </section>
        </>
    )
}

export default Header