// Tremor DonutChart [v1.0.0]
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React from 'react';
import { Pie, type PieSectorDataItem, PieChart as ReChartsDonutChart, ResponsiveContainer, Sector, Tooltip } from 'recharts';
import type { PieSectorData, PieSectorShapeProps } from 'recharts/types/polar/Pie';
import { AvailableChartColors, type AvailableChartColorsKeys, constructCategoryColors, getColorClassName } from '@/shared/utils/chartUtils';
import { cn as cx } from '@/shared/utils/cn';

const sumNumericArray = (arr: number[]): number => arr.reduce((sum, num) => sum + num, 0);

const parseData = (data: Record<string, any>[], categoryColors: Map<string, AvailableChartColorsKeys>, category: string) =>
  data.map((dataPoint) => ({
    ...dataPoint,
    color: categoryColors.get(dataPoint[category]) || AvailableChartColors[0],
    className: getColorClassName(categoryColors.get(dataPoint[category]) || AvailableChartColors[0], 'fill'),
  }));

const calculateDefaultLabel = (data: any[], valueKey: string): number => sumNumericArray(data.map((dataPoint) => dataPoint[valueKey]));

const parseLabelInput = (labelInput: string | undefined, valueFormatter: (value: number) => string, data: any[], valueKey: string): string =>
  labelInput || valueFormatter(calculateDefaultLabel(data, valueKey));

//#region Tooltip

type TooltipProps = Pick<ChartTooltipProps, 'active' | 'payload'>;

type PayloadItem = {
  category: string;
  value: number;
  color: AvailableChartColorsKeys;
};

interface ChartTooltipProps {
  active: boolean | undefined;
  payload: PayloadItem[];
  valueFormatter: (value: number) => string;
}

