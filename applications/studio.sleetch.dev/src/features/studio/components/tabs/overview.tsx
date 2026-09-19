import type { sleetch_source_details, tree_object } from '@sleetch/core/compiler';
import { Antenna, ChartBarBig, ChartPie, HardDrive, Heading1, Languages, type LucideIcon, Package } from 'lucide-react';
import { type ReactNode, useMemo } from 'react';
import { useClientStore } from '@/shared/stores/client';
import { cn } from '@/shared/utils/cn';
import { BarList } from '../tremor/bar-list';
import { DonutChart } from '../tremor/donut-chart';

type bar_item = { name: string; value: number };

export function count_tree_objects(tree: tree_object[]) {
  let categories = 0;
  let pages = 0;

  function visit(nodes: tree_object[]) {
    for (const node of nodes) {
      if (node.type === 'page') {
        pages++;
      } else {
        if (node.page) pages++;
        categories++;
        visit(node.children);
      }
    }
  }

  visit(tree);

  return { categories, pages };
}

export function count_trees_objects(trees: Record<string, tree_object[]>) {
  let categories = 0;
  let pages = 0;

  for (const tree of Object.values(trees)) {
    const count = count_tree_objects(tree);
    categories += count.categories;
    pages += count.pages;
  }

  return { categories, pages };
}

export function count_sources_natures(sources: sleetch_source_details[]) {
  let _static = 0;
  for (const source of sources) {
    if (source.static) _static += 1;
  }
  return { static: _static, dynamic: sources.length - _static };
}

function sort_desc(items: bar_item[]) {
  return items.sort((a, b) => b.value - a.value);
}

export function count_by<T>(items: T[], key: (item: T) => string): bar_item[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    const name = key(item);
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  return sort_desc(Array.from(counts, ([name, value]) => ({ name, value })));
}

export function count_pages_by_language(trees: Record<string, tree_object[]>): bar_item[] {
  return sort_desc(Object.entries(trees).map(([name, tree]) => ({ name, value: count_tree_objects(tree).pages })));
}

export function count_pages_by_source_type(trees: Record<string, tree_object[]>, sources: sleetch_source_details[]): bar_item[] {
  const source_types = new Map(sources.map((source) => [source.id, source.type]));

  // Initialize every source type, including types with 0 pages.
  const totals = new Map<string, number>();

  for (const source of sources) {
    totals.set(source.type, totals.get(source.type) ?? 0);
  }

  function count_page(page: page<content>) {
    const source_type = source_types.get(page.content.source_id);

    if (source_type) {
      totals.set(source_type, (totals.get(source_type) ?? 0) + 1);
    }
  }

  function visit(nodes: tree_object[]) {
    for (const node of nodes) {
      if (node.type === 'page') {
        count_page(node);
      } else {
        if (node.page) {
          count_page(node.page);
        }

        visit(node.children);
      }
    }
  }

  for (const tree of Object.values(trees)) {
    visit(tree);
  }

  return sort_desc(Array.from(totals, ([name, value]) => ({ name, value })));
}
export function compute_sources_mutability(sources: sleetch_source_details[]) {
  const { static: _static, dynamic } = count_sources_natures(sources);
  const total = _static + dynamic;
  if (total === 0) return [];
  const static_percentage = Math.round((_static / total) * 100);
  return [
    { name: 'Static', percentage: static_percentage },
    { name: 'Dynamic', percentage: 100 - static_percentage },
  ];
}

function Card(data: { icon: LucideIcon; title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('bg-accent border rounded-sm p-3 py-5 space-y-3', data.className)}>
      <div className="flex gap-2 items-center text-muted-foreground">
        <data.icon className="size-5" />
        <h1 className="text-base">{data.title}</h1>
      </div>
      {data.children}
    </div>
  );
}

export function Overview() {
  const state = useClientStore();

  const {
    categoriesCount,
    pagesCount,
    staticSourcesCount,
    dynamicSourcesCount,
    pagesByLanguage,
    sourcesByType,
    sourcesMutability,
    sourcesByLanguage,
    pagesBySourceType,
  } = useMemo(() => {
    const { categories, pages } = count_trees_objects(state.trees);
    const { static: _static, dynamic } = count_sources_natures(state.sources);

    return {
      categoriesCount: categories,
      pagesCount: pages,
      staticSourcesCount: _static,
      dynamicSourcesCount: dynamic,
      pagesByLanguage: count_pages_by_language(state.trees),
      sourcesByType: count_by(state.sources, (source) => source.type).map((item) => ({
        name: item.name,
        amount: item.value,
      })),
      sourcesMutability: compute_sources_mutability(state.sources),
      sourcesByLanguage: count_by(state.sources, (source) => source.language),
      pagesBySourceType: count_pages_by_source_type(state.trees, state.sources),
    };
  }, [state.trees, state.sources]);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="space-y-2">
        <h1 className="text-2xl">Cool Numbers</h1>
        <div className="grid grid-cols-5 gap-3">
          <Card icon={Languages} title="Languages">
            <p className="text-3xl font-bold font-brand">{state.languages.length}</p>
          </Card>
          <Card icon={Package} title="Categories">
            <p className="text-3xl font-bold font-brand">{categoriesCount}</p>
          </Card>
          <Card icon={Heading1} title="Pages">
            <p className="text-3xl font-bold font-brand">{pagesCount}</p>
          </Card>
          <Card icon={HardDrive} title="Static Sources">
            <p className="text-3xl font-bold font-brand">{staticSourcesCount}</p>
          </Card>
          <Card icon={Antenna} title="Dynamic Sources">
            <p className="text-3xl font-bold font-brand">{dynamicSourcesCount}</p>
          </Card>
        </div>
        <h1 className="text-2xl">Repartition Analysis</h1>

        <div className="grid grid-cols-4 gap-3">
          <Card icon={ChartBarBig} title="Pages / Languages" className="col-span-2">
            <BarList data={pagesByLanguage} />
          </Card>
          <Card icon={ChartPie} title="Sources Types" className="flex flex-col items-center col-span-2">
            <DonutChart
              className="h-50 w-full"
              data={sourcesByType}
              variant="donut"
              category="name"
              value="amount"
              showTooltip={false}

              valueFormatter={(number: number) => Intl.NumberFormat('en-US').format(number)}
            />
          </Card>

          <Card icon={ChartPie} title="Sources Mutability" className="flex flex-col items-center col-span-2">
            <DonutChart
              className="h-50 w-full"
              data={sourcesMutability}
              variant="donut"
              category="name"
              value="percentage"
              showTooltip={false}
              valueFormatter={(number: number) => `${number}%`}
            />
          </Card>

          <Card icon={ChartBarBig} title="Sources / Languages" className="col-span-2">
            <BarList data={sourcesByLanguage} />
          </Card>

          <Card icon={ChartBarBig} title="Pages / Sources" className="col-span-2">
            <BarList data={pagesBySourceType} />
          </Card>
        </div>
      </div>
    </div>
  );
}
