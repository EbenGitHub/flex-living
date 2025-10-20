import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@flex-living/ui/selects";

export default {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
};

export const Basic = {
  render: () => (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="one">One</SelectItem>
        <SelectItem value="two">Two</SelectItem>
        <SelectItem value="three">Three</SelectItem>
      </SelectContent>
    </Select>
  ),
};


