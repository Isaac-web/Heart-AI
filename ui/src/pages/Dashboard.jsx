import { FaBars } from "react-icons/fa";

const Dashboard = () => {
    return (
        <>
            <section className="flex items-center mt-8 px-5">
                <FaBars className="mt-3 mr-5" />
                <h1 className="text-dark-blue font-bold text-xl mt-2">HeartAI</h1>
            </section>

            <section className="mt-10 px-5">
                <h2 className="font-bold text-3xl text-[#F74780]">Hi, John</h2>
                <p className="font-normal mt-5 mb-5">Heart Results Summary</p>
                <div className="bg-[#F3F4FF] rounded-lg mx-5 mt-4">
                    <div className="py-11 pl-5 md:px-4">
                        <h3 className="text-dark-blue font-semibold md:text-center"></h3>
                        <p className="text-[#83869A] md:text-center"></p>
                    </div>
                </div>
            </section>

        </>
       
    );
}

export default Dashboard;
