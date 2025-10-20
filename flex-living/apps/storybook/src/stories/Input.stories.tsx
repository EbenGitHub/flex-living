import { Input } from "@flex-living/ui/forms";

export default {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Type here",
  },
};

export const Default = {};
export const Disabled = { args: { disabled: true, value: "disabled" } };


