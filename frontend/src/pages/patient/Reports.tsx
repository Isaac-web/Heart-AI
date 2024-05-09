const Reports = () => {
  return (
    <div className="flex h-screen">
      <div className="bg-black/50 text-white w-[17vw] py-4 flex flex-col justify-between gap-5 px-3">
        {/* <div className="flex justify-between py-2 items-center hover:bg-white/5 px-4 cursor-pointer">
          <p>Request New Report</p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621z" />
              <path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
            </svg>
          </p>
        </div> */}
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Request New Report
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search Reports" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <div className=" grow flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <small className="text-gray-600 px-4">Pending</small>
            <div>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
                <small>date</small>
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <small className="text-gray-600 px-4">April</small>
            <div>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center px-4">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-12">
              <span>SY</span>
            </div>
          </div>
          <p>Sausage Yam</p>
        </div>
      </div>
      <div className="grow flex justify-center">
        <div className="px-4 py-8 flex flex-col justify-between w-[50%] margin-x-auto">
          <div className="w-[35vw] h-[90vh] bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
