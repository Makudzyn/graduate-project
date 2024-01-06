import Plot from "react-plotly.js";
import { Data, Layout } from "plotly.js";
interface PlotlyChartProps {
  data1: number[];
  data2?: number[];
}

const PlotlyChart = ({ data1, data2 }: PlotlyChartProps) => {
  const TOP_LIMIT_Y_AXIS = 1.1;
  const BOTTOM_LIMIT_Y_AXIS = -1.1;

  const plotData = [
    {
      y: data1,
      type: "scatter",
      mode: "lines+markers",
      marker: {
        color: "#8884d8",
        size: 8,
      },
      line: {
        shape: "spline",
        color: "#8884d8",
        width: 3,
      },
      opacity: 0.9,
      hoverinfo: "none", // Отображаем информацию из text при наведении
      hovertemplate:
        "<b>Index:</b> %{x}<br><b>Correlation:</b> %{y}<br><extra></extra>",
    },
    {
      y: data2,
      type: "scatter",
      mode: "lines+markers",
      marker: {
        color: "#82ca9d",
        size: 8,
      },
      line: {
        shape: "spline",
        color: "#82ca9d",
        width: 3,
      },
      opacity: 0.9,
      hoverinfo: "none",
      hovertemplate:
        "<b>Index:</b> %{x}<br><b>Correlation:</b> %{y}<br><extra></extra>",
    },
  ] as Data[];

  const plotLayout = {
    title: "Автокореляційний графік",
    xaxis: {
      title: "Індекс", // Название оси X
      type: "linear", // Тип данных на оси X (linear для числовой оси)
    },
    yaxis: {
      title: "Коєфіцієнт корреляції", // Название оси Y
      range: [BOTTOM_LIMIT_Y_AXIS, TOP_LIMIT_Y_AXIS], // Диапазон значений на оси Y
    },
    showlegend: false,
  } as Partial<Layout>;

  const plotConfig = {
    showEditInChartStudio: true,
    plotlyServerURL: "https://chart-studio.plotly.com",
    locale: "ua",
  };

  return (
    <Plot
      className={"w-full h-[42rem]"}
      data={plotData}
      layout={plotLayout}
      config={plotConfig}
      useResizeHandler
    />
  );
};

export default PlotlyChart;