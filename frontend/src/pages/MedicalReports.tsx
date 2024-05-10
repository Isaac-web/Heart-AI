import AppPagination from '@/components/AppPagination';
import AppTable from '@/components/AppTable';
import AppTextInput from '@/components/AppTextInput';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useAppStore } from '@/store';
import { Column, MedicalReport } from '@/types';
import { Search } from '@mui/icons-material';
import { useEffect } from 'react';

// interface Appointment {
//   name: string;
//   country: string;
//   imageUrl: string;
//   company: string;
//   job: string;
//   favouriteColor: string;
// }

const columns: Column<MedicalReport>[] = [
  {
    label: '',
    value: 'checkbox',
    render() {
      return (
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      );
    },
  },
  {
    label: 'Patient Name',
    value: 'name',
    render(report) {
      return (
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={
                  'https://img.daisyui.com/tailwind-css-component-profile-2@56w.png'
                }
                alt="User Avatar"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{report.patient.name}</div>
            <div className="text-sm opacity-50">{report.patient.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    label: 'Date Issued',
    value: 'createdAt',
    render(report) {
      return (
        <div>
          {new Date().toLocaleTimeString()}
          <br />
          <span className="badge badge-ghost badge-sm">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      );
    },
  },
  {
    label: 'Cadio Status',
    value: 'cadioStatus',
  },
  {
    label: '',
    value: 'details',
    render() {
      return <button className="btn btn-ghost btn-xs">details</button>;
    },
  },
];

const MedicalReports = () => {
  const store = useAppStore();
  const medicalReports = store.entities.medicalReports;

  useEffect(() => {
    store.entities.medicalReports.fetchMedicalReports();
  }, []);

  return (
    <section className="container">
      <div className="mb-16">
        <h1 className="text-3xl font-semibold">Medical Reports</h1>
      </div>

      <div className="grid grid-cols-3 mb-10">
        <div className="col-span-1">
          <AppTextInput
            startAdornment={<Search />}
            placeholder="Search by patient name..."
          />
        </div>
      </div>

      <div className="mb-10">
        {medicalReports.loading ? (
          <LoadingIndicator />
        ) : !medicalReports.data.length ? (
          <div className="py-10">
            <p className="text-center">No Medical Report</p>
          </div>
        ) : (
          <AppTable columns={columns} data={medicalReports.data} />
        )}
      </div>
      <div>
        <AppPagination />
      </div>
    </section>
  );
};

export default MedicalReports;
