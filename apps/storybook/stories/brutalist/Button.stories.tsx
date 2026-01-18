import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@crazyone/ui-brutalist";

const meta: Meta<typeof Button> = {
  title: "Brutalist/Button",
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
    children: "SUBMIT",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "CANCEL",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "DELETE",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "OUTLINE",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "GHOST",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    children: "LEARN MORE",
    variant: "link",
  },
};

export const Small: Story = {
  args: {
    children: "SMALL",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "LARGE",
    size: "lg",
  },
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
