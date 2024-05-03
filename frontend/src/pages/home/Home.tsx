import Hero from "../../components/Hero";
import Features from "../../components/Features";
import Footer from "../../components/Footer";
import bgcc from "../../assets/images/bgcc.jpg";

const backgroundImageStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
  backgroundImage: `url(${bgcc})`,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  
};

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen"  style ={backgroundImageStyle}>
      <div></div>
      <div className="flex-grow">
        <Hero />
        <Features />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
