import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@crazyone/ui-cyberdeck";

const meta: Meta<typeof Button> = {
  title: "Cyberdeck/Button",
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
    children: "EXECUTE",
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
    children: "TERMINATE",
    variant: "destructive",
  },
};

export const WithTerminalPrefix: Story = {
  render: () => (
    <Button>
      <span className="opacity-60 mr-2">$</span>
      RUN PROGRAM
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 font-mono">
      <Button>$ EXECUTE</Button>
      <Button variant="secondary">STANDBY</Button>
      <Button variant="destructive">ABORT</Button>
      <Button variant="outline">STATUS</Button>
      <Button variant="ghost">[MENU]</Button>
      <Button variant="link">./help</Button>
    </div>
  ),
};

export const TerminalCommands: Story = {
  render: () => (
    <div className="flex flex-col gap-2 font-mono text-sm">
      <Button variant="ghost" className="justify-start">
        <span className="text-primary mr-2">&gt;</span> ls -la
      </Button>
      <Button variant="ghost" className="justify-start">
        <span className="text-primary mr-2">&gt;</span> cat config.ts
      </Button>
      <Button variant="ghost" className="justify-start">
        <span className="text-primary mr-2">&gt;</span> npm run build
      </Button>
    </div>
  ),
};
