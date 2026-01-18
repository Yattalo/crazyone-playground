import { motion } from "motion/react";
import { Button, Card, CardContent } from "@crazyone/ui-vaporwave";
import { Download, Github, Play } from "lucide-react";
import { useEffect, useState } from "react";

export function VaporwaveHero() {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#1a0a1e] text-[#e0f7fa] overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d1b35] via-[#1a0a1e] to-[#0d0510]" />

      {/* Sun/moon */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-b from-[#FF6AD5] to-[#C774E8] opacity-80 blur-sm" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-32 rounded-t-full bg-gradient-to-b from-[#FF6AD5] to-[#C774E8] opacity-90" />

      {/* Horizontal lines (horizon) */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 20px,
              #FF6AD5 20px,
              #FF6AD5 21px
            )`,
            perspective: "200px",
            transform: "rotateX(60deg)",
            transformOrigin: "center top",
            opacity: 0.3,
          }}
        />
      </div>

      {/* Vertical grid lines */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden opacity-20"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            #01CDFE,
            #01CDFE 1px,
            transparent 1px,
            transparent 60px
          )`,
          perspective: "200px",
          transform: "rotateX(60deg)",
          transformOrigin: "center top",
        }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.3) 2px,
            rgba(0,0,0,0.3) 4px
          )`,
        }}
      />

      {/* VHS timestamp */}
      <div className="absolute top-4 left-4 font-mono text-sm text-[#01CDFE]">
        <span className="mr-2">
          <Play className="w-3 h-3 inline" /> PLAY
        </span>
        {time}
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Japanese subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <span className="text-2xl tracking-[0.5em] text-[#01CDFE]">
              アエステティック
            </span>
          </motion.div>

          {/* Main title with chromatic effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-7xl lg:text-9xl font-bold tracking-[0.3em] mb-8 relative"
            style={{
              textShadow: "-3px 0 #FF6AD5, 3px 0 #01CDFE",
            }}
          >
            V A P O R W A V E
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl max-w-2xl mx-auto mb-12 tracking-wide"
            style={{
              textShadow: "-1px 0 #FF6AD5, 1px 0 #01CDFE",
            }}
          >
            Dead malls. Eternal sunset. VHS memories of a future that never was.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="gap-2">
              <Download className="w-5 h-5" />
              Download
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Github className="w-5 h-5" />
              Source
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating cards */}
        <div className="relative mt-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: -5 }}
            transition={{ delay: 0.8 }}
            className="absolute -left-8 top-0 w-64"
          >
            <Card className="backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-[#FF6AD5] text-xs mb-2 tracking-widest">
                  AESTHETIC.EXE
                </div>
                <div className="text-sm opacity-80">
                  Loading nostalgia... 100%
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mx-auto w-full max-w-md"
          >
            <Card className="backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div
                  className="text-4xl font-bold mb-4 tracking-widest"
                  style={{
                    textShadow: "-2px 0 #FF6AD5, 2px 0 #01CDFE",
                  }}
                >
                  永遠に
                </div>
                <div className="text-sm opacity-80 tracking-wide">
                  "Forever" - Components for the aesthetic dimension
                </div>
                <Button className="mt-6 w-full">Enter the Mall</Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 5 }}
            transition={{ delay: 1 }}
            className="absolute -right-8 top-0 w-64"
          >
            <Card className="backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-[#01CDFE] text-xs mb-2 tracking-widest">
                  SYSTEM.STATUS
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6AD5] animate-pulse" />
                  <span className="text-sm opacity-80">Vibing</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <div className="text-[#FF6AD5] text-xs tracking-[0.5em] mb-2">
            ▼ SCROLL ▼
          </div>
          <div className="text-[10px] tracking-widest opacity-50">
            @crazyone/ui-vaporwave
          </div>
        </motion.div>
      </div>
    </section>
  );
}
