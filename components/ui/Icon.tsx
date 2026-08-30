import {
  AppWindow,
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarCheck,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Clock,
  Droplets,
  Eye,
  Facebook,
  FileText,
  GraduationCap,
  Handshake,
  HardHat,
  HeartHandshake,
  Home,
  Instagram,
  KeyRound,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scale,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Smile,
  Sofa,
  Sparkles,
  SprayCan,
  Store,
  Target,
  ThumbsUp,
  Users,
  X,
  type LucideProps,
} from "lucide-react";

/**
 * Every icon used anywhere on the site, listed by name.
 * data/content.ts refers to these names as plain strings, which keeps the
 * content file free of imports and easy to edit.
 */
const icons = {
  AppWindow,
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarCheck,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Clock,
  Droplets,
  Eye,
  Facebook,
  FileText,
  GraduationCap,
  Handshake,
  HardHat,
  HeartHandshake,
  Home,
  Instagram,
  KeyRound,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scale,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Smile,
  Sofa,
  Sparkles,
  SprayCan,
  Store,
  Target,
  ThumbsUp,
  Users,
  X,
};

export type IconName = keyof typeof icons;

type IconProps = LucideProps & {
  /** Name of the icon, e.g. "Sparkles". Falls back to a sparkle if unknown. */
  name: string;
};

export default function Icon({ name, ...props }: IconProps) {
  const Component = icons[name as IconName] ?? Sparkles;
  return <Component aria-hidden="true" {...props} />;
}
