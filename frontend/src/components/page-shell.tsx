import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  children?: ReactNode;
};

export function PageShell({ title, children }: PageShellProps) {
  return (
    <section className="mx-auto max-w-5xl rounded bg-white p-8">
      <h1 className="text-3xl font-semibold">{title}</h1>
      {children ? <div className="mt-4">{children}</div> : null}
    </section>
  );
}
