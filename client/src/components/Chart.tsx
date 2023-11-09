import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  name: number;
  cost: number;
  impression: number;
}

interface State {
  data: DataPoint[];
  left: string | number;
  right: string | number;
  refAreaLeft: string | number;
  refAreaRight: string | number;
  top: string | number;
  bottom: string | number;
  animation: boolean;
}

const getAxisYDomain = (
  from: number,
  to: number,
  ref: string,
  offset: number
): [number, number] => {
  const refData = data.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];

  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const App = (data : DataPoint[]) => {
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
        "cost",
        1
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

  const {
    left,
    right,
    refAreaLeft,
    refAreaRight,
    top,
    bottom,
  } = state;

  return (
    <div className="highlight-bar-charts" style={{ userSelect: "none" }}>
      <button type="button" className="btn update" onClick={zoomOut}>
        Zoom Out
      </button>
      <ResponsiveContainer width="100%" height={600}>
        <LineChart
          width={800}
          height={400}
          data={data}
          onMouseDown={(e) => setState({ ...state, refAreaLeft: e.activeLabel })}
          onMouseMove={(e) =>
            state.refAreaLeft &&
            setState({ ...state, refAreaRight: e.activeLabel })
          }
          onMouseUp={zoom}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            allowDataOverflow
            dataKey="name"
            domain={[left, right]}
            type="number"
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
          />
          <Tooltip />
          <Line
            yAxisId="1"
            type="natural"
            dataKey="cost"
            stroke="#8884d8"
            animationDuration={300}
          />
          <Line
            yAxisId="1"
            type="natural"
            dataKey="impression"
            stroke="#82ca9d"
            animationDuration={300}
          />

          {typeof refAreaLeft === "number" && typeof refAreaRight === "number" ? (
            <ReferenceArea
              yAxisId="1"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;
