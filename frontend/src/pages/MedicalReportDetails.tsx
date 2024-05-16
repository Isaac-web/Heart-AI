import { useAppStore } from '@/store';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ReportCard from './patient/ReportCard';
import Form from '@/components/form/Form';
import FormTextfield from '@/components/form/FormTextfield';
import FormSubmitButton from '@/components/form/FormSubmitButton';
import { Edit } from '@mui/icons-material';
import { MedicalReportUpdateFormData } from '@/types';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  finalVerdict: Yup.string().required(),
});

const MedicalReportDetails = () => {
  const store = useAppStore();
  const { id: reportId } = useParams();
  const medicalReport = store.details.medicalReport;
  const location = useLocation();

  const getMedicalReportUpdateError = () => {
    return store.getError(medicalReport.updateMedicalReport.name);
  };

  const getUserType = () => {
    return location.pathname.startsWith('/portal/doctor')
      ? 'doctor'
      : 'patient';
  };

  const handleUpdateMedicalReport = async (
    data: MedicalReportUpdateFormData
  ) => {
    if (reportId) {
      await medicalReport.updateMedicalReport(reportId, data);

      const error = getMedicalReportUpdateError();
      if (!error) {
        console.log('medical report updated');
      }
    }
  };

  useEffect(() => {
    if (reportId) medicalReport.getMedicalReportById(reportId);
  }, [reportId]);

  return (
    <section className="w-full py-10">
      <div className="justify-center mx-auto max-w-3xl">
        <div className="px-9">
          <h1 className="text-left text-3xl font-bold mb-5">
            Medical Report Details
          </h1>
        </div>

        {medicalReport.loading ? (
          <p className="text-sm text-center">loading</p>
        ) : (
          <div>
            <ReportCard report={medicalReport.data} />

            {getUserType() === 'doctor' ? (
              <div className="px-10">
                <Form
                  initialValues={{ finalVerdict: '' }}
                  onSubmit={handleUpdateMedicalReport}
                  validationSchema={validationSchema}
                >
                  <div className="mb-4">
                    <FormTextfield
                      placeholder="Enter final verdict here..."
                      name={'finalVerdict'}
                    />
                  </div>
                  <div className="max-w-48">
                    <FormSubmitButton loading={medicalReport.isPending}>
                      <span>Update Report</span>
                      <span>
                        <Edit fontSize="small" />
                      </span>
                    </FormSubmitButton>
                  </div>
                </Form>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
};

export default MedicalReportDetails;
