interface ProcessCardProps {
  header: string;
  paragraph: string;
  imgSrc: string;
}

const ProcessCard: React.FC<ProcessCardProps> = ({
  header,
  paragraph,
  imgSrc,
}) => {
  return (
    <div className="h-96 pb-4 mx-3 border-2 mt-10 flex flex-col rounded-lg bg-white text-gray-700 text-surface shadow-secondary-1 ">
      <div className="overflow-hidden">
        <img className="" src={imgSrc} alt="#" />
      </div>
      <div className="p-6 h-[50%] flex flex-col justify-between gap-4 overflow-hidden">
        <div className="flex flex-col">
          <h5 className="text-xl font-medium leading-tight">{header}</h5>
          <p className="">{paragraph}</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessCard;
