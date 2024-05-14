import { DownloadIcon, FullScreenIcon, ShareIcon } from "@/components/Icons";

const Reports = () => {
  return (
    <div className="flex h-screen">
      <div className="bg-black/50 text-white w-[22vw] py-4 flex flex-col justify-between gap-5 px-3">
        <button
          className="btn bg-gradient-to-r from-[#4851FF] to-[#F02AA6] rounded-full text-white px-4 py-2 font-light active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Request New Report
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Requesting Report Request</h3>

            <span className="loading loading-spinner text-accent my-5"></span>
            <div className="modal-action">
              <form method="dialog">
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
            <div className="w-full">
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4 flex justify-between hover:bg-white/5 cursor-not-allowed">
                <p className="text-slate-500">Report 1</p>
                <small className="text-gray-600">21/12/2024</small>
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4 flex justify-between hover:bg-white/5 cursor-not-allowed">
                <p className="text-slate-500">Report 2</p>
                <small className="text-gray-600">21/12/2024</small>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <small className="text-gray-600 px-4">April</small>
            <div className="w-full">
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4 flex justify-between hover:bg-white/5">
                <p className="text-white">Report 1</p>
                <small className="text-gray-600">21/12/2024</small>
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4 flex justify-between hover:bg-white/5">
                <p className="text-white">Report 2</p>
                <small className="text-gray-600">21/12/2024</small>
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
          <div className="w-[35vw] h-[90vh] bg-transparent border border-slate-600 rounded-md p-5">
            <div className="flex gap-4 mb-4">
              <div className="stat-figure text-secondary">
                <div className="avatar online">
                  <div className="w-16 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
              </div>
              <h1 className="text-2xl text-center py-4 font-medium">
                Mr. Bones Takiy
              </h1>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                {/* <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                  </tr>
                </thead> */}
                <tbody>
                  {/* row 1 */}
                  <tr className="bg-base-200 border-b border-gray-800/30">
                    <td>Issued By</td>
                    <td>Dr. Sven Hagerty</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 2 */}
                  <tr className="bg-base-200 border-b border-gray-800/30">
                    <td>Date</td>
                    <td>21st May 2024</td>
                    <td>Purple</td>
                  </tr>
                  {/* row 3 */}
                  <tr className="bg-base-200">
                    <td>ID</td>
                    <td>1s67dk99036fkdd6d</td>
                    <td>Red</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div className="mt-5">
              <h2>Cardio Health - 55%</h2>
              <progress
                className="progress progress-primary w-56"
                value="100"
                max="100"
              ></progress>
            </div> */}
            <div className="stats shadow w-full my-4">
              <div className="stat">
                <div className="stat-title">Heart Rate</div>
                <div className="stat-value text-primary">100ms</div>
                <div className="stat-desc">21% decrement</div>
              </div>

              <div className="stat">
                <div className="stat-title">Page Views</div>
                <div className="stat-value text-secondary">88%</div>
                <div className="stat-desc">21% improvement</div>
              </div>

              <div className="stat">
                <div className="stat-title">Condition</div>
                <div className="stat-value text-accent">NEG</div>
                <div className="stat-desc">No heart disease</div>
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <div className="bg-slate-500/10 w-full p-4 rounded-md flex flex-col gap-2">
                <p>
                  Healthline{" "}
                  <div className="badge badge-primary text-white">67%</div>
                </p>
                <progress
                  className="progress progress-primary w-56"
                  value="100"
                  max="100"
                ></progress>
              </div>
              {/* <div className="bg-slate-500/10 w-28 h-32 p-4 rounded-md"></div> */}
              {/* <div className="bg-slate-500/10 w-28 h-32 p-4 rounded-md"></div> */}
              {/* <div className="bg-slate-500/10 w-28 h-32 p-4 rounded-md"></div> */}
            </div>
            <div className="bg-slate-500/10 p-4">
              <h2 className="text-xl">Summary</h2>
              <p className="text-md opacity-70">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Sapiente, tempora fugit incidunt exercitationem ratione
                assumenda molestias doloribus labore, architecto similique aut
                tenetur officiis sit atque quam magnam voluptas aperiam esse?
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-[5%] left-[82%] flex flex-col gap-3">
          <div className="bg-slate-500/10 rounded-full p-4 hover:bg-slate-700 cursor-pointer">
            <DownloadIcon />
          </div>
          <div className="bg-slate-500/10 rounded-full p-4 hover:bg-slate-700 cursor-pointer">
            <FullScreenIcon />
          </div>
          <div className="bg-slate-500/10 rounded-full p-4 hover:bg-slate-700 cursor-pointer">
            <ShareIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
