import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        <Hero />
        <Features />
      </div>
      <Footer />
    </div>
  );
};

export default Home;