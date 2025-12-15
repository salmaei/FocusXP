import { motion } from "framer-motion";
import { Plus, Sparkles, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Goal {
  id: string;
  title: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  deadline?: string;
  isAIRecommended?: boolean;
}

interface UpcomingGoalsProps {
  goals: Goal[];
}

const difficultyColors = {
  easy: "bg-success/20 text-success border-success/30",
  medium: "bg-warning/20 text-warning border-warning/30",
  hard: "bg-destructive/20 text-destructive border-destructive/30",
};

export function UpcomingGoals({ goals }: UpcomingGoalsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-lg">Upcoming Goals</h2>
        <Link to="/goals">
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Task
          </Button>
        </Link>
      </div>

      {/* AI Recommendation Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-4 p-3 rounded-xl bg-accent/10 border border-accent/20 flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-accent" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">AI recommends starting with</p>
          <p className="text-xs text-muted-foreground">"Complete Data Structures Assignment" for maximum focus</p>
        </div>
      </motion.div>

      <div className="space-y-3">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="group p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer border border-transparent hover:border-primary/20"
          >
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-md border-2 border-muted-foreground/30 mt-0.5 group-hover:border-primary transition-colors" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{goal.title}</p>
                  {goal.isAIRecommended && (
                    <Sparkles className="w-3 h-3 text-accent flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyColors[goal.difficulty]}`}>
                    {goal.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground">{goal.type}</span>
                </div>
                {goal.deadline && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{goal.deadline}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No upcoming goals</p>
          <Link to="/goals">
            <Button variant="outline" size="sm" className="mt-3">
              Add your first goal
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
}
