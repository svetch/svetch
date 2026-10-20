import { createFileRoute } from '@tanstack/react-router';

import { Technologies } from '../components/technologies';

const profileImageUrl = `${import.meta.env.BASE_URL}android-chrome-512x512.png`;

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center gap-4 md:flex-row">
        <img
          width={512}
          height={512}
          src={profileImageUrl}
          alt="ProfileImage"
          className="h-32 w-32 rounded-full"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold">Román Benjámin</h1>
          <h2 className="text-2xl font-bold">alias Svetch</h2>
          <p className="text-lg">
            Platform / DevOps engineer &amp; full-stack developer
          </p>
          <p className="mt-3 max-w-xl text-base text-white/70">
            I build and operate Kubernetes platforms, automate delivery and
            developer workflows, and develop full-stack business applications.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-5 py-8">
        <h2 className="mb-4 text-center text-2xl">What I work on</h2>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            Infrastructure and GitOps: Kubernetes, Terraform, Argo CD,
            networking, PostgreSQL operations, backups, and environment
            provisioning.
          </li>
          <li>
            Developer platforms and delivery: Coder, devcontainers, GitHub
            Actions, release automation, and PR preview environments.
          </li>
          <li>
            Reliability and security: Grafana, Prometheus, Loki, Mimir, Tempo,
            OpenTelemetry, secret management, and production troubleshooting.
          </li>
          <li>
            Full-stack development: TypeScript, React, Next.js, Node.js, Bun,
            PostgreSQL, external integrations, and Cloudflare Workers.
          </li>
          <li>
            Software quality: PGlite backend test environments, Playwright E2E
            tests, CI quality gates, and backend architecture modernization.
          </li>
        </ul>
      </section>
      <section className="flex flex-col py-2">
        <h2 className="mb-4 text-center text-2xl">Technology experience</h2>
        <Technologies />
      </section>
      <section className="py-2">
        <h2 className="text-center text-2xl">Contact</h2>
        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <a href="mailto:info@svetch.com" className="text-center">
            Email
          </a>
          <a href="https://discord.com/users/788813950115381249">Discord</a>
          <a href="https://github.com/svetch">Github</a>
        </div>
      </section>
    </>
  );
}
