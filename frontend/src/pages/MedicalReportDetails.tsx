import { useAppStore } from '@/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReportCard from './patient/ReportCard';

const MedicalReportDetails = () => {
  const store = useAppStore();
  const { id: reportId } = useParams();
  const medicalReport = store.details.medicalReport;

  useEffect(() => {
    if (reportId) medicalReport.getMedicalReportById(reportId);
  }, []);

  return (
    <section className="p-10  w-full">
      <div className="justify-center mx-auto max-w-3xl">
        <div>
          <h1 className="text-left text-3xl font-bold mb-5">
            Medical Report Details
          </h1>
        </div>

        {medicalReport.loading ? (
          <>loading</>
        ) : (
          <div>
            <ReportCard report={medicalReport.data} />
          </div>
        )}
      </div>
    </section>
  );
};

export default MedicalReportDetails;
