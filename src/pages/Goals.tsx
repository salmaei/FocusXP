import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Check, Trash2, Calendar, Sparkles, Target, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Goal {
  id: string;
  title: string;
  description?: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  deadline?: string;
  completed: boolean;
}

const initialGoals: Goal[] = [
  {
    id: "1",
    title: "Complete Data Structures Assignment",
    description: "Implement binary search tree operations",
    type: "assignment",
    difficulty: "hard",
    deadline: "2024-12-16",
    completed: false,
  },
  {
    id: "2",
    title: "Review Calculus Notes",
    type: "study",
    difficulty: "medium",
    deadline: "2024-12-18",
    completed: false,
  },
  {
    id: "3",
    title: "Practice Coding Problems",
    type: "coding",
    difficulty: "easy",
    completed: true,
  },
];

const taskTypes = ["assignment", "coding", "study", "writing", "test", "final", "project"];
const difficulties = ["easy", "medium", "hard"] as const;

const difficultyColors = {
  easy: "bg-success/20 text-success border-success/30",
  medium: "bg-warning/20 text-warning border-warning/30",
  hard: "bg-destructive/20 text-destructive border-destructive/30",
};

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState<{
    title: string;
    description: string;
    type: string;
    difficulty: "easy" | "medium" | "hard";
    deadline: string;
  }>({
    title: "",
    description: "",
    type: "assignment",
    difficulty: "medium",
    deadline: "",
  });

  const addGoal = () => {
    if (!newGoal.title.trim()) return;
    
    const goal: Goal = {
      id: Date.now().toString(),
      ...newGoal,
      completed: false,
    };
    
    setGoals([goal, ...goals]);
    setNewGoal({ title: "", description: "", type: "assignment", difficulty: "medium", deadline: "" });
    setShowAddForm(false);
  };

  const toggleComplete = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">Goals & Tasks</h1>
              <p className="text-muted-foreground mt-1">Manage your tasks and track progress</p>
            </div>
            <Button variant="glow" onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>

          {/* Add Task Form */}
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-6 rounded-2xl bg-card border border-border"
            >
              <h3 className="font-display font-bold text-lg mb-4">Add New Task</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Task Name *</label>
                  <Input
                    placeholder="What do you need to accomplish?"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Description (optional)</label>
                  <Textarea
                    placeholder="Add more details..."
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Type</label>
                    <Select value={newGoal.type} onValueChange={(v) => setNewGoal({ ...newGoal, type: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {taskTypes.map((type) => (
                          <SelectItem key={type} value={type} className="capitalize">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Difficulty</label>
                    <Select value={newGoal.difficulty} onValueChange={(v: "easy" | "medium" | "hard") => setNewGoal({ ...newGoal, difficulty: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((diff) => (
                          <SelectItem key={diff} value={diff} className="capitalize">
                            {diff}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Deadline (optional)</label>
                    <Input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button onClick={addGoal}>Add Task</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-medium">AI Suggestion</p>
              <p className="text-sm text-muted-foreground">
                Based on your deadlines, start with "Complete Data Structures Assignment" to maximize your points streak!
              </p>
            </div>
          </motion.div>

          {/* Active Tasks */}
          <div className="mb-8">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Active Tasks ({activeGoals.length})
            </h2>
            <div className="space-y-3">
              {activeGoals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleComplete(goal.id)}
                      className="w-6 h-6 rounded-lg border-2 border-muted-foreground/30 hover:border-primary flex items-center justify-center transition-colors mt-0.5"
                    >
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{goal.title}</p>
                      {goal.description && (
                        <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyColors[goal.difficulty]}`}>
                          {goal.difficulty}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">
                          {goal.type}
                        </span>
                        {goal.deadline && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(goal.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => deleteGoal(goal.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </motion.div>
              ))}
              {activeGoals.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No active tasks. Add one to get started!</p>
              )}
            </div>
          </div>

          {/* Completed Tasks */}
          {completedGoals.length > 0 && (
            <div>
              <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5" />
                Completed ({completedGoals.length})
              </h2>
              <div className="space-y-3">
                {completedGoals.map((goal) => (
                  <motion.div
                    key={goal.id}
                    className="p-4 rounded-xl bg-muted/30 border border-border"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleComplete(goal.id)}
                        className="w-6 h-6 rounded-lg bg-success/20 border-2 border-success flex items-center justify-center mt-0.5"
                      >
                        <Check className="w-4 h-4 text-success" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-muted-foreground line-through">{goal.title}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteGoal(goal.id)}
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
