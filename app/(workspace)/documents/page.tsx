import { Topbar } from "@/components/shell/Topbar";
import { TaskPanel } from "@/components/product/TaskPanel";
import { Button, Card, Input } from "@/components/ui/primitives";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { documents, userById } from "@/lib/data";

const kindIcon: Record<string, string> = {
  Folder: "folder",
  PDF: "file-check",
  DOCX: "file-text",
  Image: "photo",
  Figma: "pen-tool",
};

export default function DocumentsPage() {
  return (
    <>
      <Topbar crumbs={["Workspace", "Documents"]} />
      <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight">Documents</h1>
          <Button className="ml-auto"><Icon name="upload" size={15} /> Upload</Button>
        </div>
        <div className="mt-4 max-w-md">
          <label htmlFor="documents-search" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Search documents</label>
          <Input id="documents-search" placeholder="Search documents…" className="h-11 min-h-[44px]" />
        </div>
        <Card className="mt-4 overflow-hidden">
          <div className="hidden grid-cols-[1.6fr_1fr_1fr] gap-3 border-b border-line px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:grid dark:border-linedark">
            <span>Name</span><span>Owner</span><span className="text-right">Last modified</span>
          </div>
          <ul className="divide-y divide-line dark:divide-linedark">
            {documents.map((d) => {
              const u = userById(d.ownerId);
              return (
                <li key={d.id} className="grid gap-1 px-5 py-3 hover:bg-slate-50 sm:grid-cols-[1.6fr_1fr_1fr] sm:items-center dark:hover:bg-white/5">
                  <span className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500/10 text-blue-500"><Icon name={kindIcon[d.kind] ?? "file-text"} size={16} /></span>
                    <span><span className="block text-sm font-medium">{d.name}</span><span className="block text-[11px] text-slate-400">{d.detail}</span></span>
                  </span>
                  <span className="flex items-center gap-2 text-[13px]">
                    <Image src={u.avatar} alt={`${u.name} profile photo`} width={24} height={24} loading="lazy" priority={false} className="h-6 w-6 rounded-full object-cover" /> {u.name}
                  </span>
                  <span className="text-[13px] text-slate-500 sm:text-right">{d.modified}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      </main>
      <TaskPanel />
    </>
  );
}
