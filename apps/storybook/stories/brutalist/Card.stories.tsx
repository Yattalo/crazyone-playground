import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@crazyone/ui-brutalist";

const meta: Meta<typeof Card> = {
  title: "Brutalist/Card",
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
        <CardTitle>SECTION TITLE</CardTitle>
        <CardDescription>Raw concrete aesthetic</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content goes here. No rounded corners. No apologies.</p>
      </CardContent>
      <CardFooter>
        <Button>ACTION</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithCoordinates: Story = {
  render: () => (
    <Card className="w-[350px]" data-coord="01.02">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">[01.02]</span>
          GRID POSITION
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Components with grid coordinates for navigation.</p>
      </CardContent>
    </Card>
  ),
};

export const WithOffsetShadow: Story = {
  render: () => (
    <Card className="w-[350px] shadow-[4px_4px_0_0_hsl(var(--foreground))]">
      <CardHeader>
        <CardTitle>OFFSET SHADOW</CardTitle>
      </CardHeader>
      <CardContent>
        <p>The signature brutalist effect.</p>
      </CardContent>
    </Card>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card data-coord="01.01">
        <CardHeader>
          <CardTitle className="text-sm">[01.01]</CardTitle>
        </CardHeader>
        <CardContent>Panel A</CardContent>
      </Card>
      <Card data-coord="01.02">
        <CardHeader>
          <CardTitle className="text-sm">[01.02]</CardTitle>
        </CardHeader>
        <CardContent>Panel B</CardContent>
      </Card>
      <Card data-coord="02.01">
        <CardHeader>
          <CardTitle className="text-sm">[02.01]</CardTitle>
        </CardHeader>
        <CardContent>Panel C</CardContent>
      </Card>
      <Card data-coord="02.02">
        <CardHeader>
          <CardTitle className="text-sm">[02.02]</CardTitle>
        </CardHeader>
        <CardContent>Panel D</CardContent>
      </Card>
    </div>
  ),
};
