import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@crazyone/ui-hologram";

const meta: Meta<typeof Card> = {
  title: "Hologram/Card",
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
        <CardTitle className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Holographic Interface
        </CardTitle>
        <CardDescription>Tomorrow's UI, rendered today</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Iridescent gradients and prismatic effects.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Activate</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithPrismaticBorder: Story = {
  render: () => (
    <div
      className="p-[2px] rounded-[18px]"
      style={{
        background: "linear-gradient(135deg, #a855f7, #ec4899, #06b6d4, #a855f7)",
        backgroundSize: "300% 300%",
        animation: "gradient 4s ease infinite",
      }}
    >
      <Card className="bg-card/95 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Prismatic Border</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Animated gradient border effect.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const GlassCard: Story = {
  render: () => (
    <div className="relative p-8">
      {/* Background orbs */}
      <div
        className="absolute top-0 left-0 w-32 h-32 rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.6), transparent)",
          filter: "blur(40px)"
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.6), transparent)",
          filter: "blur(40px)"
        }}
      />

      <Card className="relative bg-card/80 backdrop-blur-xl w-[300px]">
        <CardHeader>
          <CardTitle className="font-light">Glass Effect</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Frosted glass with ambient orbs.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const ModuleGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="bg-card/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg font-light">Module {i}</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="h-16 rounded-lg"
              style={{
                background: `linear-gradient(135deg,
                  hsl(${260 + i * 20} 100% 70% / 0.2),
                  hsl(${300 + i * 20} 100% 70% / 0.1)
                )`
              }}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
