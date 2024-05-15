import { FileIcon } from "@/components/Icons";

import { useAppStore } from "@/store";
import { getUserId } from "@/utils/auth";
import { useEffect, useState } from "react";
import sample_reports from "./sample_reports";
import ReportCard from "./ReportCard";

import appConfig from "../../../app.config.json";

const Reports = () => {
  const store = useAppStore();
  const [allUserReports, setAllUserReports] = useState<any>([]);
  const [currentReportOnView, setCurrentReportOnView] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const { id: reportId } = useParams();
  // const medicalReport = store.details.medicalReport;

  const medicalReports = store.entities.medicalReports;

  useEffect(() => {
    // store.entities.medicalReports.fetchMedicalReports({
    //   patientId: getUserId(),
    //   doctorId: store.auth.doctor?.id,
    // });

    (async () => {
      // doctors
      const doctors = await fetch(`${appConfig.baseUrl}doctors`);

      const doctors_json = await doctors.json();

      setDoctorsList(doctors_json.data);

      // reports
      store.entities.medicalReports.fetchCurrentUserMedicalReports();
    })();
  }, []);

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
          <div className="modal-box relative flex flex-col">
            <div>
              <h3 className="font-bold text-lg">Select Doctor</h3>
              <div className="modal-action absolute top-[-5%] right-5">
                <form method="dialog">
                  <button className="btn">x</button>
                </form>
              </div>
            </div>

            <div className="py-10 w-full">
              <div>
                <small className="mb-2 inline-block">Doctor</small>
                <select
                  className="select select-bordered w-full"
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                >
                  <option disabled selected hidden>
                    selected doctor
                  </option>
                  {doctorsList.map((doctor: any) => (
                    <option
                      key={doctor._id}
                      value={doctor._id}
                      className="w-full"
                    >
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <small className="mb-2 inline-block">Appointment Date</small>
                <input
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  type="datetime-local"
                  className="px-4 py-3 w-full bg-transparent border border-slate-200/10 rounded-lg"
                  min={new Date().toISOString().split(".")[0]}
                />
              </div>
            </div>

            <button
              className="btn bg-green-500 text-white"
              disabled={selectedDoctorId === null || appointmentDate === null}
              onClick={async () => {
                setIsLoading(true);
                const res = await store.entities.appointments.createAppointment(
                  {
                    doctorId: selectedDoctorId,
                    patientId: getUserId(),
                    appointmentDate: appointmentDate,
                  }
                );

                if (res) {
                  alert("Medical Report Request Sent");
                } else {
                  alert("something went wrong; try again later");
                }
                document.getElementById("my_modal_1").close();
                setIsLoading(false);
              }}
            >
              Request
            </button>
            {isLoading && (
              <span className="loading loading-spinner text-accent my-5"></span>
            )}
          </div>
        </dialog>
        {/* <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search Reports"
            onChange={(e) => console.log(e.target.value)}

            // min={new Date().toISOString().split(".")[0]}
            // min="2024-05-01T00:00"
            // max="2025-05-01T00:00"
          />
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
        </label> */}

        <div className=" grow flex flex-col gap-7 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <div className="w-full">
              {medicalReports.data.map((report, index) => (
                <p
                  className="px-2 py-4 rounded-sm hover:bg-white/5 rounded-sm cursor-pointer flex justify-between hover:bg-white/5"
                  onClick={() => setCurrentReportOnView(report._id)}
                >
                  <div className="flex gap-2 items-center">
                    <small className="text-slate-500">
                      <FileIcon />
                    </small>
                    <p className="text-white">Report {index + 1}</p>
                  </div>
                  <small className="text-gray-600">
                    {report.createdAt.slice(0, 10)}
                  </small>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grow flex justify-center">
        {medicalReports.loading ? (
          <>loading</>
        ) : (
          <ReportCard
            reportDetails={medicalReports.data.find(
              (r) => r._id === currentReportOnView
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Reports;
