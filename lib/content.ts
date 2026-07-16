import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import levelsJson from "@/content/levels.json";
import resourcesJson from "@/content/resources.json";

export type LevelId = "beginner" | "intermediate" | "advanced" | "professional";

export type Level = { id: LevelId; title: string; description: string };

export type LessonVideo = { url: string; lang: "ar" | "en"; title: string };

export type Lesson = {
  slug: string;
  level: LevelId;
  order: number;
  title: string;
  skills: string[];
  videos: LessonVideo[];
  refs: string[];
  introHtml: string;
};

export type ReferenceTopic = { slug: string; title: string };

export type Resource = {
  name: string;
  url: string;
  language: "ar" | "en" | "other";
  level: string;
  description_ar: string;
  verified: boolean;
};

export type Resources = {
  channels_ar: Resource[];
  channels_intl: Resource[];
  pattern_sites: Resource[];
};

export const LEVELS = levelsJson as Level[];
const LEVEL_IDS = LEVELS.map((l) => l.id);

export const REFERENCE_TOPICS: ReferenceTopic[] = [
  { slug: "yarn", title: "أنواع الخيوط" },
  { slug: "hooks", title: "الإبر والسنانير" },
  { slug: "tools", title: "أدوات الكروشيه" },
  { slug: "glossary", title: "قاموس المصطلحات" },
];

const CONTENT = path.join(process.cwd(), "content");

function fail(file: string, msg: string): never {
  throw new Error(`content validation failed in ${file}: ${msg}`);
}

let lessonsCache: Lesson[] | null = null;

/* Reads + validates all lessons at build time — bad frontmatter fails the build. */
export function getLessons(): Lesson[] {
  if (lessonsCache) return lessonsCache;
  const dir = path.join(CONTENT, "lessons");
  const lessons = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      if (typeof data.slug !== "string" || data.slug !== file.replace(/\.md$/, ""))
        fail(file, "slug must match the filename");
      if (!LEVEL_IDS.includes(data.level)) fail(file, `unknown level "${data.level}"`);
      if (typeof data.order !== "number") fail(file, "order must be a number");
      if (typeof data.title !== "string" || !data.title) fail(file, "title is required");
      if (!Array.isArray(data.skills) || data.skills.some((s: unknown) => typeof s !== "string"))
        fail(file, "skills must be a string array");
      if (!Array.isArray(data.videos)) fail(file, "videos must be an array");
      for (const v of data.videos) {
        if (typeof v?.url !== "string" || !["ar", "en"].includes(v?.lang) || typeof v?.title !== "string")
          fail(file, "each video needs { url, lang: ar|en, title }");
      }
      return {
        slug: data.slug,
        level: data.level as LevelId,
        order: data.order,
        title: data.title,
        skills: data.skills as string[],
        videos: data.videos as LessonVideo[],
        refs: Array.isArray(data.refs) ? (data.refs as string[]) : [],
        introHtml: marked.parse(content) as string,
      };
    })
    .sort((a, b) =>
      a.level === b.level
        ? a.order - b.order
        : LEVEL_IDS.indexOf(a.level) - LEVEL_IDS.indexOf(b.level)
    );
  lessonsCache = lessons;
  return lessons;
}

export function getLesson(slug: string): Lesson | undefined {
  return getLessons().find((l) => l.slug === slug);
}

export function lessonsByLevel(): { level: Level; lessons: Lesson[] }[] {
  const all = getLessons();
  return LEVELS.map((level) => ({
    level,
    lessons: all.filter((l) => l.level === level.id),
  }));
}

export function getAdjacentLessons(slug: string): {
  prev: Lesson | undefined;
  next: Lesson | undefined;
} {
  const all = getLessons();
  const i = all.findIndex((l) => l.slug === slug);
  return { prev: all[i - 1], next: all[i + 1] };
}

export function getReferencePage(slug: string): {
  title: string;
  description: string;
  html: string;
} | undefined {
  if (!REFERENCE_TOPICS.some((t) => t.slug === slug)) return undefined;
  const file = path.join(CONTENT, "reference", `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  if (typeof data.title !== "string" || !data.title) fail(`reference/${slug}.md`, "title is required");
  return {
    title: data.title,
    description: typeof data.description === "string" ? data.description : "",
    html: marked.parse(content) as string,
  };
}

export function getResources(): Resources {
  return resourcesJson as Resources;
}
