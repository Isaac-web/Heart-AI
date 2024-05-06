interface PersonalInfoFormProps {
  title?: string;
  description?: string;
}

const PersonalInfoForm = ({
  title = 'Personal Data',
  description = `Let's get to know you better! Fill in your personal details below to
  complete your profile and enhance your professional presence within
  our community.`,
}: PersonalInfoFormProps) => {
  return (
    <div className="  container  max-w-xl mx-auto">
      <div>
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-5 dark:text-white/90">
            {title}
          </h3>
          <p className="text-sm">{description}</p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1">
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="col-span-2">
            <input
              type="text"
              placeholder="Date Of Birth"
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-2">
            <textarea
              className="textarea textarea-bordered w-full text-md"
              placeholder="Bio"
            ></textarea>
          </div>
          <div className="col-span-2 flex justify-end">
            <button className="btn btn-primary min-w-28 dark:text-white">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
