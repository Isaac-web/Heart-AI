import AppPagination from '@/components/AppPagination';
import AppTable from '@/components/AppTable';
import AppTextInput from '@/components/AppTextInput';
import { Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface Appointment {
  name: string;
  country: string;
  imageUrl: string;
  company: string;
  job: string;
  favouriteColor: string;
}

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

const AppointmentsPage = () => {
  return (
    <section className="container">
      <div className="mb-16">
        <h1 className="text-3xl font-semibold">Appointments</h1>
      </div>

      <div className="grid grid-cols-3 mb-10">
        <div className="col-span-1">
          <AppTextInput
            startAdornment={<Search />}
            placeholder="Search by username..."
          />
        </div>
      </div>

      <div className="mb-10">
        <AppTable<Appointment>
          columns={[
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
                        <img
                          src={item.imageUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
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
              render(item) {
                return (
                  <>
                    <div className="drawer drawer-end">
                      <input
                        id="my-drawer-4"
                        type="checkbox"
                        className="drawer-toggle"
                      />
                      <div className="drawer-content">
                        <label
                          htmlFor="my-drawer-4"
                          className="btn btn-ghost btn-xs z-10"
                          onClick={() => {
                            console.log(item);
                          }}
                        >
                          details
                        </label>
                      </div>

                      <div className="drawer-side z-20">
                        <label
                          htmlFor="my-drawer-4"
                          aria-label="close sidebar"
                          className="drawer-overlay"
                        ></label>

                        <div className="menu p-4 w-3/4 lg:w-1/3 min-h-full bg-base-200 text-base-content py-16 lg:px-10">
                          <div>
                            <div className="flex items-start gap-5">
                              <div>
                                <div className="bg-neutral text-neutral-content rounded-full w-24 h-24 flex justify-center items-center">
                                  <span className="text-3xl">D</span>
                                </div>
                              </div>

                              <div className="pt-5 w-full">
                                <div className="mb-10">
                                  <p className="text-xl dark:text-white/90">
                                    John Doe
                                  </p>
                                  <p className="text-sm">example@gmail.com</p>
                                </div>

                                <div className="mb-10 flex flex-col gap-2">
                                  <p className="text-sm">Age: 32</p>
                                  <p className="text-sm">Sex: Male</p>
                                  <p className="text-sm">Appointment Date: </p>
                                </div>

                                <div className="bg-base-100 dark:bg-black/15 p-4 rounded-lg w-full mb-10">
                                  <p className="text-sm">
                                    Patient did not attach any note to
                                    appointment.
                                  </p>
                                </div>

                                <Link to="/portal/doctor/medical-reports/new">
                                  <button className="btn btn-primary btn-sm font-normal text-white">
                                    Issue Medical Report
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              },
            },
          ]}
          data={data}
        />
      </div>
      <div>
        <AppPagination />
      </div>
    </section>
  );
};

export default AppointmentsPage;
