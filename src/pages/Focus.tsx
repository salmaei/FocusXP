import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, RotateCcw, Check, Timer, Zap, Clock, Users, ChevronLeft, Plus, Coffee } from "lucide-react";

type FocusMode = "pomodoro" | "deep-focus" | "sprint" | "study-with-friends";
type TimerState = "idle" | "running" | "paused" | "break";

const modeConfigs = {
  pomodoro: {
    name: "Pomodoro",
    studyTime: 25 * 60,
    breakTime: 5 * 60,
    points: 20,
    icon: Timer,
    color: "destructive",
  },
  "deep-focus": {
    name: "Deep Focus",
    studyTime: 60 * 60,
    breakTime: 10 * 60,
    points: 30,
    icon: Zap,
    color: "accent",
  },
  sprint: {
    name: "Sprint",
    studyTime: 15 * 60,
    breakTime: 3 * 60,
    points: 10,
    icon: Clock,
    color: "success",
  },
  "study-with-friends": {
    name: "Study Together",
    studyTime: 25 * 60,
    breakTime: 5 * 60,
    points: 20,
    icon: Users,
    color: "primary",
  },
};

const timeOptions = {
  "deep-focus": [60, 75, 90],
  sprint: [10, 15],
  pomodoro: [25],
  "study-with-friends": [25, 45, 60],
};

export default function Focus() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const modeParam = searchParams.get("mode") as FocusMode | null;
  
  const [selectedMode, setSelectedMode] = useState<FocusMode>(modeParam || "pomodoro");
  const [customTime, setCustomTime] = useState<number>(modeConfigs[selectedMode].studyTime);
  const [timeLeft, setTimeLeft] = useState(customTime);
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [showModeSelect, setShowModeSelect] = useState(!modeParam);

  const config = modeConfigs[selectedMode];
  const progress = timerState === "break" 
    ? ((config.breakTime - timeLeft) / config.breakTime) * 100
    : ((customTime - timeLeft) / customTime) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerState === "running" || timerState === "break") {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerState === "running") {
              setTimerState("break");
              return config.breakTime;
            } else {
              setTimerState("idle");
              setSessionsCompleted((s) => s + 1);
              return customTime;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerState, customTime, config.breakTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => setTimerState("running");
  const handlePause = () => setTimerState("paused");
  const handleResume = () => setTimerState(timerState === "break" ? "break" : "running");
  const handleReset = () => {
    setTimerState("idle");
    setTimeLeft(customTime);
  };
  const handleSkipBreak = () => {
    setTimerState("idle");
    setTimeLeft(customTime);
  };

  const selectMode = (mode: FocusMode) => {
    setSelectedMode(mode);
    const newTime = modeConfigs[mode].studyTime;
    setCustomTime(newTime);
    setTimeLeft(newTime);
    setShowModeSelect(false);
  };

  const selectTime = (minutes: number) => {
    const newTime = minutes * 60;
    setCustomTime(newTime);
    setTimeLeft(newTime);
  };

  if (showModeSelect) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>

            <h1 className="text-3xl font-display font-bold mb-2">Choose Focus Mode</h1>
            <p className="text-muted-foreground mb-8">Select a mode that matches your task</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(Object.keys(modeConfigs) as FocusMode[]).map((mode) => {
                const modeConfig = modeConfigs[mode];
                return (
                  <motion.button
                    key={mode}
                    onClick={() => selectMode(mode)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-2xl bg-card border-2 border-border hover:border-${modeConfig.color}/50 text-left transition-all group`}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-${modeConfig.color}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <modeConfig.icon className={`w-7 h-7 text-${modeConfig.color}`} />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-1">{modeConfig.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {mode === "pomodoro" && "25 min study, 5 min break"}
                      {mode === "deep-focus" && "60-90 min focused work"}
                      {mode === "sprint" && "10-15 min quick tasks"}
                      {mode === "study-with-friends" && "Sync with friends"}
                    </p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg bg-warning/20 text-warning text-sm font-medium`}>
                      +{modeConfig.points} pts
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => setShowModeSelect(true)}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Change Mode
            </Button>
            <div className="flex items-center gap-2">
              <config.icon className={`w-5 h-5 text-${config.color}`} />
              <span className="font-display font-bold">{config.name}</span>
            </div>
          </div>

          {/* Time Selection (for modes with options) */}
          {timeOptions[selectedMode].length > 1 && timerState === "idle" && (
            <div className="flex justify-center gap-3 mb-8">
              {timeOptions[selectedMode].map((mins) => (
                <Button
                  key={mins}
                  variant={customTime === mins * 60 ? "default" : "outline"}
                  onClick={() => selectTime(mins)}
                >
                  {mins} min
                </Button>
              ))}
            </div>
          )}

          {/* Timer Display */}
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Background circle */}
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke={timerState === "break" ? "hsl(var(--success))" : `hsl(var(--${config.color}))`}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="283%"
                  strokeDashoffset={`${283 - (progress * 2.83)}%`}
                  initial={{ strokeDashoffset: "283%" }}
                  animate={{ strokeDashoffset: `${283 - (progress * 2.83)}%` }}
                  transition={{ duration: 0.5 }}
                  className="drop-shadow-lg"
                  style={{
                    filter: `drop-shadow(0 0 10px hsl(var(--${timerState === "break" ? "success" : config.color}) / 0.5))`,
                  }}
                />
              </svg>

              {/* Time display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {timerState === "break" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-success mb-2"
                    >
                      <Coffee className="w-5 h-5" />
                      <span className="font-medium">Break Time</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.span
                  key={timeLeft}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-display text-6xl sm:text-7xl font-bold tracking-tight"
                >
                  {formatTime(timeLeft)}
                </motion.span>

                <p className="text-muted-foreground mt-2">
                  Session {sessionsCompleted + 1} • +{config.points} pts
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={handleReset} disabled={timerState === "idle"}>
                <RotateCcw className="w-5 h-5" />
              </Button>

              {timerState === "idle" && (
                <Button variant="glow" size="xl" onClick={handleStart}>
                  <Play className="w-6 h-6 mr-2" />
                  Start Focus
                </Button>
              )}

              {timerState === "running" && (
                <Button variant="secondary" size="xl" onClick={handlePause}>
                  <Pause className="w-6 h-6 mr-2" />
                  Pause
                </Button>
              )}

              {timerState === "paused" && (
                <Button variant="glow" size="xl" onClick={handleResume}>
                  <Play className="w-6 h-6 mr-2" />
                  Resume
                </Button>
              )}

              {timerState === "break" && (
                <>
                  <Button variant="outline" size="xl" onClick={handleSkipBreak}>
                    <SkipForward className="w-5 h-5 mr-2" />
                    Skip Break
                  </Button>
                </>
              )}

              {timerState !== "break" && (
                <Button variant="outline" size="icon" disabled={timerState === "idle"}>
                  <Check className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Session Info */}
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Sessions completed today: <span className="font-bold text-foreground">{sessionsCompleted}</span>
              </p>
              
              {sessionsCompleted > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/20 text-warning"
                >
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">+{sessionsCompleted * config.points} points earned!</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
