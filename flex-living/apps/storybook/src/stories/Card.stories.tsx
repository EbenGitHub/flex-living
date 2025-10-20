import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@flex-living/ui/cards";

export default {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export const Basic = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Short description for the card</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Some quick example content to build on the card.</p>
      </CardContent>
      <CardFooter>
        <button className="px-3 py-2 rounded-md bg-gray-900 text-white text-sm">Action</button>
      </CardFooter>
    </Card>
  ),
};


