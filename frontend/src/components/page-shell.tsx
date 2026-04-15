import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  children?: ReactNode;
};

export function PageShell({ title, children }: PageShellProps) {
  return (
    <section className="h-screen w-screen mx-auto rounded bg-white p-8">
      <h1 className="text-3xl text-center font-semibold">{title}</h1>
      {children ? <div className="mt-4">{children}</div> : null}
    </section>
  );
}
