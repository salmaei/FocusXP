import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, UserPlus, Search, Zap, Target, MessageCircle, Swords, Circle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "focusing" | "offline";
  currentStreak: number;
  challengeSent?: boolean;
  challengeReceived?: boolean;
}

const mockFriends: Friend[] = [
  { id: "1", name: "Salma Ibrahim", avatar: "SI", status: "focusing", currentStreak: 12 },
  { id: "2", name: "Zulfa Al Balushi", avatar: "ZB", status: "online", currentStreak: 8 },
  { id: "3", name: "Ibtihal Al Busaidi", avatar: "IB", status: "online", currentStreak: 5, challengeReceived: true },
  { id: "4", name: "Marwa Al Rumhi", avatar: "MR", status: "offline", currentStreak: 3 },
  { id: "5", name: "Muthla Al Busaidi", avatar: "MB", status: "focusing", currentStreak: 15 },
  { id: "6", name: "Sarrah Al Saadi", avatar: "SS", status: "offline", currentStreak: 0 },
];

const statusColors = {
  online: "bg-success",
  focusing: "bg-primary animate-pulse",
  offline: "bg-muted-foreground",
};

const statusLabels = {
  online: "Online",
  focusing: "Focusing",
  offline: "Offline",
};

export default function Friends() {
  const [friends, setFriends] = useState(mockFriends);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriends = friends.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineFriends = filteredFriends.filter(f => f.status !== "offline");
  const offlineFriends = filteredFriends.filter(f => f.status === "offline");

  const sendChallenge = (id: string) => {
    setFriends(friends.map(f => f.id === id ? { ...f, challengeSent: true } : f));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-display font-bold">Friends</h1>
              </div>
              <p className="text-muted-foreground">Connect, compete, and study together</p>
            </div>
            <Button variant="glow">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Friend
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Challenge Received Banner */}
          {friends.some(f => f.challengeReceived) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-xl bg-gradient-to-r from-destructive/10 to-destructive/30 border border-destructive/30 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
                <Swords className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1">
                <p className="font-medium">New Challenge!</p>
                <p className="text-sm text-muted-foreground">
                  Marwa Al Rumhi challenged you to complete 3 Pomodoro sessions today (+15 bonus pts)
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="destructive">Accept</Button>
                <Button size="sm" variant="ghost">Decline</Button>
              </div>
            </motion.div>
          )}

          {/* Online Friends */}
          <div className="mb-8">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <Circle className="w-3 h-3 fill-success text-success" />
              Online ({onlineFriends.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {onlineFriends.map((friend, index) => (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center font-display font-bold">
                        {friend.avatar}
                      </div>
                      <div className={cn(
                        "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card",
                        statusColors[friend.status]
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{friend.name}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className={cn(
                          friend.status === "focusing" ? "text-primary" : "text-muted-foreground"
                        )}>
                          {statusLabels[friend.status]}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-streak flex items-center gap-1">
                          <Zap className="w-3 h-3 text-streak" />
                          {friend.currentStreak} day streak
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    {friend.status === "focusing" ? (
                      <Button variant="outline" size="sm" className="flex-1" disabled>
                        <Target className="w-4 h-4 mr-1" />
                        Focusing...
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Users className="w-4 h-4 mr-1" />
                        Study Together
                      </Button>
                    )}
                    <Button 
                      variant={friend.challengeSent ? "secondary" : "glass"} 
                      size="sm"
                      onClick={() => sendChallenge(friend.id)}
                      disabled={friend.challengeSent}
                    >
                      {friend.challengeSent ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Sent
                        </>
                      ) : (
                        <>
                          <Swords className="w-4 h-4 mr-1" />
                          Challenge
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Offline Friends */}
          {offlineFriends.length > 0 && (
            <div>
              <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-muted-foreground">
                <Circle className="w-3 h-3 fill-muted-foreground text-muted-foreground" />
                Offline ({offlineFriends.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {offlineFriends.map((friend, index) => (
                  <motion.div
                    key={friend.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-muted/30 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center font-display font-bold text-muted-foreground">
                          {friend.avatar}
                        </div>
                        <div className={cn(
                          "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card",
                          statusColors[friend.status]
                        )} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-muted-foreground truncate">{friend.name}</p>
                        <p className="text-sm text-muted-foreground">{statusLabels[friend.status]}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Swords className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {filteredFriends.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No friends found</p>
              <Button variant="outline" className="mt-4">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Friends
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
