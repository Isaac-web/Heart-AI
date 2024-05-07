interface OrganizationInfoForm {
  title?: string;
  description?: string;
  onDone?(): void;
}

const OrgainzationInfoForm = ({
  title,
  description,
  onDone,
}: OrganizationInfoForm) => {
  const handleSubmit = () => {
    if (onDone) onDone();
  };

  return (
    <div className="container max-w-xl mx-auto">
      <div>
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-5 dark:text-white/90">
            {title}
          </h3>
          <p className="text-sm">{description}</p>
        </div>

        <div className="flex flex-col gap-y-8">
          <div className="w-full">
            <input
              type="text"
              placeholder="Hospital Name"
              className="input input-bordered w-full"
            />
          </div>

          <div className="col-span-1">
            <input
              type="text"
              placeholder="Location Of Hospital"
              className="input input-bordered w-full"
            />
          </div>

          <div className="col-span-1">
            <input
              type="text"
              placeholder="License"
              className="input input-bordered w-full"
            />
          </div>

          <div className="col-span-2 flex justify-end">
            <button
              className="btn btn-primary min-w-28 dark:text-white"
              onClick={handleSubmit}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgainzationInfoForm;
