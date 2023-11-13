import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import CustomTooltip from "./CustomTooltip.tsx";
import {formatTicks} from "../../functions/chartFunctions.ts";

export interface DataPoint {
  index: number;
  correlationFirst: number;
  correlationSecond?: number;
}

interface State {
  data: DataPoint[];
  left: string | number;
  right: string | number;
  refAreaLeft: string | number | undefined;
  refAreaRight: string | number | undefined;
  top: string | number;
  bottom: string | number;
  animation: boolean;
}

const Chart = ({ data }: { data: DataPoint[] }) => {
  const TOP_LIMIT_Y_AXIS = 1.1;
  const BOTTOM_LIMIT_Y_AXIS = -1.1;

  const [state, setState] = useState<State>({
    data,
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top: TOP_LIMIT_Y_AXIS,
    bottom: BOTTOM_LIMIT_Y_AXIS,
    animation: true,
  });

  const zoom = () => {
    let { refAreaLeft, refAreaRight } = state;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setState({
        ...state,
        refAreaLeft: "",
        refAreaRight: "",
      });
      return;
    }

    if (typeof refAreaLeft === "number" && typeof refAreaRight === "number") {
      if (refAreaLeft > refAreaRight) {
        [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
      }

        setState({
          ...state,
          refAreaLeft: "",
          refAreaRight: "",
          data: data.slice(),
          left: refAreaLeft,
          right: refAreaRight,
        });
      }
  };

  const zoomOut = () => {
    setState({
      ...state,
      data: data.slice(),
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
    });
  };

  return (
    <div className="highlight-bar-charts mb-5" style={{ userSelect: "none" }}>
      <button type="button" className="btn update" onClick={zoomOut}>
        Zoom Out
      </button>
      <ResponsiveContainer width="100%" height={600}>
        <LineChart
          width={800}
          height={600}
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          data={data}
          onMouseDown={(e) =>
            setState({ ...state, refAreaLeft: e.activeLabel })
          }
          onMouseMove={(e) =>
            state.refAreaLeft &&
            setState({ ...state, refAreaRight: e.activeLabel })
          }
          onMouseUp={zoom}
        >
          <CartesianGrid strokeDasharray="2 2" />

          <XAxis
            allowDataOverflow
            dataKey="index"
            domain={[state.left, state.right]}
            type="number"
            strokeWidth={2}
            tickCount={formatTicks(data.length)}
            tickSize={8}
            interval={"equidistantPreserveStart"}
            allowDecimals={false}
          />

          <YAxis
            allowDataOverflow
            domain={[state.bottom, state.top]}
            type="number"
            yAxisId="1"
            label={{
              value: `Коєфіцієнт корреляції`,
              style: { textAnchor: "middle" },
              angle: -90,
              position: "left",
              offset: 0,
            }}
            strokeWidth={2}
            tickSize={8}
            tickCount={24}
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            yAxisId="1"
            type="natural"
            dataKey="correlationFirst"
            stroke="#8884d8"
            strokeWidth={"2"}
            animationDuration={300}
          />
          {data[0].correlationSecond !== undefined && (
            <Line
              yAxisId="1"
              type="natural"
              dataKey="correlationSecond"
              stroke="#82ca9d"
              strokeWidth={"2"}
              animationDuration={300}
            />
          )}
          <ReferenceLine yAxisId="1" y={1} stroke="red" strokeOpacity={0.4} strokeWidth={1.5} strokeDasharray="6 3" />
          <ReferenceLine yAxisId="1" y={-1} stroke="red" strokeOpacity={0.4} strokeWidth={1.5} strokeDasharray="6 3" />
          {typeof state.refAreaLeft === "number" &&
          typeof state.refAreaRight === "number" ? (
            <ReferenceArea
              yAxisId="1"
              y1={1}
              y2={-1}
              x1={state.refAreaLeft}
              x2={state.refAreaRight}
              label={"Zoom in"}
              strokeOpacity={0.9}
              ifOverflow={"visible"}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
