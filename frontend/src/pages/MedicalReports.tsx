import AppPagination from '@/components/AppPagination';
import AppTable from '@/components/AppTable';
import AppTextInput from '@/components/AppTextInput';
import { Column } from '@/types';
import { Search } from '@mui/icons-material';

interface Appointment {
  name: string;
  country: string;
  imageUrl: string;
  company: string;
  job: string;
  favouriteColor: string;
}

const columns: Column<Appointment>[] = [
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
    label: 'Name',
    value: 'name',
    render(item) {
      return (
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={item.imageUrl} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{item.name}</div>
            <div className="text-sm opacity-50">{item.country}</div>
          </div>
        </div>
      );
    },
  },
  {
    label: 'Job',
    value: 'job',
    render() {
      return (
        <div>
          Zemlak, Daniel and Leannon
          <br />
          <span className="badge badge-ghost badge-sm">
            Desktop Support Technician
          </span>
        </div>
      );
    },
  },
  {
    label: 'Favorit Color',
    value: 'favouriteColor',
  },
  {
    label: '',
    value: 'details',
    render() {
      return <button className="btn btn-ghost btn-xs">details</button>;
    },
  },
];

const data = [
  {
    name: 'Hart Hagerty',
    country: 'United States',
    imageUrl:
      'https://img.daisyui.com/tailwind-css-component-profile-2@56w.png',
    company: 'Zemlak, Daniel and Leannon',
    job: 'Desktop Support Technician',
    favouriteColor: 'Purple',
  },
  {
    name: 'Brice Swyre',
    country: 'China',
    imageUrl:
      'https://img.daisyui.com/tailwind-css-component-profile-3@56w.png',
    company: 'Carroll Group',
    job: 'Tax Accountant',
    favouriteColor: 'Red',
  },
  {
    name: 'Marjy Ferencz',
    country: 'Russia',
    imageUrl:
      'https://img.daisyui.com/tailwind-css-component-profile-4@56w.png',
    company: 'Rowe-Schoen',
    job: 'Office Assistant I',
    favouriteColor: 'Crimson',
  },
  {
    name: 'Yancy Tear',
    country: 'Brazil',
    imageUrl:
      'https://img.daisyui.com/tailwind-css-component-profile-5@56w.png',
    company: 'Wyman-Ledner',
    job: 'Community Outreach Specialist',
    favouriteColor: 'Indigo',
  },
  {
    name: 'Hart Hagerty',
    country: 'United States',
    imageUrl:
      'https://img.daisyui.com/tailwind-css-component-profile-2@56w.png',
    company: 'Zemlak, Daniel and Leannon',
    job: 'Desktop Support Technician',
    favouriteColor: 'Purple',
  },
  {
    name: 'Brice Swyre',
    country: 'China',
    imageUrl:
      'https://img.daisyui.com/tailwind-css-component-profile-3@56w.png',
    company: 'Carroll Group',
    job: 'Tax Accountant',
    favouriteColor: 'Red',
  },
  {
    name: 'Marjy Ferencz',
    country: 'Russia',
    imageUrl:
      'https://img.daisyui.com/tailwind-css-component-profile-4@56w.png',
    company: 'Rowe-Schoen',
    job: 'Office Assistant I',
    favouriteColor: 'Crimson',
  },
  {
    name: 'Yancy Tear',
    country: 'Brazil',
    imageUrl:
      'https://img.daisyui.com/tailwind-css-component-profile-5@56w.png',
    company: 'Wyman-Ledner',
    job: 'Community Outreach Specialist',
    favouriteColor: 'Indigo',
  },
];

const MedicalReports = () => {
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
        <AppTable columns={columns} data={data} />
      </div>
      <div>
        <AppPagination />
      </div>
    </section>
  );
};

export default MedicalReports;
