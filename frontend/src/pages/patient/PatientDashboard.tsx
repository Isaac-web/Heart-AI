import { useAppStore } from '@/store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const PatientDashboard = () => {
  const store = useAppStore();

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PatientDashboard;
