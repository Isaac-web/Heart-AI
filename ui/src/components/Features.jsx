const Features = () => {

    const features = [
        { "title": 'Chatbot Integration', "description": 'Learn more about your health results by interacting with artificial intelligence(AI)'},
        { "title": 'Detailed Reports', "description": 'View your results received by doctors'},
        { "title": 'Certified Doctor Reports', "description": 'Receive reports from experts doctors on the application.'},
    ]

    return (
        <>
            <section className="mt-10 px-5">
                <div className="bg-gradient-to-r from-[#FF6F48] to-[#F02AA6] text-center text-white rounded-md p-6">Features</div>
            </section>

           {features.map((feature) => {
               return <div className="bg-[#F3F4FF] rounded-lg h-52 mx-5 mt-4">
                   <div className="py-11 pl-5">
                       <h3 className="text-dark-blue font-semibold">{feature.title}</h3>
                       <p className="text-[#83869A]">{feature.description}</p>
                   </div>
               </div>
           })}
        </>
    )
}

export default Features