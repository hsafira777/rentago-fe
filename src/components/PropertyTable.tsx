import CardBox from "@/components/ui/cardbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const dummyProperties = [
  { id: 1, name: "Luxury Apartment", city: "Jakarta", price: "Rp 5.000.000" },
  { id: 2, name: "Cozy Kost", city: "Bandung", price: "Rp 1.500.000" },
  { id: 3, name: "Villa Ubud", city: "Bali", price: "Rp 12.000.000" },
];

export function PropertyTable() {
  return (
    <CardBox>
      <h2 className="text-lg font-semibold mb-4">Recent Properties</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyProperties.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardBox>
  );
}
