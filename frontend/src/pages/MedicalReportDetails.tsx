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

  console.log(medicalReport.data);

  return <div>MedicalReportDetails</div>;
};

export default MedicalReportDetails;
