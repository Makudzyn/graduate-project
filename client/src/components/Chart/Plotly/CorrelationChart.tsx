import Plot from "react-plotly.js";
import { Config, Data, Layout } from "plotly.js";
import "./plotly-styles.css";
import { memo } from "react";
interface CorrelationChartProps {
  data1: number[];
  data2?: number[];
}

const CorrelationChart = memo(({ data1, data2 }: CorrelationChartProps) => {
  let yAxisLimit = 1.1;
  let xAxisLimit = -1.1;


  const plotData = [
    {
      y: data1,
      type: "scattergl",
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
      type: "scattergl",
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

    title: {
      text: "Автокореляційний графік",
      font: {
        size: 24,
        color: "#18181b",
        family: "Arial",
        weight: "bold"
      },
    },
    xaxis: {
      title: {
        text: "Індекс",
        font: {
          size: 18,
          color: "#18181b",
          family: "Arial",
          weight: "bold"
        },
      },
      type: "linear",
      tickfont: {
        size: 16, // изменение размера шрифта для подписей оси X
        color: "#18181b",
        family: "Inter"
      },
    },
    yaxis: {
      title: {
        text:"Коєфіцієнт корреляції",
        font: {
          size: 18,
          color: "#18181b",
          family: "Arial",
          weight: "bold"
        },
      },
      tickfont: {
        size: 16, // изменение размера шрифта для подписей оси X
        color: "#18181b",
        family: "Inter"
      },
      range: [xAxisLimit, yAxisLimit],
    },
    hoverlabel: {
      font: {
        size: 16,
        color: "#18181b",
        family: "Arial",
      },
      align: "left",
      bgcolor: "#fff",
      bordercolor: "#d1d5db",
      borderwidth: 2,
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
});

export default CorrelationChart;
