import { motion } from "motion/react";
import { Button, Card, CardContent } from "@crazyone/ui-bubblegum";
import { Download, Github, Heart, Sparkles, Star } from "lucide-react";

export function BubblegumHero() {
  return (
    <section className="relative min-h-screen bg-[#fff5f7] text-[#4a1942] overflow-hidden">
      {/* Floating candy shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Pink blob */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 opacity-40 blur-xl"
        />
        {/* Yellow blob */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-40 right-[15%] w-40 h-40 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 opacity-50 blur-xl"
        />
        {/* Purple blob */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-32 left-[20%] w-48 h-48 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 opacity-40 blur-xl"
        />
      </div>

      {/* Decorative sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          className="absolute text-pink-400"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-400 to-yellow-400 text-white mb-8 shadow-lg shadow-pink-300/30"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span className="font-bold">DOPAMINE DELIVERY SYSTEM</span>
            <Heart className="w-4 h-4 fill-current" />
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
            className="text-6xl lg:text-8xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
              BUBBLEGUM
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl max-w-2xl mx-auto mb-12 text-pink-700/80"
          >
            Squish it. Bounce it. Pop it. UI components that make you feel good.
            Zero regrets, maximum joy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="gap-2">
              <Download className="w-5 h-5" />
              Get the Sweetness
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Github className="w-5 h-5" />
              View Recipe
            </Button>
          </motion.div>
        </motion.div>

        {/* Bouncing cards showcase */}
        <div className="relative mt-20 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🍬",
                title: "Squish",
                desc: "Buttons that feel satisfying to click",
                color: "from-pink-400 to-pink-500",
                delay: 0.6,
              },
              {
                icon: "🎈",
                title: "Bounce",
                desc: "Cards that pop into view with joy",
                color: "from-purple-400 to-pink-400",
                delay: 0.7,
              },
              {
                icon: "🍭",
                title: "Delight",
                desc: "Micro-interactions that spark happiness",
                color: "from-yellow-400 to-pink-400",
                delay: 0.8,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: item.delay,
                  type: "spring",
                  bounce: 0.5,
                }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-8">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      className="text-5xl mb-4"
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-pink-600/70">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-3 mt-12"
          >
            {[
              "Rounded Corners",
              "Candy Colors",
              "Bounce Physics",
              "Joy Animations",
              "Pill Shapes",
            ].map((feature, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 rounded-full bg-white shadow-md shadow-pink-200/50 text-sm font-medium text-pink-600 border border-pink-100"
              >
                {feature}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Fun stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="grid grid-cols-4 gap-8 text-center">
                {[
                  { value: "1rem", label: "Border Radius" },
                  { value: "100%", label: "Happiness" },
                  { value: "0", label: "Regrets" },
                  { value: "∞", label: "Fun" },
                ].map((stat, i) => (
                  <div key={i}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 1.4 + i * 0.1,
                        type: "spring",
                        bounce: 0.5,
                      }}
                      className="text-3xl font-black bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs text-pink-600/60 mt-1 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-pink-400"
        >
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">Scroll for more sweetness</span>
          <Star className="w-4 h-4 fill-current" />
        </motion.div>
      </div>
    </section>
  );
}
