import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@crazyone/ui-brutalist";

const meta: Meta<typeof Tabs> = {
  title: "Brutalist/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="p-4">
        Change your password here.
      </TabsContent>
    </Tabs>
  ),
};

export const ThreeTab: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        Content for tab 1.
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        Content for tab 2.
      </TabsContent>
      <TabsContent value="tab3" className="p-4">
        Content for tab 3.
      </TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications" disabled>
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="p-4">
        Change your password here.
      </TabsContent>
    </Tabs>
  ),
};
