import { createFileRoute } from '@tanstack/react-router';
import { type ReactNode, useEffect, useState } from 'react';

import { Technologies } from '../components/technologies';

const profileImageUrl = `${import.meta.env.BASE_URL}android-chrome-512x512.png`;

export const Route = createFileRoute('/')({
  component: HomePage,
});

const focusAreas = [
  {
    title: 'infrastructure',
    description:
      'Kubernetes, Terraform, Argo CD, networking, PostgreSQL operations, backups, and environment provisioning.',
  },
  {
    title: 'platforms',
    description:
      'Coder, devcontainers, GitHub Actions, release automation, and PR preview environments.',
  },
  {
    title: 'reliability',
    description:
      'Grafana, Prometheus, Loki, Mimir, Tempo, OpenTelemetry, secret management, and production troubleshooting.',
  },
  {
    title: 'full-stack',
    description:
      'TypeScript, React, Next.js, Node.js, Bun, PostgreSQL, external integrations, and Cloudflare Workers.',
  },
  {
    title: 'quality',
    description:
      'PGlite backend test environments, Playwright E2E tests, CI quality gates, and backend architecture modernization.',
  },
];

const contactLinks = [
  { key: 'e', label: 'email', href: 'mailto:info@svetch.com' },
  { key: 'g', label: 'github', href: 'https://github.com/svetch' },
  {
    key: 'd',
    label: 'discord',
    href: 'https://discord.com/users/788813950115381249',
  },
];

const windows = [
  { index: 1, id: 'about' },
  { index: 2, id: 'focus' },
  { index: 3, id: 'experience' },
  { index: 4, id: 'contact' },
];

function useAge() {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const updateAge = () => {
      const today = new Date();
      const birthdayIsAhead =
        today.getMonth() < 9 ||
        (today.getMonth() === 9 && today.getDate() < 28);
      setAge(today.getFullYear() - 2002 - (birthdayIsAhead ? 1 : 0));
    };

    // Calculate in the browser so the static page never freezes the age at build time.
    updateAge();
    const interval = window.setInterval(updateAge, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return age;
}

function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat('hu-HU', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Budapest',
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const interval = window.setInterval(update, 10_000);
    return () => window.clearInterval(interval);
  }, []);

  return <span>{time ?? '--:--'}</span>;
}

function HomePage() {
  const age = useAge();

  return (
    <div className="min-h-screen bg-[oklch(0.14_0.012_18)] pb-16 font-mono text-sm text-[oklch(0.88_0.012_18)]">
      <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-16">
        <Pane id="about" title="about" index={1}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <img
              width={512}
              height={512}
              src={profileImageUrl}
              alt="Román Benjámin"
              className="size-20 rounded-sm ring-1 ring-[oklch(0.52_0.17_18)]/40"
            />
            <dl className="grid grid-cols-[6rem_1fr] gap-x-3 gap-y-1">
              <Field name="name">
                <span className="font-semibold text-[oklch(0.72_0.14_15)]">
                  Román Benjámin
                </span>{' '}
                <span className="text-muted-foreground">(svetch)</span>
              </Field>
              <Field name="role">
                Platform / DevOps engineer &amp; full-stack developer
              </Field>
              <Field name="age">{age ?? '…'}</Field>
              <Field name="status">
                <span className="text-emerald-400">● online</span>{' '}
                <span className="text-muted-foreground">· hu-HU</span>
              </Field>
            </dl>
          </div>
          <p className="mt-5 border-t border-dashed border-[oklch(0.52_0.17_18)]/20 pt-4 leading-relaxed text-muted-foreground">
            I build and operate Kubernetes platforms, automate delivery and
            developer workflows, and develop full-stack business applications.
          </p>
        </Pane>

        <Pane id="focus" title="focus" index={2}>
          <ul className="flex flex-col">
            {focusAreas.map((area, index) => (
              <li
                key={area.title}
                className="grid gap-1 border-b border-dashed border-[oklch(0.52_0.17_18)]/10 py-2.5 last:border-b-0 sm:grid-cols-[2.5rem_9rem_1fr] sm:gap-3"
              >
                <span className="hidden text-muted-foreground/60 sm:inline">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[oklch(0.72_0.14_15)]">{area.title}</span>
                <span className="text-muted-foreground">
                  {area.description}
                </span>
              </li>
            ))}
          </ul>
        </Pane>

        <Pane id="experience" title="experience" index={3}>
          <Technologies />
        </Pane>

        <Pane id="contact" title="contact" index={4}>
          <div className="flex flex-wrap gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group inline-flex items-center gap-2 rounded-sm border border-[oklch(0.52_0.17_18)]/20 px-3 py-1.5 transition-colors hover:border-[oklch(0.52_0.17_18)]/60 hover:bg-[oklch(0.52_0.17_18)]/10"
              >
                <kbd className="rounded-sm bg-[oklch(0.52_0.17_18)]/15 px-1.5 text-xs text-[oklch(0.72_0.14_15)]">
                  {link.key}
                </kbd>
                <span className="group-hover:text-[oklch(0.72_0.14_15)]">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </Pane>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 bg-[oklch(0.42_0.14_18)] px-3 py-1 text-xs text-[oklch(0.92_0.03_15)]">
        <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
          <span className="mr-1 bg-black/60 px-2 py-0.5 font-semibold text-[oklch(0.72_0.14_15)]">
            [svetch]
          </span>
          {windows.map((pane) => (
            <a
              key={pane.id}
              href={`#${pane.id}`}
              className="shrink-0 px-1.5 py-0.5 hover:bg-black/20"
            >
              {pane.index}:{pane.id}
            </a>
          ))}
        </div>
        <span className="hidden shrink-0 sm:inline">
          "svetch.com" <Clock />
        </span>
      </nav>
    </div>
  );
}

function Pane({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset
      id={id}
      className="min-w-0 scroll-mt-6 rounded-sm border border-[oklch(0.52_0.17_18)]/25 px-4 pt-2 pb-5 sm:px-6"
    >
      <legend className="px-2 text-xs">
        <span className="text-muted-foreground">[{index}]</span>{' '}
        <span className="text-[oklch(0.72_0.14_15)]">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

function Field({ name, children }: { name: string; children: ReactNode }) {
  return (
    <>
      <dt className="text-muted-foreground">{name}</dt>
      <dd>{children}</dd>
    </>
  );
}
