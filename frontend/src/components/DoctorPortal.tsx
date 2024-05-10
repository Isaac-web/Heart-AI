import { useAppStore } from '@/store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const DoctorPortal = () => {
  const store = useAppStore();
  const doctor = store.auth.doctor;

  const getCurrentDoctor = () => {
    if (!doctor.data._id) doctor.getCurrentDoctor();
  };

  useEffect(() => {
    getCurrentDoctor();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default DoctorPortal;
