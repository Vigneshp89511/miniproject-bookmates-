import {
  CTA,
  FeaturedBooks,
  Features,
  Footer,
  Header,
  Hero,
  HowItWorks,
  Testimonials,
} from "../components";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedBooks />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
