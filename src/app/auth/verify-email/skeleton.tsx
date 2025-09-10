import CardBox from "@/components/ui/cardbox";

export default function VerifyEmailSkeleton() {
  return (
    <CardBox className="space-y-6 animate-pulse">
      {/* Judul */}
      <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>

      {/* Input Password */}
      <div className="space-y-4">
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>

      {/* Tombol Submit */}
      <div className="h-10 bg-gray-300 rounded w-full"></div>
    </CardBox>
  );
}
