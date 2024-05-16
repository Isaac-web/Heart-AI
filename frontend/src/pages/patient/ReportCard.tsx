import { useAppStore } from '@/store';
import { MedicalReport } from '@/types';
import { Message, PersonOutline } from '@mui/icons-material';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import heartPulzeAnimation from '../../assets/animations/heart-pulze-animation.json';

interface ReportCardProps {
  report: MedicalReport;
}

const ReportCard = ({ report }: ReportCardProps) => {
  const navigate = useNavigate();
  const store = useAppStore();
  const chatSessions = store.entities.chatSessions;

  const getCreateSessionError = () => {
    return store.getError(chatSessions.createChatSession.name);
  };

  const handleStartChart = async () => {
    await chatSessions.fetchChatSession();

    const chatSession = await chatSessions.createChatSession({
      title: `Chat Session ${chatSessions.data.length}`,
      medicalReport: report._id,
    });

    const error = getCreateSessionError();
    if (error) return console.log(error);

    if (chatSession) navigate(`/portal/patient/chatbot/${chatSession._id}`);
  };

  if (!report)
    return (
      <section className="w-full h-full flex items-center justify-center">
        Select a medical report.
      </section>
    );

  const radialStyle = {
    '--value': `${report.confidenceLevel}`,
    '--size': '6rem',
    '--thickness': '5px',
  } as { [key: string]: string };

  return (
    <div className="relative w-full">
      <div className="px-4 py-8 flex flex-col justify-between w-full margin-x-auto relative">
        <div className="w-full h-[90vh] bg-transparent rounded-md p-5">
          {report && (
            <>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
                <div className="flex items-end gap-x-2">
                  <div className="w-full md:w-auto">
                    <div
                      className="radial-progress"
                      style={radialStyle}
                      role="progressbar"
                    >
                      <div>
                        <Lottie
                          speed={2000}
                          options={{
                            loop: false,
                            autoplay: true,
                            animationData: heartPulzeAnimation,
                            rendererSettings: {
                              preserveAspectRatio: 'xMidYMid slice',
                            },
                          }}
                          height={60}
                          width={60}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pb-1">
                    <p className="text-2xl font-bold">
                      {report.confidenceLevel}%
                    </p>
                    <p className="text-xs">Confidence Level</p>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <button
                    className="btn btn-secondary btn-md text-white/90 btn-outline rounded-full"
                    onClick={handleStartChart}
                  >
                    <span>
                      <Message />
                    </span>
                    <span>Start Conversation</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto mb-10">
                <table className="table rounded-lg overflow-hidden">
                  <tbody>
                    <tr className="bg-base-200 border-b border-gray-800/30">
                      <td>Date Issued</td>
                      <td></td>
                      <td>{report.createdAt.split('T')[0]}</td>
                    </tr>

                    <tr className="bg-base-200">
                      <td>Report Id</td>
                      <td></td>
                      <td>{report._id}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="stats shadow w-full my-4 mb-10">
                <div className="stat">
                  <div className="stat-title">Heart Rate</div>
                  <div className="stat-value text-primary">
                    {report.details.maximumHeartRate}
                  </div>
                  <div className="stat-desc">21% decrement</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Cardio Status</div>
                  <div className="stat-value text-secondary">
                    {report.cadioStatus}
                  </div>
                  <div className="stat-desc">21% improvement</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Staus</div>
                  <div className="stat-value text-accent">
                    {report.status.includes('fine') ? 'NEG' : 'POS'}
                  </div>
                  <div className="stat-desc">
                    {report.status.includes('fine') ? 'Negative' : 'Positive'}
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl mb-2">Patient Details</h3>
                <div className="flex justify-between mb-4">
                  <div className="bg-base-200 dark:bg-slate-500/10 w-full p-4 rounded-md flex items-start gap-2">
                    <div>
                      <div className="bg-neutral text-neutral-content rounded-full w-20 h-20 flex justify-center items-center">
                        <PersonOutline fontSize="large" />
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-xl mb-2">
                        <span>{report.patient.name}</span>
                      </p>
                      <p className="text-xs">
                        <span className="font-semibold">Email : </span>
                        <span>{report.patient.email}</span>
                      </p>
                      <p className="text-xs">
                        <span className="font-semibold">Phone : </span>
                        <span>{report.patient.phone}</span>
                      </p>
                      <p className="text-xs">
                        <span className="font-semibold">Sex : </span>
                        <span>
                          {report.patient.sex === 1 ? 'Male' : 'Female'}
                        </span>
                      </p>
                      <p className="text-xs">
                        <span className="font-semibold">Age : </span>
                        <span>{report.patient.age}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl mb-2">Doctor Details</h3>
                <div className="flex justify-between mb-4">
                  <div className="bg-base-200 dark:bg-slate-500/10 w-full p-4 rounded-md flex items-start gap-2">
                    <div>
                      <div className="bg-neutral text-neutral-content rounded-full w-20 h-20 flex justify-center items-center">
                        <PersonOutline fontSize="large" />
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-xl mb-2">
                        <span>{report.doctor.name || 'N/A'}</span>
                      </p>
                      <p className="text-xs">
                        <span className="font-semibold">Email : </span>
                        <span>{report.doctor.email}</span>
                      </p>
                      <p className="text-xs">
                        <span className="font-semibold">Phone : </span>
                        <span>{report.doctor.phone}</span>
                      </p>
                      <p className="text-xs">
                        <span className="font-semibold">Hosptial : </span>
                        <span>{report.doctor.hospital}</span>
                      </p>
                      <p className="text-xs">
                        <span className="font-semibold">Age : </span>
                        <span>{report.patient.age}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-500/10 p-4">
                <h2 className="text-xl">Summary</h2>
                <p className="text-md opacity-70">{report.status}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
