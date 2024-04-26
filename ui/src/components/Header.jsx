import { Link } from "react-router-dom"

const Header = () => {
    return (
        <>
            <section className="flex justify-between mt-8 px-5">
                <h1 className="text-dark-blue font-bold text-xl mt-2">HeartAI</h1>
                <Link className="bg-dark-blue rounded-full text-white px-4 py-2 font-light" to="/auth">Get Started</Link>
            </section>
        </>
    )
}

export default Header