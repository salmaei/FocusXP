import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Droplets, 
  Activity, 
  Trash2, 
  MessageSquare,
  Trophy,
  Smartphone,
  Mail,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingSection {
  title: string;
  icon: React.ElementType;
  settings: {
    id: string;
    label: string;
    description?: string;
    type: "toggle" | "button" | "input";
    value?: boolean | string;
  }[];
}

export default function Settings() {
  const [settings, setSettings] = useState({
    hydrationReminders: true,
    postureReminders: true,
    declutterReminders: false,
    motivationalReminders: true,
    leaderboardAlerts: true,
    focusAlerts: true,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-display font-bold">Settings</h1>
          </div>
          <p className="text-muted-foreground mb-8">Customize your FocusXP experience</p>

          {/* Account Settings */}
          <section className="mb-8">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Account
            </h2>
            <div className="space-y-4 p-6 rounded-2xl bg-card border border-border">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Display Name</label>
                <Input defaultValue="Alex Thompson" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                <Input defaultValue="alex.thompson@university.edu" type="email" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">University</label>
                <Input defaultValue="State University" disabled />
              </div>
              <Button>Save Changes</Button>
            </div>
          </section>

          {/* Focus Mode Alerts */}
          <section className="mb-8">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Focus Mode Alerts
            </h2>
            <div className="space-y-2 p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Hydration Reminders</p>
                    <p className="text-sm text-muted-foreground">Get reminded to drink water</p>
                  </div>
                </div>
                <Switch
                  checked={settings.hydrationReminders}
                  onCheckedChange={(v) => updateSetting("hydrationReminders", v)}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Posture Reminders</p>
                    <p className="text-sm text-muted-foreground">Check your sitting position</p>
                  </div>
                </div>
                <Switch
                  checked={settings.postureReminders}
                  onCheckedChange={(v) => updateSetting("postureReminders", v)}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Declutter Reminders</p>
                    <p className="text-sm text-muted-foreground">Organize your workspace</p>
                  </div>
                </div>
                <Switch
                  checked={settings.declutterReminders}
                  onCheckedChange={(v) => updateSetting("declutterReminders", v)}
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium">Motivational Reminders</p>
                    <p className="text-sm text-muted-foreground">Stay encouraged during sessions</p>
                  </div>
                </div>
                <Switch
                  checked={settings.motivationalReminders}
                  onCheckedChange={(v) => updateSetting("motivationalReminders", v)}
                />
              </div>
            </div>
          </section>

          {/* Leaderboard Alerts */}
          <section className="mb-8">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-warning" />
              Leaderboard Alerts
            </h2>
            <div className="space-y-2 p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium">Rank Change Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified when someone passes you</p>
                  </div>
                </div>
                <Switch
                  checked={settings.leaderboardAlerts}
                  onCheckedChange={(v) => updateSetting("leaderboardAlerts", v)}
                />
              </div>
            </div>
          </section>

          {/* Posture Sensor */}
          <section className="mb-8">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              Posture Sensor
            </h2>
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sensor Calibration</p>
                  <p className="text-sm text-muted-foreground">Calibrate your posture sensor for accurate readings</p>
                </div>
                <Button variant="outline">
                  Calibrate
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section>
            <h2 className="font-display font-bold text-lg mb-4 text-destructive">Danger Zone</h2>
            <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </Layout>
  );
}
