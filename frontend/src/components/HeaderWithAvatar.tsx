import Avatar from "react-avatar";


const HeaderWithAvatar = () => {
  return (
    <div className="flex items-center">
      {/* <FaBars className="ml-3 mr-5 mt-8" /> */}
      <div className="flex items-center ml-3">
        <h1 className="text-dark-blue font-bold text-xl mt-8 mr-48 md:mr-96">
          HeartAI
        </h1>
        <Avatar
          name=""
          src="/src/assets/images/avatar.png"
          size="50"
          round={true}
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default HeaderWithAvatar;
