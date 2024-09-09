import { FileIcon } from '@/components/Icons';

import { useAppStore } from '@/store';
import { getUserId } from '@/utils/auth';
import { useEffect, useState } from 'react';
import ReportCard from './ReportCard';

import appConfig from '../../../app.config.json';
import { Close } from '@mui/icons-material';
import { Doctor, MedicalReport } from '@/types';

const Reports = () => {
  const store = useAppStore();
  const [currentReportOnView, setCurrentReportOnView] = useState('');
  const [doctorsList, setDoctorsList] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const medicalReports = store.entities.medicalReports;

  const dialog = document.getElementById('my_modal_1') as HTMLDialogElement;

  useEffect(() => {
    medicalReports.fetchCurrentUserMedicalReports();

    (async () => {
      const doctors = await fetch(`${appConfig.baseUrl}/doctors`);
      const doctors_json = await doctors.json();
      setDoctorsList(doctors_json.data);
      store.entities.medicalReports.fetchCurrentUserMedicalReports();
    })();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="bg-black/50 text-white w-[250px] py-4 flex flex-col justify-between gap-5 px-3">
        <button
          className="btn bg-gradient-to-r from-[#4851FF] to-[#F02AA6] rounded-full text-white px-4 py-2 font-light active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out"
          onClick={() => dialog?.showModal()}
        >
          Request New Report
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box relative flex flex-col">
            <div>
              <h3 className="font-bold text-lg">Select Doctor</h3>
              <div className="modal-action absolute top-[-5%] right-5">
                <form method="dialog">
                  <button className="btn">
                    <Close />
                  </button>
                </form>
              </div>
            </div>

            <div className="py-10 w-full">
              <div>
                <small className="mb-2 inline-block">Doctor</small>
                <select
                  className="select select-bordered w-full"
                  onChange={(e) => {
                    if (e.target.value) setSelectedDoctorId(e?.target?.value);
                  }}
                >
                  <option disabled selected hidden>
                    selected doctor
                  </option>
                  {doctorsList.map((doctor: Doctor) => (
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
                  min={new Date().toISOString().split('.')[0]}
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
                    patientId: getUserId() ?? '',
                    appointmentDate: appointmentDate,
                  }
                );

                if (res) {
                  alert('Medical Report Request Sent');
                } else {
                  alert('something went wrong; try again later');
                }
                dialog?.close();
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

        <div className=" grow flex flex-col gap-7 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <div className="w-full">
              {medicalReports.data.map((report, index) => (
                <p
                  className="px-2 py-4 rounded-lg cursor-pointer flex justify-between hover:bg-white/5"
                  onClick={() => setCurrentReportOnView(report._id)}
                >
                  <div className="flex gap-2 items-center">
                    <small className="text-slate-500">
                      <FileIcon />
                    </small>
                    <p className="text-sm">Report {index + 1}</p>
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
      <div className="grow flex justify-center mx-auto max-w-3xl">
        {medicalReports.loading ? (
          <>loading</>
        ) : (
          <ReportCard
            report={
              medicalReports.data.find(
                (r) => r._id === currentReportOnView
              ) as MedicalReport
            }
          />
        )}
      </div>
    </div>
  );
};

export default Reports;
