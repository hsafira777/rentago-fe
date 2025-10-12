import Hero from "@/components/Hero"
// import SearchForm from "@/components/SearchForm";
import ListPropertyBanner from "@/components/CTABanner";
import PropertyList from "@/components/PropertyList";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="max-w-6xl mx-auto px-4">
        {/* <SearchForm /> */}
        <PropertyList />
      </div>
      <div className="w-full flex justify-center px-4">
        <ListPropertyBanner />
      </div>
      <Footer />
    </div>
  );
}
