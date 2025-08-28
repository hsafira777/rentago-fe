export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Rentago. Semua Hak Dilindungi.</p>
      </div>
    </footer>
  );
}