const ChartTooltip = ({ active, payload, valueFormatter }: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={cx(
          // base
          'rounded-md border text-sm shadow-md',
          // border color
          'border',
          // background color
          'bg-card'
        )}
      >
        <div className={cx('space-y-1 px-4 py-2')}>
          {payload.map(({ value, category, color }, index) => (
            <div key={`id-${index}`} className="flex items-center justify-between space-x-8">
              <div className="flex items-center space-x-2">
                <span aria-hidden="true" className={cx('size-2 shrink-0 rounded-full', getColorClassName(color, 'bg'))} />
                <p
                  className={cx(
                    // base
                    'text-right whitespace-nowrap'
                  )}
                >
                  {category}
                </p>
              </div>
              <p
                className={cx(
                  // base
                  'text-right font-medium whitespace-nowrap tabular-nums'
                )}
              >
                {valueFormatter(value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};
const renderShape = (props: any, chartId: string) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, midAngle, endAngle, isActive, index, color, payload, fill, percent, value, dataKey } = props;
  const hatchId = `hatch-${chartId}-${index}`;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  return (
    <g>
      {isActive && (
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={'var(--foreground)'}>
          {payload.name}
        </text>
      )}
      {isActive && (
        <defs>
          <pattern id={hatchId} patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
            <line x1="2" y1="0" x2="2" y2="4" className={getColorClassName(color, 'stroke')} strokeWidth="3" />
          </pattern>
        </defs>
      )}

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        className={isActive ? undefined : getColorClassName(color, 'fill')}
        fill={isActive ? `url(#${hatchId})` : undefined}
        opacity={isActive === false ? 0.9 : 1}
        style={{ outline: 'none' }}
      />

      {percent !== 0 && (
        <>
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle - (percent !== 100 ? 5 : 0)}
            endAngle={endAngle + (percent !== 100 ? 5 : 1)}
            innerRadius={(outerRadius ?? 0) + 6}
            outerRadius={(outerRadius ?? 0) + 10}
            fill={'var(--border)'}
          />
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={'var(--border)'} fill="none" />
          <circle cx={ex} cy={ey} r={2} fill={'var(--border)'} stroke="none" />
          <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="var(--foreground)">{`${payload['name']}`}</text>
          <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="var(--muted-foreground)">
            {`${((percent ?? 1) * 100).toFixed(0)}%`}
          </text>
        </>
      )}
    </g>
  );
};
type DonutChartVariant = 'donut' | 'pie';

type BaseEventProps = {
  eventType: 'sector';
  categoryClicked: string;
  [key: string]: number | string;
};

type DonutChartEventProps = BaseEventProps | null | undefined;

interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>[];
  category: string;
  value: string;
  colors?: AvailableChartColorsKeys[];
  variant?: DonutChartVariant;
  valueFormatter?: (value: number) => string;
  label?: string;
  showLabel?: boolean;
  showTooltip?: boolean;
  onValueChange?: (value: DonutChartEventProps) => void;
  tooltipCallback?: (tooltipCallbackContent: TooltipProps) => void;
  customTooltip?: React.ComponentType<TooltipProps>;
}

const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      data = [],
      value,
      category,
      colors = AvailableChartColors,
      variant = 'donut',
      valueFormatter = (value: number) => value.toString(),
      label,
      showLabel = false,
      showTooltip = true,
      onValueChange,
      tooltipCallback,
      customTooltip,
      className,
      ...other
    },
    forwardedRef
  ) => {
    const CustomTooltip = customTooltip;
    const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined);
    const isDonut = variant === 'donut';
    const parsedLabelInput = parseLabelInput(label, valueFormatter, data, value);

    const categories = Array.from(new Set(data.map((item) => item[category])));
    const categoryColors = constructCategoryColors(categories, colors);

    const prevActiveRef = React.useRef<boolean | undefined>(undefined);
    const prevCategoryRef = React.useRef<string | undefined>(undefined);

    const handleShapeClick = (data: any, index: number, event: React.MouseEvent) => {
      event.stopPropagation();
      if (!onValueChange) return;

      if (activeIndex === index) {
        setActiveIndex(undefined);
        onValueChange(null);
      } else {
        setActiveIndex(index);
        onValueChange({
          eventType: 'sector',
          categoryClicked: data.payload[category],
          ...data.payload,
        });
      }
    };

    return (
      <div ref={forwardedRef} className={cx('h-40 w-40 ', className)} tremor-id="tremor-raw" {...other}>
        <ResponsiveContainer className="size-full ">
          <ReChartsDonutChart
            onClick={
              onValueChange && activeIndex !== undefined
                ? () => {
                    setActiveIndex(undefined);
                    onValueChange(null);
                  }
                : undefined
            }
            margin={{
              top: 50,
              right: 120,
              bottom: 50,
              left: 120,
            }}
          >
            {showLabel && isDonut && (
              <text className="fill-accent-foreground" x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                {parsedLabelInput}
              </text>
            )}
            <Pie
              className={cx('stroke-border [&_.recharts-pie-sector]:outline-hidden ', onValueChange ? 'cursor-pointer' : 'cursor-default')}
              data={parseData(data, categoryColors, category)}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={isDonut ? '75%' : '0%'}
              outerRadius="100%"
              stroke=""
              strokeLinejoin="round"
              dataKey={value}
              nameKey={category}
              isAnimationActive={false}
              onClick={handleShapeClick}
              shape={renderShape}
              style={{ outline: 'none' }}
            />
            {showTooltip && (
              <Tooltip
                wrapperStyle={{ outline: 'none' }}
                isAnimationActive={false}
                content={({ active, payload }) => {
                  const cleanPayload = payload
                    ? payload.map((item: any) => ({
                        category: item.payload[category],
                        value: item.value,
                        color: categoryColors.get(item.payload[category]) as AvailableChartColorsKeys,
                      }))
                    : [];

                  const payloadCategory: string = cleanPayload[0]?.category;

                  if (tooltipCallback && (active !== prevActiveRef.current || payloadCategory !== prevCategoryRef.current)) {
                    tooltipCallback({
                      active,
                      payload: cleanPayload,
                    });
                    prevActiveRef.current = active;
                    prevCategoryRef.current = payloadCategory;
                  }

                  return showTooltip && active ? (
                    CustomTooltip ? (
                      <CustomTooltip active={active} payload={cleanPayload} />
                    ) : (
                      <ChartTooltip active={active} payload={cleanPayload} valueFormatter={valueFormatter} />
                    )
                  ) : null;
                }}
              />
            )}
          </ReChartsDonutChart>
        </ResponsiveContainer>
      </div>
    );
  }
);

DonutChart.displayName = 'DonutChart';

export { DonutChart, type DonutChartEventProps, type TooltipProps };
