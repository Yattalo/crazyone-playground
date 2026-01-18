import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@crazyone/ui-bubblegum";

const meta: Meta<typeof Button> = {
  title: "Bubblegum/Button",
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
    children: "Click me!",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

export const WithEmoji: Story = {
  render: () => (
    <Button>
      <span className="mr-2">🍬</span>
      Sweet!
    </Button>
  ),
};

export const PillShape: Story = {
  render: () => (
    <Button className="rounded-full px-8">
      Subscribe
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const FunButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button className="rounded-full">
        <span className="mr-2">🎉</span>
        Yay!
      </Button>
      <Button variant="secondary" className="rounded-full">
        <span className="mr-2">🍭</span>
        Candy
      </Button>
      <Button variant="outline" className="rounded-full">
        <span className="mr-2">✨</span>
        Sparkle
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
