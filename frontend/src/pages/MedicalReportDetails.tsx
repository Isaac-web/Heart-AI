import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const MedicalReportDetails = () => {
  const store = useAppStore();
  const { id: reportId } = useParams();
  const medicalReport = store.details.medicalReport;

  useEffect(() => {
    if (reportId) medicalReport.getMedicalReportById(reportId);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-center text-3xl font-bold mb-5">
        Medical Report Details
      </h1>
      <p className="text-xs text-center">
        This page is still under development
      </p>

      {medicalReport.loading ? (
        <p>Loading Cadio Status...</p>
      ) : (
        <p
          className="text-center py-20"
          style={{
            color:
              medicalReport.data.status ===
              'Your heart is fine, you do not have heart disease'
                ? 'green'
                : 'red',
          }}
        >
          {medicalReport.data.status}
        </p>
      )}
    </div>
  );
};

export default MedicalReportDetails;
