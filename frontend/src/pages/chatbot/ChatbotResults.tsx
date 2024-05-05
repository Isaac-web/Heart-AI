const ChatbotResults = () => {
  const chatresults = [
    {
      title: "Results",
      description: "Click here to view chat results",
    },
    {
      title: "Results",
      description: "Click here to view chat results",
    },

    {
      title: "Results",
      description: "Click here to view chat results",
    },
  ];
  return (
    <div className="grid md:grid-cols-3 mb-5 lg:mx-48 lg:mb-11">
      {chatresults.map((chatresults) => (
        <div className="bg-[#F3F4FF] rounded-lg mx-5 mt-4 active:scale-[.98] active:duration-75  hover:scale-[1.08] ease-in-out">
          <div className="py-11 pl-5 md:px-4">
            <h3 className="text-dark-blue font-semibold md:text-center">
              {chatresults.title}
            </h3>
            <p className="text-[#83869A] md:text-center">
              {chatresults.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatbotResults;
