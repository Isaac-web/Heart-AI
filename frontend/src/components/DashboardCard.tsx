interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
}

const DashboardCard = ({ title, value, description }: DashboardCardProps) => {
  return (
    <div className="card w-full bg-base-100 dark:bg-neutral shadow-xl">
      <div className="card-body py-4 px-5">
        <div className="flex justify-between items-start">
          <p>{title}</p>
          <div className="w-12 h-12 rounded-lg bg-slate-600"></div>
        </div>
        <div>
          <h2 className="card-title text-2xl font-semibold">{value}</h2>
        </div>
        <div>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;