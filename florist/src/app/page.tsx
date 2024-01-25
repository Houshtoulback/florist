import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Collections from "@/components/Collections";
import Comments from "@/components/Comments";
import Footer from "@/components/Footer";
// import Nav from "@/components/Nav";

export default function homescreen() {
  return (
    <div className='relative'>
      {/* <Nav /> */}
      <Navbar cartItems={5} />
      <Hero />
      <WhyChooseUs />
      <Collections />
      <Comments />
      <Footer />
    </div>
  );
}
