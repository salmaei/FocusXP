import { motion } from "framer-motion";
import { Gift, ChevronRight, Coffee, Book, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const rewards = [
  {
    id: "coffee",
    name: "Free Coffee",
    points: 500,
    icon: Coffee,
    venue: "Campus Café",
    available: true,
  },
  {
    id: "book",
    name: "20% Off Books",
    points: 750,
    icon: Book,
    venue: "University Store",
    available: true,
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    points: 1500,
    icon: Headphones,
    venue: "1 Month Free",
    available: false,
  },
];

interface RewardsCardProps {
  userPoints: number;
}

export function RewardsCard({ userPoints }: RewardsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-secondary" />
          <h2 className="font-display font-bold text-lg">Redeem Rewards</h2>
        </div>
        <Button variant="ghost" size="sm">
          View All
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-3">
        {rewards.map((reward, index) => {
          const canRedeem = userPoints >= reward.points && reward.available;
          const progress = Math.min((userPoints / reward.points) * 100, 100);
          
          return (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={`p-4 rounded-xl border transition-all ${
                canRedeem 
                  ? "bg-secondary/10 border-secondary/30 hover:border-secondary cursor-pointer" 
                  : "bg-muted/30 border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  canRedeem ? "bg-secondary/20" : "bg-muted"
                }`}>
                  <reward.icon className={`w-5 h-5 ${canRedeem ? "text-secondary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{reward.name}</p>
                  <p className="text-xs text-muted-foreground">{reward.venue}</p>
                </div>
                <div className="text-right">
                  <p className={`font-display font-bold ${canRedeem ? "text-secondary" : "text-muted-foreground"}`}>
                    {reward.points} pts
                  </p>
                  {!canRedeem && reward.available && (
                    <p className="text-xs text-muted-foreground">
                      {reward.points - userPoints} more
                    </p>
                  )}
                </div>
              </div>
              
              {!canRedeem && reward.available && (
                <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-secondary/50 to-secondary rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
