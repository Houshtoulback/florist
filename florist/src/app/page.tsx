import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Collections from "@/components/Collections";
import Comments from "@/components/Comments";
import Footer from "@/components/Footer";

export default function homescreen() {
  return (
    <div>
      <Hero />
      <WhyChooseUs />
      <Collections />
      <Comments />
      <Footer />
    </div>
  );
}
