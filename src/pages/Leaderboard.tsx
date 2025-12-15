import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, TrendingUp, Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type TimeFilter = "week" | "month" | "term";
type LeaderboardType = "institute" | "friends";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  isCurrentUser?: boolean;
  change?: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Sarah Chen", avatar: "SC", points: 4250, change: 0 },
  { rank: 2, name: "Mike Johnson", avatar: "MJ", points: 4120, change: 2 },
  { rank: 3, name: "Emma Wilson", avatar: "EW", points: 3980, change: -1 },
  { rank: 4, name: "David Kim", avatar: "DK", points: 3750, change: 1 },
  { rank: 5, name: "Lisa Park", avatar: "LP", points: 3600, change: -2 },
  { rank: 6, name: "James Lee", avatar: "JL", points: 3450, change: 0 },
  { rank: 7, name: "Anna Brown", avatar: "AB", points: 3200, change: 3 },
  { rank: 8, name: "Tom Davis", avatar: "TD", points: 3050, change: -1 },
  { rank: 9, name: "Kate Miller", avatar: "KM", points: 2900, change: 0 },
  { rank: 10, name: "Ryan Taylor", avatar: "RT", points: 2750, change: 2 },
  { rank: 11, name: "Sophie Adams", avatar: "SA", points: 2600, change: -1 },
  { rank: 12, name: "Alex Thompson", avatar: "AT", points: 2450, isCurrentUser: true, change: 3 },
  { rank: 13, name: "Chris White", avatar: "CW", points: 2300, change: -2 },
  { rank: 14, name: "Olivia Green", avatar: "OG", points: 2150, change: 1 },
  { rank: 15, name: "Daniel Harris", avatar: "DH", points: 2000, change: 0 },
];

const friendsLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Mike Johnson", avatar: "MJ", points: 4120, change: 0 },
  { rank: 2, name: "Emma Wilson", avatar: "EW", points: 3980, change: 1 },
  { rank: 3, name: "Alex Thompson", avatar: "AT", points: 2450, isCurrentUser: true, change: 0 },
  { rank: 4, name: "Lisa Park", avatar: "LP", points: 2200, change: -2 },
  { rank: 5, name: "Tom Davis", avatar: "TD", points: 1900, change: 1 },
];

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="w-5 h-5 text-warning" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-secondary" />;
  return null;
};

const getRankBg = (rank: number) => {
  if (rank === 1) return "bg-warning/10 border-warning/30";
  if (rank === 2) return "bg-muted/50 border-muted-foreground/20";
  if (rank === 3) return "bg-secondary/10 border-secondary/30";
  return "border-border";
};

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("week");
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>("institute");

  const data = leaderboardType === "institute" ? mockLeaderboard : friendsLeaderboard;
  const currentUser = data.find(e => e.isCurrentUser);
  const nextRank = currentUser ? data.find(e => e.rank === currentUser.rank - 1) : null;
  const pointsToNext = nextRank && currentUser ? nextRank.points - currentUser.points : 0;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-warning" />
            <h1 className="text-3xl font-display font-bold">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground mb-8">Compete with others and climb the ranks!</p>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex rounded-xl bg-muted p-1">
              {(["institute", "friends"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setLeaderboardType(type)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                    leaderboardType === type
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="flex rounded-xl bg-muted p-1">
              {(["week", "month", "term"] as const).map((time) => (
                <button
                  key={time}
                  onClick={() => setTimeFilter(time)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                    timeFilter === time
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Your Rank Card */}
          {currentUser && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent border border-primary/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center font-display font-bold text-2xl text-primary">
                    {currentUser.avatar}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your Rank</p>
                    <p className="text-4xl font-display font-bold">#{currentUser.rank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-2xl text-warning">{currentUser.points.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">points</p>
                  {currentUser.change !== 0 && (
                    <div className={cn(
                      "flex items-center gap-1 justify-end mt-1",
                      currentUser.change && currentUser.change > 0 ? "text-success" : "text-destructive"
                    )}>
                      <TrendingUp className={cn("w-4 h-4", currentUser.change && currentUser.change < 0 && "rotate-180")} />
                      <span className="text-sm">{Math.abs(currentUser.change || 0)} this week</span>
                    </div>
                  )}
                </div>
              </div>
              {nextRank && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Distance to #{nextRank.rank}</span>
                    <span className="font-medium">{pointsToNext} points</span>
                  </div>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${100 - (pointsToNext / nextRank.points) * 100}%` }}
                      transition={{ delay: 0.3, duration: 1 }}
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Leaderboard List */}
          <div className="space-y-2">
            {data.map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border transition-all",
                  entry.isCurrentUser 
                    ? "bg-primary/10 border-primary/30 ring-2 ring-primary/20" 
                    : getRankBg(entry.rank),
                  !entry.isCurrentUser && "hover:bg-muted/50"
                )}
              >
                {/* Rank */}
                <div className="w-8 flex justify-center">
                  {getRankIcon(entry.rank) || (
                    <span className="font-display font-bold text-muted-foreground">#{entry.rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold",
                  entry.rank === 1 ? "bg-warning/20 text-warning" :
                  entry.rank === 2 ? "bg-muted text-muted-foreground" :
                  entry.rank === 3 ? "bg-secondary/20 text-secondary" :
                  entry.isCurrentUser ? "bg-primary/20 text-primary" :
                  "bg-muted text-muted-foreground"
                )}>
                  {entry.avatar}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className={cn("font-medium truncate", entry.isCurrentUser && "text-primary")}>
                    {entry.name}
                    {entry.isCurrentUser && <span className="text-xs ml-2 text-muted-foreground">(You)</span>}
                  </p>
                </div>

                {/* Points & Change */}
                <div className="text-right">
                  <p className="font-display font-bold">{entry.points.toLocaleString()}</p>
                  {entry.change !== undefined && entry.change !== 0 && (
                    <div className={cn(
                      "flex items-center gap-1 justify-end text-xs",
                      entry.change > 0 ? "text-success" : "text-destructive"
                    )}>
                      <TrendingUp className={cn("w-3 h-3", entry.change < 0 && "rotate-180")} />
                      <span>{Math.abs(entry.change)}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
