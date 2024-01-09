import Plot from "react-plotly.js";
import { Config, Data, Layout } from "plotly.js";
import "./plotly-styles.css";
interface HammingChartProps {
  data1: number[];
  data2?: number[];
  xAxisLabels?: number[];
}

const HammingChart = ({ data1, data2, xAxisLabels }: HammingChartProps) => {
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
      fill: "tozeroy",
      fillcolor: "rgba(136, 132, 216, 0.2)",
      opacity: 0.9,
      hoverinfo: "none", // Отображаем информацию из text при наведении
      hovertemplate:
        "<b>Вага Хеммінга:</b> %{x}<br><b>Кількість:</b> %{y}<extra></extra>",
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
      fill: "tozeroy",
      fillcolor: "rgba(136, 132, 216, 0.2)",
      opacity: 0.9,
      hoverinfo: "none",
      hovertemplate:
        "<b>Вага Хеммінга:</b> %{x}<br><b>Кількість:</b> %{y}<extra></extra>",
    },
  ] as Data[];

  const plotLayout = {
    title: "Ваги Хеммінга двох генераторів",
    xaxis: {
      title: "Вага", // Название оси X
      type: "linear", // Тип данных на оси X (linear для числовой оси)
      tickvals: xAxisLabels,
      ticktext: xAxisLabels?.map((value) => value.toString()),
    },
    yaxis: {
      title: "Кількість", // Название оси Y
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
      className={"w-full h-[50rem]"}
      data={plotData}
      layout={plotLayout}
      config={plotConfig}
      useResizeHandler
    />
  );
};

export default HammingChart;
