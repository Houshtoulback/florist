import WhyChooseUs from "../components/WhyChooseUs";
import Collections from "../components/Collections";
// import Blog from "../components/Blog";
import Comments from "../components/Comments";
import Hero from "../components/Hero";
import { Helmet } from "react-helmet-async";

export default function LandingPage() {
  return (
    <div>
      <Helmet>
        <title>florist</title>
      </Helmet>
      <Hero />
      <WhyChooseUs />
      <Collections />
      {/* <Blog /> */}
      <Comments />;
    </div>
  );
}
