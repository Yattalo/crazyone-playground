import { motion } from "motion/react";
import { Button, Card, CardContent } from "@crazyone/ui-brutalist";
import { ArrowRight, Download, Github } from "lucide-react";

export function BrutalistHero() {
  return (
    <section className="relative min-h-screen bg-[#f5f5f5] text-[#1a1a1a] overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1a1a1a 1px, transparent 1px),
            linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Coordinates */}
      <div className="absolute top-4 left-4 font-mono text-xs tracking-widest opacity-50">
        [00.00]
      </div>
      <div className="absolute top-4 right-4 font-mono text-xs tracking-widest opacity-50">
        [00.01]
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-xs tracking-widest opacity-50">
        [01.00]
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-xs tracking-widest opacity-50">
        [01.01]
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-8"
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] border-2 border-current px-4 py-2">
                UI-BRUTALIST v1.0
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="font-mono text-6xl lg:text-8xl font-bold uppercase leading-none mb-8"
            >
              <span className="block">[BRUTALIST]</span>
              <span className="block text-[#ff6600] mt-2">RAW.</span>
              <span className="block">CONCRETE.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="font-mono text-lg max-w-md mb-12 leading-relaxed"
            >
              Zero pretense. Exposed structure. Components that refuse to
              apologize for existing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                INSTALL NOW
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Github className="w-5 h-5" />
                SOURCE
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t-2 border-current"
            >
              {[
                { value: "0px", label: "BORDER RADIUS" },
                { value: "8px", label: "SHADOW OFFSET" },
                { value: "∞", label: "AUDACITY" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="font-mono text-3xl font-bold">{stat.value}</div>
                  <div className="font-mono text-xs uppercase tracking-widest opacity-60 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column - Component showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            {/* Floating cards */}
            <Card className="absolute -top-4 -left-4 w-64 rotate-[-3deg] hover:rotate-0 transition-transform z-10">
              <CardContent className="p-6">
                <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">
                  [COMPONENT.BUTTON]
                </div>
                <Button className="w-full">CLICK ME</Button>
              </CardContent>
            </Card>

            <Card className="w-full max-w-md mx-auto shadow-[12px_12px_0_0_#1a1a1a]">
              <CardContent className="p-8">
                <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-4">
                  [MANIFEST.TXT]
                </div>
                <div className="font-mono text-sm space-y-4 leading-relaxed">
                  <p>
                    <span className="text-[#ff6600]">&gt;</span> We reject the
                    tyranny of rounded corners.
                  </p>
                  <p>
                    <span className="text-[#ff6600]">&gt;</span> We embrace the
                    honest shadow.
                  </p>
                  <p>
                    <span className="text-[#ff6600]">&gt;</span> We build
                    interfaces that confront.
                  </p>
                  <p className="pt-4 border-t-2 border-current border-dashed">
                    <span className="opacity-60">STATUS:</span>{" "}
                    <span className="text-[#ff6600]">UNCOMPROMISING</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="absolute -bottom-4 -right-4 w-48 rotate-[2deg] hover:rotate-0 transition-transform">
              <CardContent className="p-4">
                <div className="font-mono text-xs uppercase tracking-widest">
                  <span className="opacity-60">FONT:</span> MONO
                </div>
                <div className="font-mono text-xs uppercase tracking-widest mt-1">
                  <span className="opacity-60">RADIUS:</span> 0
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Bottom navigation hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
        >
          <span className="opacity-60">SCROLL TO EXPLORE</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
