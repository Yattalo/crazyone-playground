import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@crazyone/ui-cyberdeck";

const meta: Meta<typeof Card> = {
  title: "Cyberdeck/Card",
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
    <Card className="w-[350px] font-mono">
      <CardHeader>
        <CardTitle className="text-sm">
          <span className="opacity-60">&gt;</span> SYSTEM_STATUS
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-1">
        <p>CPU: <span className="text-primary">OK</span></p>
        <p>MEM: <span className="text-primary">8.2GB FREE</span></p>
        <p>NET: <span className="text-primary">CONNECTED</span></p>
      </CardContent>
    </Card>
  ),
};

export const Terminal: Story = {
  render: () => (
    <Card className="w-[400px] font-mono">
      <CardHeader className="border-b border-border pb-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-3 h-3 rounded-full bg-destructive" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="ml-2 text-muted-foreground">~/projects/deck</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 text-xs text-primary">
        <pre>{`$ ls -la
drwxr-xr-x  user  4096  components/
drwxr-xr-x  user  4096  styles/
-rw-r--r--  user  2048  config.ts
$ _`}</pre>
      </CardContent>
    </Card>
  ),
};

export const SystemMonitor: Story = {
  render: () => (
    <Card className="w-[300px] font-mono text-xs">
      <CardHeader>
        <CardTitle className="text-sm">[SYSTEM MONITOR]</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span>CPU</span>
            <span className="text-primary">23%</span>
          </div>
          <div className="h-2 bg-muted">
            <div className="h-full bg-primary" style={{ width: "23%" }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>MEM</span>
            <span className="text-primary">67%</span>
          </div>
          <div className="h-2 bg-muted">
            <div className="h-full bg-primary" style={{ width: "67%" }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>DISK</span>
            <span className="text-primary">45%</span>
          </div>
          <div className="h-2 bg-muted">
            <div className="h-full bg-primary" style={{ width: "45%" }} />
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const BootSequence: Story = {
  render: () => (
    <Card className="w-[400px] font-mono text-xs">
      <CardContent className="p-4 space-y-1">
        <p><span className="text-primary">&gt;</span> LOADING CYBERDECK_UI v0.1.0</p>
        <p><span className="text-primary">&gt;</span> INITIALIZING MODULES...</p>
        <p><span className="text-primary">&gt;</span> CORE: [OK]</p>
        <p><span className="text-primary">&gt;</span> NETWORK: [OK]</p>
        <p><span className="text-primary">&gt;</span> SECURITY: [OK]</p>
        <p><span className="text-primary">&gt;</span> STATUS: ONLINE<span className="animate-pulse">_</span></p>
      </CardContent>
    </Card>
  ),
};
