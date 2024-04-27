import FloatingActionButton from "@/components/FloatingActionButton";
import HeaderWithAvatar from "@/components/HeaderWithAvatar";
import Results from "@/components/Results";

const Dashboard = () => {
  return (
    <>
      <div className="md:max-w-2xl md:mx-auto">
        <HeaderWithAvatar />
        <Results />

        <FloatingActionButton />
      </div>
    </>
  );
};

export default Dashboard;
