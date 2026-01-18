import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@crazyone/ui-bubblegum";

const meta: Meta<typeof Card> = {
  title: "Bubblegum/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🍬</span>
          Sweet Deal!
        </CardTitle>
        <CardDescription>Get 50% off your first order</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Limited time offer on all candy products.</p>
      </CardContent>
      <CardFooter>
        <Button className="rounded-full">Grab it now!</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithShadow: Story = {
  render: () => (
    <Card
      className="w-[350px]"
      style={{
        boxShadow: "0 4px 0 0 rgba(255, 105, 180, 0.3), 0 8px 20px -4px rgba(255, 105, 180, 0.2)"
      }}
    >
      <CardHeader>
        <CardTitle>Candy Shadow</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Cards with playful colored shadows.</p>
      </CardContent>
    </Card>
  ),
};

export const ProductGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {["🍬", "🍭", "🍫"].map((emoji, i) => (
        <Card
          key={i}
          className="cursor-pointer hover:scale-105 transition-transform"
          style={{
            boxShadow: "0 4px 0 0 rgba(255, 105, 180, 0.3)"
          }}
        >
          <CardContent className="p-8 text-center">
            <span className="text-5xl block mb-4">{emoji}</span>
            <h3 className="font-bold text-lg">Product {i + 1}</h3>
            <p className="text-muted-foreground text-sm">$9.99</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const Notification: Story = {
  render: () => (
    <Card className="w-[300px] border-2 border-primary">
      <CardContent className="p-4 flex items-center gap-3">
        <span className="text-3xl">🎉</span>
        <div>
          <p className="font-bold">Congrats!</p>
          <p className="text-sm text-muted-foreground">You earned a badge!</p>
        </div>
      </CardContent>
    </Card>
  ),
};

export const FloatingCard: Story = {
  render: () => (
    <div className="relative p-8">
      {/* Floating decorations */}
      <div className="absolute top-2 left-2 w-8 h-8 bg-pink-300 rounded-full opacity-60" />
      <div className="absolute top-6 right-4 w-6 h-6 bg-cyan-300 rounded-full opacity-50" />
      <div className="absolute bottom-4 left-8 w-10 h-10 bg-yellow-300 rounded-full opacity-40" />

      <Card className="relative w-[300px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>✨</span>
            Magic Card
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>With floating candy decorations!</p>
        </CardContent>
      </Card>
    </div>
  ),
};
