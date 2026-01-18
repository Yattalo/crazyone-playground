import { motion } from "motion/react";
import { Button, Card, CardContent } from "@crazyone/ui-cyberdeck";
import { Download, Github, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

const bootSequence = [
  "> LOADING CYBERDECK_UI v0.1.0...",
  "> INITIALIZING NEURAL INTERFACE...",
  "> SCANNING COMPONENT MATRIX...",
  "> ESTABLISHING SECURE CONNECTION...",
  "> STATUS: ONLINE",
];

export function CyberdeckHero() {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < bootSequence.length) {
        setBootLines((prev) => [...prev, bootSequence[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowContent(true), 500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0d0d0d] text-[#00ff00] overflow-hidden font-mono">
      {/* Matrix rain effect (simplified) */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 text-[#00ff00] text-xs whitespace-pre animate-pulse"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.2}s`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          >
            {Array.from({ length: 30 })
              .map(() => String.fromCharCode(0x30a0 + Math.random() * 96))
              .join("\n")}
          </div>
        ))}
      </div>

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 4px
          )`,
        }}
      />

      {/* CRT glow effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,255,0,0.1)]" />

      {/* Header bar */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-[#00ff00]/10 border-b border-[#00ff00]/30 flex items-center px-4">
        <div className="flex items-center gap-2 text-xs">
          <Terminal className="w-4 h-4" />
          <span>CYBERDECK_TERMINAL</span>
        </div>
        <div className="ml-auto text-xs opacity-60">
          [SECURE] :: NODE_42.MESH
        </div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-8 py-32 pt-20">
        {/* Boot sequence */}
        <div className="mb-8 text-sm">
          {bootLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={
                line.includes("ONLINE") ? "text-[#00ffff]" : "opacity-70"
              }
            >
              {line}
              {i === bootLines.length - 1 && (
                <span className="animate-pulse">|</span>
              )}
            </motion.div>
          ))}
        </div>

        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-16 items-start"
          >
            {/* Left column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl lg:text-7xl font-bold uppercase tracking-wider mb-6">
                  <span className="block text-[#00ffff]">&gt; CYBERDECK</span>
                  <span className="block text-[#00ff00]">_UI</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg max-w-md mb-8 opacity-80"
              >
                Components for those who speak in code. Terminal-native UI for
                the neural age.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Button size="lg" className="gap-2">
                  <Download className="w-5 h-5" />
                  DOWNLOAD_
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Github className="w-5 h-5" />
                  SOURCE_
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-6 mt-12 pt-6 border-t border-[#00ff00]/30"
              >
                {[
                  { value: "7+", label: "COMPONENTS" },
                  { value: "0ms", label: "LAG" },
                  { value: "∞", label: "UPTIME" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-[#00ffff]">
                      {stat.value}
                    </div>
                    <div className="text-xs opacity-60 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right column - Terminal card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-[#00ff00]/50">
                <div className="bg-[#00ff00]/10 px-4 py-2 border-b border-[#00ff00]/30 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-2 text-xs opacity-60">
                    install.sh
                  </span>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-[#00ffff]">$</span> bun add
                      @crazyone/ui-cyberdeck
                    </div>
                    <div className="opacity-60">
                      <span className="text-[#00ff00]">+</span> Installing
                      dependencies...
                    </div>
                    <div className="opacity-60">
                      <span className="text-[#00ff00]">+</span> Patching neural
                      interface...
                    </div>
                    <div className="opacity-60">
                      <span className="text-[#00ff00]">+</span> Syncing with the
                      mesh...
                    </div>
                    <div className="pt-2 border-t border-[#00ff00]/20">
                      <span className="text-[#00ffff]">SUCCESS</span> Ready to
                      jack in.
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Secondary card */}
              <Card className="mt-4 border-[#00ffff]/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#00ff00] animate-pulse" />
                    <span className="text-sm">SYSTEM NOMINAL</span>
                    <span className="ml-auto text-xs opacity-60">
                      PING: 3ms
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Bottom status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs opacity-60"
        >
          <div>[ESC] EXIT | [TAB] NAVIGATE | [ENTER] SELECT</div>
          <div>MEM: 64GB FREE | CPU: 2.3% | NET: CONNECTED</div>
        </motion.div>
      </div>
    </section>
  );
}
