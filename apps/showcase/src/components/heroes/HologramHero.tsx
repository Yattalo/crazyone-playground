import { motion } from "motion/react";
import { Button, Card, CardContent } from "@crazyone/ui-hologram";
import { Download, Github, Sparkles } from "lucide-react";

export function HologramHero() {
  return (
    <section className="relative min-h-screen bg-[#0a0a1a] text-white overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 60%)
          `,
        }}
      />

      {/* Prismatic floating orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: "linear-gradient(135deg, #8b5cf6, #06b6d4, #ec4899)",
        }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: "linear-gradient(225deg, #06b6d4, #ec4899, #8b5cf6)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))",
              border: "1px solid rgba(139, 92, 246, 0.3)",
            }}
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              HOLOGRAPHIC INTERFACE
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl lg:text-8xl font-bold mb-6"
          >
            <span
              className="bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              HOLOGRAM
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl max-w-2xl mx-auto mb-12 text-white/70"
          >
            Tomorrow rendered today. Iridescent interfaces that shift and
            shimmer with prismatic beauty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="gap-2">
              <Download className="w-5 h-5" />
              Experience Now
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Github className="w-5 h-5" />
              View Source
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating holographic cards */}
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ perspective: "1000px" }}
          >
            {/* Main showcase card */}
            <Card
              className="relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1), rgba(236, 72, 153, 0.1))",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                  animation: "shimmer 3s infinite",
                  backgroundSize: "200% 100%",
                }}
              />

              <CardContent className="p-12">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Prismatic",
                      desc: "Color-cycling gradients that never look the same twice",
                      color: "from-violet-500 to-cyan-500",
                    },
                    {
                      title: "Iridescent",
                      desc: "Light-reactive surfaces that respond to interaction",
                      color: "from-cyan-500 to-pink-500",
                    },
                    {
                      title: "Ethereal",
                      desc: "Glass-morphism meets the rainbow spectrum",
                      color: "from-pink-500 to-violet-500",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="text-center"
                    >
                      <div
                        className={`w-16 h-16 mx-auto rounded-2xl mb-4 bg-gradient-to-br ${item.color}`}
                        style={{
                          boxShadow: `0 0 40px rgba(139, 92, 246, 0.3)`,
                        }}
                      />
                      <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Floating accent cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute -left-8 top-1/4 w-48"
          >
            <Card
              className="backdrop-blur-xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.1))",
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500" />
                  <div className="text-sm">
                    <div className="font-medium">Spectral</div>
                    <div className="text-xs text-white/50">Active</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            className="absolute -right-8 bottom-1/4 w-48"
          >
            <Card
              className="backdrop-blur-xl"
              style={{
                background:
                  "linear-gradient(225deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.1))",
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-violet-500" />
                  <div className="text-sm">
                    <div className="font-medium">Aurora</div>
                    <div className="text-xs text-white/50">Enabled</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <div className="w-6 h-10 rounded-full border border-white/30 mx-auto mb-2 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-violet-400 to-cyan-400"
            />
          </div>
          <div className="text-xs text-white/40">Scroll to explore</div>
        </motion.div>
      </div>

      {/* CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}
