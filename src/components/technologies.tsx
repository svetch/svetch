import {
  type Experience,
  experience,
  type Technology,
} from '../data/experience';

const typeOrder: Technology['type'][] = [
  'life',
  'language',
  'framework',
  'database',
  'devops',
  'hosting',
  'tool',
  'misc',
];

const typeLabels: Record<Technology['type'], string> = {
  life: 'Life',
  language: 'Languages',
  framework: 'Frameworks',
  database: 'Databases',
  devops: 'DevOps',
  hosting: 'Hosting',
  tool: 'Tools',
  misc: 'Other',
};

// The site's burgundy accent; every category shares it to keep the timeline calm.
const barColor = 'bg-[oklch(0.52_0.17_18)]/85';

export function Technologies() {
  return <Calendar experience={experience} />;
}

function Calendar({ experience }: { experience: Experience }) {
  const { technologies } = experience;
  const allDates = technologies.flatMap((technology) => technology.dates);
  const minYear = Math.min(...allDates.map(({ start }) => start.getFullYear()));
  const maxYear = Math.max(...allDates.map(({ end }) => end.getFullYear()));
  const minDate = new Date(minYear, 0, 1);
  const maxDate = new Date(maxYear, 11, 31);
  const fullTimeRange = maxDate.getTime() - minDate.getTime();
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i,
  );

  const groups = typeOrder
    .map((type) => ({
      type,
      items: technologies.filter((technology) => technology.type === type),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div>
      <div className="text-xs sm:text-sm">
        <div className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[9.5rem_1fr] gap-2 sm:gap-3 pb-2">
          <div />
          <div className="flex text-[10px] sm:text-xs text-muted-foreground/70">
            {years.map((year) => (
              <div key={year} className="flex-1 text-center tabular-nums">
                {`'${String(year).slice(2)}`}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {groups.map((group) => (
            <div key={group.type} className="flex flex-col gap-1">
              <div className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[9.5rem_1fr] gap-2 sm:gap-3">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className={`size-2 rounded-full ${barColor}`} />
                  {typeLabels[group.type]}
                </div>
              </div>
              {group.items.map((technology) => (
                <TechnologyEntry
                  key={technology.name}
                  fullTimeRange={fullTimeRange}
                  minDate={minDate}
                  maxDate={maxDate}
                  technology={technology}
                  yearCount={years.length}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TechnologyEntry({
  fullTimeRange,
  maxDate,
  minDate,
  technology,
  yearCount,
}: {
  technology: Technology;
  minDate: Date;
  maxDate: Date;
  fullTimeRange: number;
  yearCount: number;
}) {
  const showSummary = technology.summary ?? true;
  return (
    <div className="group grid grid-cols-[6.5rem_1fr] sm:grid-cols-[9.5rem_1fr] items-center gap-2 sm:gap-3 rounded-md">
      <div className="flex items-baseline justify-between gap-2 truncate">
        <span className="truncate text-foreground/90 group-hover:text-foreground">
          {technology.name}
        </span>
        {showSummary && (
          <span className="shrink-0 text-[10px] sm:text-xs text-muted-foreground/70 tabular-nums">
            {getStringRange(technology.dates)}
          </span>
        )}
      </div>
      <div
        className="relative h-5 rounded-sm bg-foreground/[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(to right, transparent 0, transparent calc(100% / ${yearCount} - 1px), var(--border) calc(100% / ${yearCount} - 1px), var(--border) calc(100% / ${yearCount}))`,
        }}
      >
        {technology.dates.map(({ start, end }) => {
          const left =
            ((start.getTime() - minDate.getTime()) / fullTimeRange) * 100;
          const right =
            ((maxDate.getTime() - end.getTime()) / fullTimeRange) * 100;
          return (
            <span
              key={`${start.getTime()}-${end.getTime()}`}
              title={`${technology.name}: ${formatMonth(start)} – ${formatMonth(end)} (${getStringRange([{ start, end }])})`}
              style={{ left: `${left}%`, right: `${right}%` }}
              className={`absolute inset-y-1 rounded-full transition-[filter] group-hover:brightness-150 ${barColor}`}
            />
          );
        })}
      </div>
    </div>
  );
}

const monthFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
});

function formatMonth(date: Date) {
  return date.getTime() >= Date.now() - DAY
    ? 'now'
    : monthFormatter.format(date);
}

function getStringRange(dates: { start: Date; end: Date }[]) {
  const { months, years } = getDatesRange(dates);
  const m = months > 0 ? `${months}m` : '';
  const y = years > 0 ? `${years}y${m.length > 0 ? ' ' : ''}` : '';
  return `${y}${m}`;
}
function getDateRange(range: number) {
  const years = Math.floor(range / YEAR);
  const months = Math.floor((range % YEAR) / MONTH);
  const days = Math.floor(((range % YEAR) % MONTH) / DAY);
  return { years, months, days };
}
function getDatesRange(dates: { start: Date; end: Date }[]) {
  const range = dates.reduce(
    (acc, cur) => acc + (cur.end.getTime() - cur.start.getTime()),
    0,
  );
  return getDateRange(range);
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;
