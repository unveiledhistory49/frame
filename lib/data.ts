// Frame typed mock store — Prisma-ready shapes.
// When Postgres is connected, these types map 1:1 to Prisma models:
// User, Workspace, Membership, Project, Task, TaskComment, Client, Document, Activity, Notification, Subscription, Invitation.

export type Role = "owner" | "admin" | "member" | "viewer";
export type TaskStatus = "backlog" | "progress" | "review" | "done";
export type Priority = "Low" | "Medium" | "High" | "Urgent";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface Workspace {
  id: string;
  name: string;
  plan: "Starter" | "Pro" | "Business";
}

export interface Project {
  id: string;
  name: string;
  description: string;
  client: string;
  clientId: string;
  status: "In Progress" | "Planning" | "On Hold" | "Completed";
  progress: number;
  due: string;
  members: string[];
  archived?: boolean;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  label: "Design" | "Development" | "Content" | "Marketing" | "Technical";
  assignees: string[];
  due: string;
  priority: Priority;
  comments: number;
}

export interface TaskComment {
  id: string;
  taskId: string;
  authorId: string;
  body: string;
  time: string;
  image?: string;
}

export interface Client {
  id: string;
  name: string;
  contact: string;
  projects: number;
  status: "Active" | "Inactive";
  avatarColor: string;
}

export interface Doc {
  id: string;
  name: string;
  kind: "Folder" | "PDF" | "DOCX" | "Image" | "Figma";
  detail: string;
  ownerId: string;
  modified: string;
}

export interface ActivityItem {
  id: string;
  actorId: string;
  text: string;
  detail?: string;
  time: string;
  day: "Today" | "Yesterday";
}

export const users: User[] = [
  { id: "u-alex", name: "Alex Morgan", email: "alex@acme.com", role: "Product Manager", avatar: "/images/avatars/alex-morgan.jpg" },
  { id: "u-sarah", name: "Sarah Johnson", email: "sarah@acme.com", role: "Designer", avatar: "/images/avatars/sarah-johnson.jpg" },
  { id: "u-daniel", name: "Daniel Kim", email: "daniel@acme.com", role: "Engineer", avatar: "/images/avatars/daniel-kim.jpg" },
  { id: "u-ava", name: "Ava Carter", email: "ava@acme.com", role: "Engineer", avatar: "/images/avatars/ava-carter.jpg" },
  { id: "u-michael", name: "Michael Lee", email: "michael@acme.com", role: "Engineer", avatar: "/images/avatars/michael-lee.jpg" },
  { id: "u-emma", name: "Emma Wilson", email: "emma@globex.com", role: "Client", avatar: "/images/avatars/emma-wilson.jpg" },
  { id: "u-james", name: "James Chen", email: "james@stellar.co", role: "Engineer", avatar: "/images/avatars/james-chen.jpg" },
  { id: "u-sofia", name: "Sofia Reyes", email: "sofia@nova.io", role: "Marketer", avatar: "/images/avatars/sofia-reyes.jpg" },
];

export const userById = (id: string) =>
  users.find((u) => u.id === id) ?? users[0];

export const workspaces: Workspace[] = [
  { id: "w-acme", name: "Acme Inc.", plan: "Pro" },
  { id: "w-personal", name: "Personal", plan: "Starter" },
];

export const projects: Project[] = [
  { id: "p-phoenix", name: "Project Phoenix", description: "Landing page redesign for Acme Corp", client: "Acme Corp", clientId: "c-acme", status: "In Progress", progress: 68, due: "2024-09-25", members: ["u-sarah", "u-daniel", "u-ava"] },
  { id: "p-atlas", name: "Project Atlas", description: "API platform overhaul", client: "Globex", clientId: "c-globex", status: "Planning", progress: 24, due: "2024-10-10", members: ["u-daniel", "u-michael"] },
  { id: "p-orion", name: "Project Orion", description: "Mobile onboarding flow", client: "Stellar Co", clientId: "c-stellar", status: "On Hold", progress: 12, due: "2024-10-18", members: ["u-james", "u-sofia"] },
  { id: "p-web", name: "Website Redesign", description: "Corporate site refresh", client: "Acme Corp", clientId: "c-acme", status: "Completed", progress: 100, due: "2024-09-12", members: ["u-sarah", "u-emma"] },
  { id: "p-mobile", name: "Mobile App", description: "Customer companion app", client: "Nova Ltd", clientId: "c-nova", status: "In Progress", progress: 45, due: "2024-09-30", members: ["u-ava", "u-michael"] },
];

