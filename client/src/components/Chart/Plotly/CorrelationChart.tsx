import Plot from "react-plotly.js";
import { Config, Data, Layout } from "plotly.js";
import "./plotly-styles.css";
interface CorrelationChartProps {
  data1: number[];
  data2?: number[];
}

const CorrelationChart = ({ data1, data2 }: CorrelationChartProps) => {
  let yAxisLimit = 1.1;
  let xAxisLimit = -1.1;


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
      hovertemplate: "<b>Індекс:</b> %{x}<br><b>Коеф. корреляції:</b> %{y}<br><extra></extra>",
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
      hovertemplate: "<b>Індекс:</b> %{x}<br><b>Коеф. корреляції:</b> %{y}<br><extra></extra>",
    },
  ] as Data[];

  const plotLayout = {
    title: "Автокореляційний графік",
    xaxis: {
      title: "Індекс",
      type: "linear",
    },
    yaxis: {
      title: "Коєфіцієнт корреляції",
      range: [xAxisLimit, yAxisLimit],
    },
    showlegend: false,
  } as Partial<Layout>;

  const plotConfig = {
    showEditInChartStudio: true,
    modeBarButtonsToRemove: ["lasso2d", "select2d"],
    plotlyServerURL: "https://chart-studio.plotly.com",
    locale: "ua",
    displaylogo: false,
  } as Partial<Config>;

  return (
    <Plot
      className="w-full h-[50rem]"
      data={plotData}
      layout={plotLayout}
      config={plotConfig}
      useResizeHandler
    />
  );
};

export default CorrelationChart;
