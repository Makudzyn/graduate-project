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
  const [state, setState] = useState<State>({
    data,
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax+1",
    bottom: "dataMin-1",
    animation: true,
  });
  const getAxisYDomain = (
    from: number,
    to: number,
    ref: string,
    offset: number,
  ): [number, number] => {
    const refData: any[] = data.slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];

    refData.forEach((d) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });

    return [(bottom | 0) - offset, (top | 0) + offset];
  };

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
      // xAxis domain
      if (refAreaLeft > refAreaRight) {
        [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
      }

      // yAxis domain
      const [bottom, top] = getAxisYDomain(
        refAreaLeft,
        refAreaRight,
        "correlationFirst",
        1,
      );

      setState({
        ...state,
        refAreaLeft: "",
        refAreaRight: "",
        data: data.slice(),
        left: refAreaLeft,
        right: refAreaRight,
        bottom,
        top,
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
      top: "dataMax+1",
      bottom: "dataMin",
    });
  };

  const { left, right, refAreaLeft, refAreaRight, top, bottom } = state;

  return (
    <div className="highlight-bar-charts mb-5" style={{ userSelect: "none" }}>
      <button type="button" className="btn update" onClick={zoomOut}>
        Zoom Out
      </button>
      <ResponsiveContainer width="100%" height={600}>
        <LineChart
          width={800}
          height={400}
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
            domain={[left, right]}
            type="number"
            strokeWidth={2}
            tickCount={data.length / 2}
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
            label={{
              value: `Коєфіцієнт корреляції`,
              style: { textAnchor: 'middle' },
              angle: -90,
              position: 'left',
              offset: 0,
            }}
            strokeWidth={2}
            tickCount={10}
            tickFormatter={num => num.toFixed(2)}
          />
          <Tooltip content={<CustomTooltip/>}/>
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
              animationDuration={300}
            />
          )}
          {/*<ReferenceLine y={1} label="Max" stroke="red" strokeDasharray="1 1" />*/}
          {/*<ReferenceLine x={-1} label="Min" stroke="red" strokeDasharray="1 1" />*/}

          {typeof refAreaLeft === "number" &&
          typeof refAreaRight === "number" ? (
            <ReferenceArea
              yAxisId="1"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.9}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
