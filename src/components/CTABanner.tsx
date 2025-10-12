import CardBox from "@/components/ui/cardbox";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function ListPropertyBanner() {
  return (
    <CardBox className="mt-6 text-center bg-gradient-to-r from-blue-600 to-blue-600 text-white max-w-none">
      <h2 className="text-2xl font-bold mb-2">Have a property to rent?</h2>
      <p className="text-sm mb-4 opacity-90">
        Join us and list your property today. It only takes a few minutes!
      </p>
      <Link href="/auth/login">
        <Button variant="white" className="px-6 py-2 rounded-full font-bold">
          List Your Property
        </Button>
      </Link>
    </CardBox>
  );
}
