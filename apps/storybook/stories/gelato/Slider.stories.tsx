import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@crazyone/ui-gelato";

const meta: Meta<typeof Slider> = {
  title: "Gelato/Slider",
  component: Slider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label className="text-sm font-medium">Volume</label>
      <Slider defaultValue={[70]} max={100} step={1} />
    </div>
  ),
};
