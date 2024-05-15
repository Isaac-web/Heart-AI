import { DownloadIcon, FullScreenIcon, ShareIcon } from "@/components/Icons";
import { Doctor, User } from "@/types";

interface ReportDetails {
  _id: string;
  cardioStatus: number;
  status: string;
  confidenceLevel: number;
  patient: User;
  doctor: Doctor;
  details: {
    age: number;
    sex: number;
    chestPainType: number;
    restingBloodPressure: number;
    serumColesterol: number;
    fastingBloodSugarLevel: number;
    restingElectrocardiographocResults: number;
    maximumHeartRate: number;
    exerciseInducedAngina: number;
    stDepression: number;
    slope: number;
    numberOfMajorVessels: number;
    thalliumStressTestResults: number;
  };
  createdAt: string;
}

const ReportCard = (props: { reportDetails: any }) => {
  console.log(props.reportDetails);

  //   const {
  //     patient,
  //     doctor,
  //     details,
  //     _id,
  //     createdAt,
  //     status,
  //     confidenceLevel,
  //     cardioStatus,
  //   } = props.reportDetails;

  return (
    <div className="relative">
      <div className="px-4 py-8 flex flex-col justify-between w-[50%] margin-x-auto relative">
        <div className="w-[35vw] h-[90vh] bg-transparent border border-slate-600 rounded-md p-5">
          {props.reportDetails && (
            <>
              {" "}
              <div className="flex gap-4 mb-4">
                {/* <div className="stat-figure text-secondary">
                  <div className="avatar online">
                    <div className="w-16 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                </div> */}
                <h1 className="text-2xl text-center py-4 font-medium">
                  {props.reportDetails.patient.name}
                </h1>
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  <tbody>
                    {/* row 1 */}
                    <tr className="bg-base-200 border-b border-gray-800/30">
                      <td>Issued By</td>
                      <td></td>
                      <td>{props.reportDetails.doctor.name}</td>
                    </tr>
                    {/* row 2 */}
                    <tr className="bg-base-200 border-b border-gray-800/30">
                      <td>Date</td>
                      <td></td>
                      <td>{props.reportDetails.createdAt.split("T")[0]}</td>
                    </tr>
                    {/* row 3 */}
                    <tr className="bg-base-200">
                      <td>ID</td>
                      <td></td>
                      <td>{props.reportDetails._id}</td>
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
                  <div className="stat-value text-primary">
                    {props.reportDetails.details.maximumHeartRate}
                  </div>
                  <div className="stat-desc">21% decrement</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Cardio Status</div>
                  <div className="stat-value text-secondary">
                    {props.reportDetails.cadioStatus}
                  </div>
                  <div className="stat-desc">21% improvement</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Staus</div>
                  <div className="stat-value text-accent">
                    {props.reportDetails.status.includes("fine")
                      ? "NEG"
                      : "POS"}
                  </div>
                  <div className="stat-desc">
                    {props.reportDetails.status.includes("fine")
                      ? "Negative"
                      : "Positive"}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <div className="bg-slate-500/10 w-full p-4 rounded-md flex flex-col gap-2">
                  <p>
                    Confidence Level{" "}
                    <div className="badge badge-primary text-white">
                      {props.reportDetails.confidenceLevel}%
                    </div>
                  </p>
                  <progress
                    className="progress progress-primary w-56"
                    value={props.reportDetails.confidenceLevel}
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
                  {props.reportDetails.status}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      {/* <div className="absolute top-[4%] left-[102%] flex flex-col gap-3">
        <div className="bg-slate-500/10 rounded-full p-4 hover:bg-slate-700 cursor-pointer">
          <DownloadIcon />
        </div>
        <div className="bg-slate-500/10 rounded-full p-4 hover:bg-slate-700 cursor-pointer">
          <FullScreenIcon />
        </div>
        <div className="bg-slate-500/10 rounded-full p-4 hover:bg-slate-700 cursor-pointer">
          <ShareIcon />
        </div>
      </div> */}
    </div>
  );
};

export default ReportCard;
