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
    <section className="p-10">
      <h1 className="text-center text-3xl font-bold mb-5">
        Medical Report Details
      </h1>
      <p className="text-xs text-center">
        This page is still under development
      </p>

      {medicalReport.loading ? (
        <p className="text-center">Loading Cadio Status...</p>
      ) : (
        <div className="flex justify-center max-w-xl">
          <ReportCard report={medicalReport.data} />
        </div>
      )}
    </section>
  );
};

export default MedicalReportDetails;
