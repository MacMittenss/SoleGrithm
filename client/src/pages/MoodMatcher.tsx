import MoodMatcher from '@/components/MoodMatcher';

export default function MoodMatcherPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-blue-950/20">
      <div className="container mx-auto px-4 py-8">
        <MoodMatcher />
      </div>
    </div>
  );
}