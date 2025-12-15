import { motion } from "framer-motion";
import { Trophy, TrendingUp, Flame } from "lucide-react";
import { Link } from "react-router-dom";

interface WelcomeBannerProps {
  userName: string;
  rank: number;
  rankChange: number;
  streak: number;
}

export function WelcomeBanner({ userName, rank, rankChange, streak }: WelcomeBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border border-primary/20 p-6 sm:p-8"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl font-display font-bold"
            >
              Welcome back, <span className="gradient-text">{userName}!</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-1"
            >
              Ready to crush your goals today?
            </motion.p>
          </div>

          <div className="flex items-center gap-4">
            {/* Streak Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-streak/20 border border-streak/30"
            >
              <Flame className="w-5 h-5 text-streak" />
              <span className="font-display font-bold text-streak">{streak} day streak</span>
            </motion.div>
          </div>
        </div>

        {/* Leaderboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex flex-wrap gap-4"
        >
          <Link
            to="/leaderboard"
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/60 backdrop-blur-lg border border-border hover:border-primary/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">University Rank</p>
              <p className="font-display font-bold text-lg">#{rank}</p>
            </div>
            <div className={`flex items-center gap-1 text-sm ${rankChange > 0 ? "text-success" : "text-destructive"}`}>
              <TrendingUp className={`w-4 h-4 ${rankChange < 0 ? "rotate-180" : ""}`} />
              <span>{Math.abs(rankChange)}</span>
            </div>
          </Link>

          <Link
            to="/leaderboard?tab=friends"
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/60 backdrop-blur-lg border border-border hover:border-primary/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Among Friends</p>
              <p className="font-display font-bold text-lg">#3</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
