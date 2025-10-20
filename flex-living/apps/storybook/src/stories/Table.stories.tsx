import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell, TableCaption, TableFooter } from "@flex-living/ui/tables";

export default {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
};

export const Basic = {
  render: () => (
    <Table>
      <TableCaption>A simple table example</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Jane Doe</TableCell>
          <TableCell>Manager</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>John Smith</TableCell>
          <TableCell>Analyst</TableCell>
          <TableCell>Inactive</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>2 total entries</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};


