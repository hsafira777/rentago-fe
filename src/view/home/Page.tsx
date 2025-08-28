import Hero from "@/components/Hero"
import SearchForm from "@/components/SearchForm";
import PropertyList from "@/components/PropertyList";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="max-w-6xl mx-auto px-4">
        <SearchForm />
        <PropertyList />
      </div>
      <Footer />
    </div>
  );
}
