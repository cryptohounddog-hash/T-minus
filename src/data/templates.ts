import type { AppState, NavItem, Widget } from '../types';
import { fromNow, isoDateFromNow } from '../utils/date';
import { makeId } from '../utils/id';

const adultNav: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'missions', label: 'Missions', icon: '🚀' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'goals', label: 'Goals', icon: '🎯' },
  { id: 'habits', label: 'Habits', icon: '✨' },
  { id: 'finances', label: 'Finances', icon: '💰' },
  { id: 'journal', label: 'Journal', icon: '📓' },
  { id: 'resources', label: 'Resources', icon: '🔖' },
  { id: 'achievements', label: 'Achievements', icon: '🏆' },
  { id: 'stats', label: 'Stats', icon: '📊' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const studentNav: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'school', label: 'School', icon: '🎓' },
  { id: 'goals', label: 'Goals', icon: '🎯' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'habits', label: 'Habits', icon: '✨' },
  { id: 'friends', label: 'Friends', icon: '👥' },
  { id: 'journal', label: 'Journal', icon: '📓' },
  { id: 'achievements', label: 'Achievements', icon: '🏆' },
  { id: 'resources', label: 'Resources', icon: '🔖' },
  { id: 'messages', label: 'Messages', icon: '💬' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

function w(partial: Partial<Widget> & Pick<Widget, 'type' | 'title' | 'icon' | 'size' | 'order'>): Widget {
  return {
    id: makeId(),
    hidden: false,
    ...partial,
  };
}

export function createAdultPreset(): AppState {
  const widgets: Widget[] = [
    w({ type: 'countdown', title: 'Preaching at Joshua Tabernacle', subtitle: 'Sunday Service', icon: '⛪', size: 'sm', order: 0, accent: 'var(--accent-3)', targetDate: fromNow(2, 10, 0), ctaLabel: 'Message Prep In Progress', category: 'faith' }),
    w({ type: 'countdown', title: 'Preaching at Taylortown Church', subtitle: 'Sermon Series: Faith In Action', icon: '⛪', size: 'sm', order: 1, accent: 'var(--accent)', targetDate: fromNow(9, 11, 30), ctaLabel: 'Sermon Series: Faith In Action', category: 'faith' }),
    w({ type: 'clock', title: 'Command Clock', icon: '🕐', size: 'tall', order: 2, text: 'Stay Focused', extraValue: 'Your future is in your hands.' }),
    w({ type: 'calendar', title: 'Calendar', icon: '📅', size: 'tall', order: 3 }),
    w({ type: 'countdown', title: 'Birthday', subtitle: 'Leveling Up!', icon: '🎂', size: 'sm', order: 4, accent: '#f59e0b', targetDate: fromNow(137, 0, 0), category: 'personal' }),
    w({ type: 'countdown', title: 'Graduation', subtitle: 'Master of Divinity', icon: '🎓', size: 'md', order: 5, accent: 'var(--accent)', targetDate: fromNow(23, 10, 0), current: 76, target: 100, extraLabel: 'On Track', category: 'school', ctaLabel: 'MISSION CRITICAL' }),
    w({ type: 'countdown', title: 'Christmas', subtitle: 'The Season of Joy', icon: '🎄', size: 'sm', order: 6, accent: '#22c55e', targetDate: fromNow(210, 0, 0), category: 'personal' }),
    w({ type: 'ninetyday', title: '90-Day Run', subtitle: 'Personal Best', icon: '🏃', size: 'md', order: 7, accent: '#22c55e', startDate: isoDateFromNow(-24), totalDays: 90, category: 'health' }),
    w({ type: 'reading', title: 'Reading Goal', subtitle: '24 Books in 2026', icon: '📖', size: 'md', order: 8, accent: 'var(--accent-3)', current: 14, target: 24, unit: 'Books Read', extraLabel: 'Current Book', extraValue: 'Atomic Habits', extraSub: 'by James Clear', category: 'personal' }),
    w({ type: 'savings', title: 'Savings Goal', subtitle: 'Financial Freedom Fund', icon: '💵', size: 'md', order: 9, accent: 'var(--accent)', current: 7250, target: 10000, unit: '$', category: 'finance' }),
    w({
      type: 'checklist', title: "Today's Missions", icon: '🎯', size: 'md', order: 10, accent: 'var(--accent)',
      items: [
        { id: makeId(), label: 'Spend time with God', done: true },
        { id: makeId(), label: 'Workout', done: true },
        { id: makeId(), label: 'Study for Midterm', done: false },
        { id: makeId(), label: 'Finish Sermon Outline', done: false },
        { id: makeId(), label: 'Read 30 Pages', done: true },
      ],
    }),
  ];

  const events = [
    { id: makeId(), date: isoDateFromNow(2), title: 'Preaching at Joshua Tabernacle', time: '10:00 AM', category: 'faith', color: 'var(--accent-3)' },
    { id: makeId(), date: isoDateFromNow(9), title: 'Preaching at Taylortown Church', time: '11:30 AM', category: 'faith', color: 'var(--accent)' },
    { id: makeId(), date: isoDateFromNow(6), title: '90-Day Run Checkpoint', time: '', category: 'health', color: '#22c55e' },
    { id: makeId(), date: isoDateFromNow(46), title: 'Midterm Exams', time: '', category: 'school', color: 'var(--accent)' },
    { id: makeId(), date: isoDateFromNow(23), title: 'Graduation Ceremony', time: '10:00 AM', category: 'school', color: 'var(--accent)' },
    { id: makeId(), date: isoDateFromNow(133), title: 'Conference Trip', time: '', category: 'business', color: '#ec4899' },
  ];

  return {
    template: 'adult',
    theme: { accent: '#22d3ee', accent2: '#3b82f6', accent3: '#a855f7', bgFrom: '#04030d', bgTo: '#050818' },
    text: {
      title: "Michael's Life Dashboard",
      subtitle: 'Purpose in motion. 🚀',
      welcomeMessage: 'Welcome back, Michael',
      sidebarBrand: 'T-Minus',
      sidebarSubtitle: 'Dashboard',
      brandEmoji: '🚀',
      missionBoxTitle: 'You are in Mission Mode',
      missionBoxText: 'Focus. Execute. Repeat.',
      progressLabel: 'Overall Progress',
      progressText: "You're building your future.",
      progressPercent: 68,
      quote: 'I can do all things through Christ who strengthens me.',
      quoteAuthor: 'Philippians 4:13',
      focusToday: 'Focus. Faith. Family. Future.',
    },
    profile: { name: 'Michael Lee', title: 'Mission Builder', emoji: '🧑🏾', image: null, level: 12, xp: 2450, xpMax: 5000 },
    navItems: adultNav,
    widgets,
    events,
    habits: [
      { id: makeId(), label: 'Morning Prayer', icon: '🙏', streak: 12, completedToday: true, history: [] },
      { id: makeId(), label: 'Workout', icon: '💪', streak: 9, completedToday: true, history: [] },
      { id: makeId(), label: 'Read Scripture', icon: '📖', streak: 12, completedToday: false, history: [] },
      { id: makeId(), label: 'No Sugar', icon: '🚫', streak: 5, completedToday: true, history: [] },
      { id: makeId(), label: 'Journal', icon: '📓', streak: 7, completedToday: false, history: [] },
      { id: makeId(), label: 'Sermon Prep', icon: '📝', streak: 3, completedToday: true, history: [] },
      { id: makeId(), label: 'Early Sleep', icon: '🌙', streak: 4, completedToday: true, history: [] },
      { id: makeId(), label: 'Cold Shower', icon: '🚿', streak: 12, completedToday: true, history: [] },
    ],
    journal: [
      { id: makeId(), date: isoDateFromNow(-1), title: 'Staying the course', body: 'Grateful for another day of progress. The 90-day run is teaching me more about discipline than I expected.', mood: '💪' },
      { id: makeId(), date: isoDateFromNow(-3), title: 'Sermon prep breakthrough', body: 'Finally found the right thread for Sunday. Faith in Action is coming together.', mood: '🙏' },
    ],
    achievements: [
      { id: makeId(), title: '7-Day Streak', description: 'Completed habits 7 days in a row.', icon: '🔥', unlocked: true, date: isoDateFromNow(-5) },
      { id: makeId(), title: 'First Sermon Delivered', description: 'Preached your first sermon on T-Minus.', icon: '⛪', unlocked: true, date: isoDateFromNow(-40) },
      { id: makeId(), title: 'Halfway to Graduation', description: 'Crossed 50% progress toward your degree.', icon: '🎓', unlocked: true, date: isoDateFromNow(-60) },
      { id: makeId(), title: '$5,000 Saved', description: 'Reached the halfway mark on your savings goal.', icon: '💰', unlocked: true, date: isoDateFromNow(-20) },
      { id: makeId(), title: '90-Day Finisher', description: 'Complete the full 90-day personal challenge.', icon: '🏁', unlocked: false },
      { id: makeId(), title: '24 Books a Year', description: 'Finish your full reading goal.', icon: '📚', unlocked: false },
    ],
    resources: [
      { id: makeId(), title: 'Sermon Outline Template', subtitle: 'Faith In Action series notes', icon: '📄' },
      { id: makeId(), title: 'Seminary Reading List', subtitle: 'Required texts for this semester', icon: '📚' },
      { id: makeId(), title: '90-Day Training Plan', subtitle: 'Week-by-week structure', icon: '🏃' },
      { id: makeId(), title: 'Budget Tracker Sheet', subtitle: 'Savings & finances', icon: '💵' },
    ],
    friends: [],
    messages: [],
    vitals: { streakDays: 12, focusLevel: 82, energyPercent: 87, systemStatus: 'All Systems Go', affirmation: "You've got purpose. Let's move." },
  };
}

export function createStudentPreset(): AppState {
  const widgets: Widget[] = [
    w({ type: 'countdown', title: 'Math Exam', subtitle: 'Algebra II', icon: '🧮', size: 'sm', order: 0, accent: 'var(--accent-2)', targetDate: fromNow(2, 8, 0), ctaLabel: 'View Study Plan', category: 'school' }),
    w({ type: 'clock', title: 'Command Clock', icon: '🕐', size: 'tall', order: 1, text: 'Stay Focused', extraValue: 'Your future is in your hands.' }),
    w({ type: 'calendar', title: 'Calendar', icon: '📅', size: 'tall', order: 2 }),
    w({ type: 'countdown', title: 'Youth Choir', subtitle: 'Spring Performance', icon: '🎵', size: 'sm', order: 3, accent: 'var(--accent-3)', targetDate: fromNow(9, 19, 0), ctaLabel: 'Practice Schedule', category: 'personal' }),
    w({ type: 'countdown', title: 'Graduation Countdown', subtitle: 'Class of 2027', icon: '🎓', size: 'md', order: 4, accent: 'var(--accent-3)', targetDate: fromNow(376, 0, 0), category: 'school', ctaLabel: 'Keep Going!' }),
    w({ type: 'countdown', title: 'Birthday', subtitle: 'Sweet 16!', icon: '🎂', size: 'sm', order: 5, accent: '#f59e0b', targetDate: fromNow(139, 0, 0), category: 'personal' }),
    w({ type: 'countdown', title: 'Christmas', subtitle: 'The Season of Joy', icon: '🎄', size: 'sm', order: 6, accent: '#22c55e', targetDate: fromNow(210, 0, 0), category: 'personal' }),
    w({
      type: 'checklist', title: 'Homework Progress', icon: '📋', size: 'md', order: 7, accent: 'var(--accent)',
      items: [
        { id: makeId(), label: 'Math Problem Set', done: true },
        { id: makeId(), label: 'English Essay', done: false },
        { id: makeId(), label: 'Biology Lab Report', done: false },
        { id: makeId(), label: 'History Reading', done: true },
        { id: makeId(), label: 'Spanish Vocab', done: false },
      ],
      category: 'school',
    }),
    w({ type: 'reading', title: 'Reading Goal', subtitle: 'Read more. Grow more.', icon: '📖', size: 'md', order: 8, accent: 'var(--accent-3)', current: 18, target: 24, unit: 'Books Completed', extraLabel: 'Current Book', extraValue: 'The Inheritance Games', extraSub: 'by Jennifer Lynn Barnes', category: 'personal' }),
    w({ type: 'study', title: 'Study Hours', subtitle: 'GPA Goal: 4.0', icon: '📚', size: 'md', order: 9, accent: 'var(--accent)', current: 32, target: 40, unit: 'Study Hours This Month', extraLabel: 'Current GPA', extraValue: '3.6', category: 'school' }),
    w({
      type: 'checklist', title: "Today's Missions", icon: '⭐', size: 'md', order: 10, accent: 'var(--accent-2)',
      items: [
        { id: makeId(), label: 'Math homework', done: true },
        { id: makeId(), label: 'Study for Biology quiz', done: true },
        { id: makeId(), label: 'Basketball practice', done: false },
        { id: makeId(), label: 'Call Grandma', done: false },
        { id: makeId(), label: 'Finish art project', done: true },
      ],
    }),
  ];

  const events = [
    { id: makeId(), date: isoDateFromNow(2), title: 'Math Exam - Algebra II', time: '8:00 AM', category: 'school', color: 'var(--accent-2)' },
    { id: makeId(), date: isoDateFromNow(9), title: 'Youth Choir Spring Performance', time: '7:00 PM', category: 'personal', color: 'var(--accent-3)' },
    { id: makeId(), date: isoDateFromNow(5), title: 'Biology Quiz', time: '', category: 'school', color: 'var(--accent)' },
    { id: makeId(), date: isoDateFromNow(14), title: 'Basketball Practice', time: '4:00 PM', category: 'personal', color: '#f59e0b' },
    { id: makeId(), date: isoDateFromNow(139), title: 'Sweet 16 Birthday', time: '', category: 'personal', color: '#f59e0b' },
  ];

  return {
    template: 'student',
    theme: { accent: '#22d3ee', accent2: '#ec4899', accent3: '#a855f7', bgFrom: '#0a0518', bgTo: '#150827' },
    text: {
      title: "Maya's Life Dashboard",
      subtitle: 'Dream Big. Study Hard. Shine Bright. ✨',
      welcomeMessage: 'Welcome back, Maya',
      sidebarBrand: 'Starpath',
      sidebarSubtitle: 'Command Center',
      brandEmoji: '🌙',
      missionBoxTitle: 'Mission Mode',
      missionBoxText: 'Focus. Plan. Achieve. Level up every day.',
      progressLabel: 'Next Study Star',
      progressText: "You've got this, Maya!",
      progressPercent: 69,
      quote: 'You are braver than you believe, stronger than you seem, and smarter than you think.',
      quoteAuthor: 'A. A. Milne',
      focusToday: 'Focus Today: Consistency',
    },
    profile: { name: 'Maya', title: 'Future Architect', emoji: '👧🏽', image: null, level: 16, xp: 3450, xpMax: 5000 },
    navItems: studentNav,
    widgets,
    events,
    habits: [
      { id: makeId(), label: 'Read 20 Minutes', icon: '📖', streak: 12, completedToday: true, history: [] },
      { id: makeId(), label: 'Homework Before Screen Time', icon: '📝', streak: 12, completedToday: true, history: [] },
      { id: makeId(), label: 'Practice Piano', icon: '🎹', streak: 6, completedToday: false, history: [] },
      { id: makeId(), label: 'Drink Water', icon: '💧', streak: 12, completedToday: true, history: [] },
      { id: makeId(), label: 'Gratitude Journal', icon: '🙏', streak: 8, completedToday: true, history: [] },
      { id: makeId(), label: 'Stretch / Move', icon: '🤸', streak: 4, completedToday: false, history: [] },
      { id: makeId(), label: 'Tidy Room', icon: '🧹', streak: 3, completedToday: true, history: [] },
      { id: makeId(), label: 'Kind Word to Someone', icon: '💛', streak: 12, completedToday: true, history: [] },
    ],
    journal: [
      { id: makeId(), date: isoDateFromNow(-1), title: 'Choir practice went great!', body: 'We nailed the harmony today. Ms. Reyes said we are ready for the spring performance.', mood: '🎵' },
      { id: makeId(), date: isoDateFromNow(-4), title: 'Nervous about the math exam', body: 'Going to study a little more each night this week so I feel ready.', mood: '😬' },
    ],
    achievements: [
      { id: makeId(), title: '7-Day Streak', description: 'Completed habits 7 days in a row.', icon: '🔥', unlocked: true, date: isoDateFromNow(-5) },
      { id: makeId(), title: 'Bookworm', description: 'Read 15 books this year.', icon: '📚', unlocked: true, date: isoDateFromNow(-10) },
      { id: makeId(), title: 'Honor Roll', description: 'Kept your GPA above 3.5 all semester.', icon: '🏅', unlocked: true, date: isoDateFromNow(-30) },
      { id: makeId(), title: 'Choir Star', description: 'Performed a solo in the spring concert.', icon: '🎤', unlocked: false },
      { id: makeId(), title: '24 Books a Year', description: 'Finish your full reading goal.', icon: '📖', unlocked: false },
      { id: makeId(), title: 'Level 20', description: 'Reach level 20 on your dashboard.', icon: '⭐', unlocked: false },
    ],
    resources: [
      { id: makeId(), title: 'Algebra II Study Guide', subtitle: 'Chapters 4-6 review', icon: '🧮' },
      { id: makeId(), title: 'Choir Sheet Music', subtitle: 'Spring performance set', icon: '🎵' },
      { id: makeId(), title: 'Reading List 2026', subtitle: '24 books to finish', icon: '📚' },
    ],
    friends: [
      { id: makeId(), title: 'Zoe Martinez', subtitle: 'Choir • Study buddy', icon: '👩🏻' },
      { id: makeId(), title: 'Priya Patel', subtitle: 'Basketball • Lunch crew', icon: '👩🏽' },
      { id: makeId(), title: 'Jaden Cole', subtitle: 'Math study group', icon: '🧑🏾' },
      { id: makeId(), title: 'Ella Kim', subtitle: 'Best friend since 3rd grade', icon: '👧🏻' },
    ],
    messages: [
      { id: makeId(), from: 'Ms. Reyes (Choir)', preview: 'Great rehearsal today! See you Thursday for the last run-through.', time: '2h ago', unread: true, avatar: '🎵' },
      { id: makeId(), from: 'Zoe Martinez', preview: 'Want to study for the math exam together tomorrow?', time: '5h ago', unread: true, avatar: '👩🏻' },
      { id: makeId(), from: 'Mom', preview: "Don't forget we have dinner with Grandma on Sunday!", time: '1d ago', unread: false, avatar: '💛' },
    ],
    vitals: { streakDays: 12, focusLevel: 78, energyPercent: 92, systemStatus: 'All Systems Go', affirmation: 'Keep shining, Maya!' },
  };
}

export function createPreset(id: 'adult' | 'student'): AppState {
  return id === 'adult' ? createAdultPreset() : createStudentPreset();
}
