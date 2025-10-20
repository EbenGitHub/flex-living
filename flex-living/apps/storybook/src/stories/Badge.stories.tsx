import { Badge } from "@flex-living/ui/badges";

export default {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
};

export const Default = {};
export const Secondary = { args: { variant: "secondary" } };
export const Destructive = { args: { variant: "destructive" } };
export const Outline = { args: { variant: "outline" } };