export const tasks: Task[] = [
  { id: "t-hero", projectId: "p-phoenix", title: "Homepage hero section", description: "Design the new hero section with updated messaging and visuals.", status: "backlog", label: "Design", assignees: ["u-sarah", "u-daniel"], due: "2024-09-18", priority: "High", comments: 3 },
  { id: "t-cms", projectId: "p-phoenix", title: "CMS integration", description: "Integrate with Sanity CMS for dynamic content.", status: "backlog", label: "Development", assignees: ["u-daniel"], due: "2024-09-20", priority: "Medium", comments: 1 },
  { id: "t-features", projectId: "p-phoenix", title: "Features section", description: "Build out the features section with icons and copy.", status: "backlog", label: "Design", assignees: ["u-sarah", "u-ava"], due: "2024-09-22", priority: "Medium", comments: 0 },
  { id: "t-case", projectId: "p-phoenix", title: "Case studies", description: "Write and format 3 case studies for the new site.", status: "backlog", label: "Content", assignees: ["u-sofia"], due: "2024-09-24", priority: "Low", comments: 2 },
  { id: "t-api", projectId: "p-phoenix", title: "API integration", description: "Connect frontend to new API endpoints.", status: "progress", label: "Development", assignees: ["u-daniel", "u-michael"], due: "2024-09-16", priority: "High", comments: 5 },
  { id: "t-nav", projectId: "p-phoenix", title: "Navigation updates", description: "Update header and mobile navigation.", status: "progress", label: "Design", assignees: ["u-sarah"], due: "2024-09-17", priority: "Medium", comments: 2 },
  { id: "t-seo", projectId: "p-phoenix", title: "SEO optimization", description: "Meta tags, schema, and redirects.", status: "progress", label: "Content", assignees: ["u-sofia", "u-daniel"], due: "2024-09-19", priority: "Medium", comments: 1 },
  { id: "t-perf", projectId: "p-phoenix", title: "Performance optimization", description: "Improve Lighthouse score to 95+.", status: "progress", label: "Development", assignees: ["u-michael"], due: "2024-09-20", priority: "High", comments: 4 },
  { id: "t-copy", projectId: "p-phoenix", title: "Landing page copy", description: "Review and finalize copy for homepage.", status: "review", label: "Design", assignees: ["u-sarah", "u-daniel"], due: "2024-09-15", priority: "High", comments: 6 },
  { id: "t-comp", projectId: "p-phoenix", title: "Component library", description: "Review new component styles and states.", status: "review", label: "Design", assignees: ["u-sarah"], due: "2024-09-18", priority: "Medium", comments: 3 },
  { id: "t-form", projectId: "p-phoenix", title: "Form validation", description: "Add client-side validation and error states.", status: "review", label: "Development", assignees: ["u-ava"], due: "2024-09-19", priority: "High", comments: 2 },
  { id: "t-faq", projectId: "p-phoenix", title: "FAQ section", description: "Write and review FAQ content.", status: "review", label: "Content", assignees: ["u-sofia", "u-ava"], due: "2024-09-21", priority: "Low", comments: 1 },
  { id: "t-brand", projectId: "p-phoenix", title: "Brand assets", description: "Create final logo and asset pack.", status: "done", label: "Design", assignees: ["u-sarah"], due: "2024-09-10", priority: "Medium", comments: 8 },
  { id: "t-home", projectId: "p-phoenix", title: "Homepage structure", description: "Set up base layout and components.", status: "done", label: "Development", assignees: ["u-daniel"], due: "2024-09-11", priority: "High", comments: 4 },
  { id: "t-test", projectId: "p-phoenix", title: "Client testimonials", description: "Collect and format client testimonials.", status: "done", label: "Content", assignees: ["u-sofia"], due: "2024-09-12", priority: "Low", comments: 2 },
  { id: "t-type", projectId: "p-phoenix", title: "Typography & color system", description: "Implement design tokens.", status: "done", label: "Design", assignees: ["u-sarah"], due: "2024-09-13", priority: "Medium", comments: 3 },
  { id: "t-landing", projectId: "p-phoenix", title: "Landing page design", description: "Design the landing page for Project Phoenix with a focus on clear messaging and modern visuals.", status: "review", label: "Design", assignees: ["u-sarah"], due: "2024-09-15", priority: "High", comments: 3 },
];

