import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@crazyone/ui-vaporwave";

const meta: Meta<typeof Button> = {
  title: "Vaporwave/Button",
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
    children: "アクセス",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "リセット",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "削除",
    variant: "destructive",
  },
};

export const WithVHSTimestamp: Story = {
  render: () => (
    <Button className="relative">
      PLAY
      <span className="absolute -top-2 -right-2 text-xs opacity-60">
        12:34:56
      </span>
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>DEFAULT</Button>
      <Button variant="secondary">SECONDARY</Button>
      <Button variant="destructive">DESTRUCTIVE</Button>
      <Button variant="outline">OUTLINE</Button>
      <Button variant="ghost">GHOST</Button>
      <Button variant="link">LINK</Button>
    </div>
  ),
};

export const JapaneseText: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>アクセス</Button>
      <Button variant="secondary">キャンセル</Button>
      <Button variant="outline">詳細</Button>
    </div>
  ),
};
