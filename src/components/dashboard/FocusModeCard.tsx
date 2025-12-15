import { motion } from "framer-motion";
import { Play, Clock, Zap, Users, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const focusModes = [
  {
    id: "pomodoro",
    name: "Pomodoro",
    description: "25 min study, 5 min break",
    points: 20,
    icon: Timer,
    gradient: "from-destructive to-destructive/60",
    recommended: true,
  },
  {
    id: "deep-focus",
    name: "Deep Focus",
    description: "60-90 min focused work",
    points: 30,
    icon: Zap,
    gradient: "from-accent to-accent/60",
  },
  {
    id: "sprint",
    name: "Sprint",
    description: "10-15 min quick tasks",
    points: 10,
    icon: Clock,
    gradient: "from-success to-success/60",
  },
  {
    id: "study-with-friends",
    name: "Study Together",
    description: "Sync with friends",
    points: 20,
    icon: Users,
    gradient: "from-primary to-primary/60",
    bonus: "+20 per friend",
  },
];

export function FocusModeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-xl">Start Focus Session</h2>
        <Link to="/focus">
          <Button variant="glow" size="lg">
            <Play className="w-5 h-5 mr-2" />
            Start Focus
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {focusModes.map((mode, index) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Link to={`/focus?mode=${mode.id}`}>
              <div className="group relative h-full p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                {mode.recommended && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                    Recommended
                  </div>
                )}

                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mode.gradient} flex items-center justify-center mb-3`}>
                    <mode.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  
                  <h3 className="font-display font-bold text-lg mb-1">{mode.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{mode.description}</p>
                  
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-lg bg-warning/20 text-warning text-sm font-medium">
                      +{mode.points} pts
                    </span>
                    {mode.bonus && (
                      <span className="px-2 py-1 rounded-lg bg-accent/20 text-accent text-xs">
                        {mode.bonus}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
