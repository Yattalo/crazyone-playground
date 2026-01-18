import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@crazyone/ui-vaporwave";

const meta: Meta<typeof Card> = {
  title: "Vaporwave/Card",
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
        <CardTitle>ビデオショップ</CardTitle>
        <CardDescription>Dead malls, eternal sunset</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Welcome to the eternal mall.</p>
      </CardContent>
      <CardFooter>
        <Button>エンター</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithChromaticEffect: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle
          className="animate-pulse"
          style={{
            textShadow: "-2px 0 #FF6AD5, 2px 0 #01CDFE"
          }}
        >
          V A P O R W A V E
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">アエステティック</p>
      </CardContent>
    </Card>
  ),
};

export const MallDirectory: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card>
        <CardContent className="p-6 text-center">
          <span className="text-3xl mb-2 block">🎮</span>
          <p className="font-bold">ARCADE</p>
          <p className="text-xs text-muted-foreground">Floor 2</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <span className="text-3xl mb-2 block">📼</span>
          <p className="font-bold">VIDEO</p>
          <p className="text-xs text-muted-foreground">Floor 1</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <span className="text-3xl mb-2 block">🍕</span>
          <p className="font-bold">FOOD COURT</p>
          <p className="text-xs text-muted-foreground">Floor 3</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <span className="text-3xl mb-2 block">🌴</span>
          <p className="font-bold">ATRIUM</p>
          <p className="text-xs text-muted-foreground">All Floors</p>
        </CardContent>
      </Card>
    </div>
  ),
};
