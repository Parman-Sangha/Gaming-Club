import { Mail } from "lucide-react";
import type { SocialPlatform } from "@/lib/types";
import {
  DiscordIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitchIcon,
} from "@/components/ui/brand-icons";

export { DiscordIcon, InstagramIcon, LinkedInIcon, TwitchIcon };

type IconComponent = (props: { className?: string }) => React.ReactElement;

/** Maps a social platform key from content onto its icon and accessible label. */
export const SOCIAL_ICONS: Record<
  SocialPlatform,
  { Icon: IconComponent; label: string }
> = {
  instagram: { Icon: InstagramIcon, label: "Instagram" },
  discord: { Icon: DiscordIcon, label: "Discord" },
  linkedin: { Icon: LinkedInIcon, label: "LinkedIn" },
  email: { Icon: Mail as IconComponent, label: "Email" },
  twitch: { Icon: TwitchIcon, label: "Twitch" },
};
