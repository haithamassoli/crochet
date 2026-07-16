import { BookOpen, Globe, House, Route } from "lucide-react";

export const NAV_ITEMS = [
  { href: "/", label: "الرئيسية", icon: House },
  { href: "/learn", label: "مسار التعلّم", icon: Route },
  { href: "/reference", label: "المراجع", icon: BookOpen },
  { href: "/resources", label: "المصادر", icon: Globe },
] as const;
