import { Layout } from "@/components/layout/Layout";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { UpcomingGoals } from "@/components/dashboard/UpcomingGoals";
import { FocusModeCard } from "@/components/dashboard/FocusModeCard";
import { RewardsCard } from "@/components/dashboard/RewardsCard";

const mockGoals = [
  {
    id: "1",
    title: "Complete Data Structures Assignment",
    type: "Assignment",
    difficulty: "hard" as const,
    deadline: "Tomorrow, 11:59 PM",
    isAIRecommended: true,
  },
  {
    id: "2",
    title: "Review Calculus Notes",
    type: "Study",
    difficulty: "medium" as const,
    deadline: "Dec 18",
  },
  {
    id: "3",
    title: "Finish Project Proposal",
    type: "Writing",
    difficulty: "medium" as const,
    deadline: "Dec 20",
  },
  {
    id: "4",
    title: "Practice Coding Problems",
    type: "Coding",
    difficulty: "easy" as const,
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <WelcomeBanner 
          userName="Alex"
          rank={12}
          rankChange={3}
          streak={7}
        />

        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="space-y-6">
            <StatsCard 
              totalPoints={2450}
              weeklyHours={12}
              tasksCompleted={15}
              streak={7}
            />
            <RewardsCard userPoints={2450} />
          </div>

          {/* Right Column - Goals */}
          <div className="lg:col-span-2">
            <UpcomingGoals goals={mockGoals} />
          </div>
        </div>

        {/* Focus Mode Section */}
        <FocusModeCard />
      </div>
    </Layout>
  );
};

export default Index;
