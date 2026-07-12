export type TemplateId = 'adult' | 'student';

export type PageId =
  | 'dashboard'
  | 'missions'
  | 'calendar'
  | 'goals'
  | 'habits'
  | 'journal'
  | 'achievements'
  | 'stats'
  | 'school'
  | 'friends'
  | 'resources'
  | 'messages'
  | 'finances'
  | 'settings';

export interface NavItem {
  id: PageId;
  label: string;
  icon: string;
}

export interface ProfileConfig {
  name: string;
  title: string;
  emoji: string;
  image: string | null;
  level: number;
  xp: number;
  xpMax: number;
}

export interface ThemeConfig {
  accent: string;
  accent2: string;
  accent3: string;
  bgFrom: string;
  bgTo: string;
}

export interface TextConfig {
  title: string;
  subtitle: string;
  welcomeMessage: string;
  sidebarBrand: string;
  sidebarSubtitle: string;
  brandEmoji: string;
  missionBoxTitle: string;
  missionBoxText: string;
  progressLabel: string;
  progressText: string;
  progressPercent: number;
  quote: string;
  quoteAuthor: string;
  focusToday: string;
}

export type WidgetType =
  | 'countdown'
  | 'clock'
  | 'calendar'
  | 'progress'
  | 'ninetyday'
  | 'checklist'
  | 'quote'
  | 'savings'
  | 'reading'
  | 'study'
  | 'text'
  | 'image';

export type WidgetSize = 'sm' | 'md' | 'lg' | 'wide' | 'tall';

export interface WidgetLayout {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  subtitle?: string;
  icon: string;
  accent?: string;
  size: WidgetSize;
  layout: WidgetLayout;
  hidden: boolean;
  order: number;
  ctaLabel?: string;
  category?: string;
  // countdown
  targetDate?: string;
  targetTimeLabel?: string;
  // progress-like
  current?: number;
  target?: number;
  unit?: string;
  extraLabel?: string;
  extraValue?: string;
  extraSub?: string;
  // ninety day
  startDate?: string;
  totalDays?: number;
  // checklist
  items?: ChecklistItem[];
  // quote
  text?: string;
  author?: string;
  // image
  imageUrl?: string;
}

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  time?: string;
  color?: string;
  category?: string;
}

export interface Habit {
  id: string;
  label: string;
  icon: string;
  streak: number;
  completedToday: boolean;
  history: string[]; // ISO dates completed
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  body: string;
  mood: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

export interface ListLink {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
}

export interface MessageItem {
  id: string;
  from: string;
  preview: string;
  time: string;
  unread: boolean;
  avatar: string;
}

export interface Vitals {
  streakDays: number;
  focusLevel: number;
  energyPercent: number;
  systemStatus: string;
  affirmation: string;
}

export interface AppState {
  template: TemplateId;
  theme: ThemeConfig;
  text: TextConfig;
  profile: ProfileConfig;
  navItems: NavItem[];
  widgets: Widget[];
  events: CalendarEvent[];
  habits: Habit[];
  journal: JournalEntry[];
  achievements: AchievementItem[];
  resources: ListLink[];
  friends: ListLink[];
  messages: MessageItem[];
  vitals: Vitals;
}
