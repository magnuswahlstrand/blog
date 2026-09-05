/**
 * Post frontmatter. Derived from the zod schema in `@lib/posts/schema` so the
 * type and the build-time validation can't drift apart.
 */
export type { Post as Frontmatter } from "./lib/posts/schema";

export type SocialsObject = {
  name: SocialMedia;
  href: string;
  active: boolean;
}[];

export type SocialIcons = {
  [social in SocialMedia]: string;
};

export type SocialMedia =
  | "Github"
  | "Facebook"
  | "Instagram"
  | "Linkedin"
  | "Mail"
  | "Twitter"
  | "Twitch"
  | "YouTube"
  | "WhatsApp"
  | "Snapchat"
  | "Pinterest"
  | "TikTok"
  | "CodePen"
  | "Discord"
  | "GitLab"
  | "Reddit"
  | "Skype"
  | "Steam"
  | "Telegram";
