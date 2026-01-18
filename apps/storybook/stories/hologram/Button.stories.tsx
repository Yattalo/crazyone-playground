import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@crazyone/ui-hologram";

const meta: Meta<typeof Button> = {
  title: "Hologram/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Activate",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Configure",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Deactivate",
    variant: "destructive",
  },
};

export const WithGradientText: Story = {
  render: () => (
    <Button className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500">
      <span className="text-white">Initialize Portal</span>
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Activate</Button>
      <Button variant="secondary">Configure</Button>
      <Button variant="destructive">Terminate</Button>
      <Button variant="outline">Scan</Button>
      <Button variant="ghost">Menu</Button>
      <Button variant="link">Learn more</Button>
    </div>
  ),
};

export const GlassEffect: Story = {
  render: () => (
    <div className="relative p-8 rounded-xl" style={{ background: "linear-gradient(135deg, #a855f7, #ec4899, #06b6d4)" }}>
      <Button variant="secondary" className="backdrop-blur-xl bg-white/10 border-white/20">
        Glass Button
      </Button>
    </div>
  ),
};