export const comments: TaskComment[] = [
  { id: "cm1", taskId: "t-landing", authorId: "u-sarah", body: "I've updated the hero section design. Open to feedback!", time: "2h ago", image: "/images/covers/comment-landscape.jpg" },
  { id: "cm2", taskId: "t-landing", authorId: "u-daniel", body: "Looks great! Let's align the copy with the new messaging from the marketing team.", time: "1h ago" },
  { id: "cm3", taskId: "t-landing", authorId: "u-ava", body: "Approved ✅", time: "30m ago" },
];

export const clients: Client[] = [
  { id: "c-acme", name: "Acme Corp", contact: "acme@acme.com", projects: 3, status: "Active", avatarColor: "#3B82F6" },
  { id: "c-globex", name: "Globex", contact: "hello@globex.com", projects: 2, status: "Active", avatarColor: "#6366F1" },
  { id: "c-stellar", name: "Stellar Co", contact: "contact@stellar.co", projects: 1, status: "Active", avatarColor: "#0EA5E9" },
  { id: "c-nova", name: "Nova Ltd", contact: "hello@novaltld.com", projects: 2, status: "Active", avatarColor: "#8B5CF6" },
  { id: "c-umbrella", name: "Umbrella Inc.", contact: "team@umbrella.com", projects: 1, status: "Inactive", avatarColor: "#64748B" },
];

export const documents: Doc[] = [
  { id: "d1", name: "Project Phoenix", kind: "Folder", detail: "Folder", ownerId: "u-sarah", modified: "Sep 14, 2024" },
  { id: "d2", name: "Design assets", kind: "Folder", detail: "Folder", ownerId: "u-daniel", modified: "Sep 12, 2024" },
  { id: "d3", name: "Contract_v2.pdf", kind: "PDF", detail: "PDF · 2.4 MB", ownerId: "u-ava", modified: "Sep 10, 2024" },
  { id: "d4", name: "API_specification.docx", kind: "DOCX", detail: "DOCX · 1.2 MB", ownerId: "u-michael", modified: "Sep 8, 2024" },
  { id: "d5", name: "Brand guidelines.pdf", kind: "PDF", detail: "PDF · 3.8 MB", ownerId: "u-sarah", modified: "Sep 5, 2024" },
];

export const activity: ActivityItem[] = [
  { id: "a1", actorId: "u-sarah", text: "Sarah moved “Homepage redesign”", detail: "from In Progress → Review", time: "09:42", day: "Today" },
  { id: "a2", actorId: "u-daniel", text: "Daniel commented on API integration", time: "09:18", day: "Today" },
  { id: "a3", actorId: "u-alex", text: "You were assigned “QA checklist”", time: "08:55", day: "Today" },
  { id: "a4", actorId: "u-michael", text: "Michael uploaded 3 files", detail: "Design-assets.zip", time: "16:32", day: "Yesterday" },
  { id: "a5", actorId: "u-sarah", text: "Sarah mentioned you in Project Phoenix", detail: "@Alex can you take a look at this?", time: "14:21", day: "Yesterday" },
  { id: "a6", actorId: "u-ava", text: "Client uploaded a document", detail: "Contract_v2.pdf", time: "11:03", day: "Yesterday" },
];

export const activitySeries = {
  labels: ["Apr 1", "Apr 8", "Apr 15", "Apr 22", "Apr 29"],
  completed: [10, 14, 12, 20, 17],
  created: [5, 9, 7, 12, 11],
};

export const deadlines = [
  { id: "dl1", title: "Landing page design", project: "Project Phoenix", when: "Today", color: "#F59E0B" },
  { id: "dl2", title: "API integration", project: "Project Atlas", when: "Tomorrow", color: "#3B82F6" },
  { id: "dl3", title: "QA testing", project: "Project Orion", when: "Sep 22", color: "#8B5CF6" },
  { id: "dl4", title: "Client presentation", project: "Acme Corp", when: "Sep 25", color: "#EF4444" },
];
