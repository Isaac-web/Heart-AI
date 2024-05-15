import AppPagination from '@/components/AppPagination';
import AppTable from '@/components/AppTable';
import AppTextInput from '@/components/AppTextInput';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useAppStore } from '@/store';
import { Column, User } from '@/types';
import { Favorite, HeartBroken, Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const columns: Column<User>[] = [
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
    render(patient) {
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
            <div className="font-bold">{patient.name}</div>
            <div className="text-sm opacity-50">{patient.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    label: 'Date Issued',
    value: 'createdAt',
    render(patient) {
      return (
        <div>
          {new Date(patient.createdAt).toLocaleTimeString()}
          <br />
          <span className="badge badge-ghost badge-sm">
            {new Date(patient.createdAt).toLocaleDateString()}
          </span>
        </div>
      );
    },
  },
  {
    label: 'Cadio Status',
    value: 'cadioStatus',
    render(patient) {
      const isHealthy = 0;

      return (
        <div
          className={`w-[10em] px-5 py-2 rounded-full flex gap-2 items-center justify-center border ${
            isHealthy ? 'border-success' : 'border-error'
          }`}
        >
          <div>
            {isHealthy ? (
              <Favorite className="text-success" />
            ) : (
              <HeartBroken className="text-error" />
            )}
          </div>
          <div className="text-xs">
            {isHealthy ? (
              <span className="text-success">Healthy</span>
            ) : (
              <span className="text-error">Not Healthy</span>
            )}
          </div>
        </div>
      );
    },
  },
  {
    label: '',
    value: 'details',
    render(user) {
      return (
        <Link to={`/portal/doctor/medical-reports/new?patientId=${user._id}`}>
          <button className="btn btn-ghost btn-xs">Issue Report</button>
        </Link>
      );
    },
  },
];

const MedicalReports = () => {
  const store = useAppStore();
  const [search, setSearch] = useState('');
  const patients = store.entities.patients;

  useEffect(() => {
    store.entities.patients.fetchPatients({ name: search });
  }, []);

  return (
    <section className="container">
      <div className="mb-16">
        <h1 className="text-3xl font-semibold">Patients</h1>
      </div>

      <div className="grid grid-cols-3 mb-10">
        <div className="col-span-1">
          <AppTextInput
            startAdornment={<Search />}
            placeholder="Search by patient name..."
            value={search}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && search)
                store.entities.patients.fetchPatients({ name: search });
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="mb-10">
        {patients.loading ? (
          <LoadingIndicator />
        ) : !patients.data.length ? (
          <div className="py-10">
            <p className="text-center">No Medical Report</p>
          </div>
        ) : (
          <AppTable<User> columns={columns} data={patients.data} />
        )}
      </div>
      <div>
        <AppPagination />
      </div>
    </section>
  );
};

export default MedicalReports;
