import { motion } from "framer-motion";
import { Zap, Clock, CheckCircle, Flame } from "lucide-react";

interface StatsCardProps {
  totalPoints: number;
  weeklyHours: number;
  tasksCompleted: number;
  streak: number;
}

export function StatsCard({ totalPoints, weeklyHours, tasksCompleted, streak }: StatsCardProps) {
  const stats = [
    {
      label: "Total Points",
      value: totalPoints.toLocaleString(),
      icon: Zap,
      color: "text-warning",
      bgColor: "bg-warning/20",
    },
    {
      label: "Hours This Week",
      value: weeklyHours.toString(),
      icon: Clock,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      label: "Tasks Completed",
      value: tasksCompleted.toString(),
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/20",
    },
    {
      label: "Day Streak",
      value: streak.toString(),
      icon: Flame,
      color: "text-secondary",
      bgColor: "bg-secondary/20",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-6"
    >
      <h2 className="font-display font-bold text-lg mb-4">Your Stats</h2>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`font-display font-bold text-xl ${stat.color}`}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Progress Bar */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Weekly Goal</span>
          <span className="text-sm font-medium">75%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
