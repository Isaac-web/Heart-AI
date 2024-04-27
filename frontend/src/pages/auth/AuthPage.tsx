import { Link } from "react-router-dom";

const AuthPage = () => {
    return (
        <>

            <section className="flex justify-between mt-8 px-5">
                <Link className="text-dark-blue font-bold text-xl mt-2" to="/">HeartAI</Link>
            </section>

            <div className="min-h-screen flex items-center justify-center ">
                <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg ">
                    <form className="mt-8 space-y-6">
                        <div className="flex flex-row ">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2  bg-gray-50 border border-gray-100/45 placeholder-gray-400 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-md"
                                placeholder="Enter Username"
                            />
                        </div>
                        <div className="flex flex-row ">
                            {/* <img src={password} className="w-5 py-2" alt="" /> */}
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="Enter Password"
                                className="mt-1 p-2  placeholder-gray-400 block w-full  bg-gray-50 border border-gray-100/45 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-b-md "
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="mt-4 w-full p-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-500 focus:outline-none focus:bg-blue-600"
                            >
                                Sign in as Patient
                            </button>
                            <button
                                type="submit"
                                className="mt-4 w-full p-3 bg-blue-950 text-white font-semibold rounded-lg hover:bg-blue-900 focus:outline-none focus:bg-blue-500"
                            >
                                Sign in as Doctor
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
        
    );
}

export default AuthPage