import Plot from "react-plotly.js";
import { Config, Data, Layout } from "plotly.js";
import "./plotly-styles.css";
import { memo } from "react";

interface HammingChartProps {
  data1: number[];
  data2?: number[];
  xAxisLabels?: number[];
}

const HammingChart = memo(
  ({ data1, data2, xAxisLabels }: HammingChartProps) => {
    const plotData = [
      {
        y: data1,
        name: "Вага лінійної послідовності",
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
        fill: "tozeroy",
        fillcolor: "rgba(136, 132, 216, 0.2)",
        opacity: 0.9,
        hoverinfo: "none", // Отображаем информацию из text при наведении
        hovertemplate:
          "<b>Вага Хеммінга:</b> %{x}<br><b>Кількість:</b> %{y}<extra></extra>",
      },
      {
        y: data2,
        name: "Вага матричної послідовності",
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
        fill: "tozeroy",
        fillcolor: "rgba(136, 132, 216, 0.2)",
        opacity: 0.9,
        hoverinfo: "none",
        hovertemplate:
          "<b>Вага Хеммінга:</b> %{x}<br><b>Кількість:</b> %{y}<extra></extra>",
      },
    ] as Data[];

    const plotLayout = {
      title: {
        text: "Розподіл ваг Хеммінга у блоці",
        font: {
          size: 24,
          color: "#18181b",
          family: "Arial",
          weight: "bold",
        },
      },
      xaxis: {
        title: {
          text: "Вага",
          font: {
            size: 18,
            color: "#18181b",
            family: "Arial",
            weight: "bold",
          },
        },
        type: "linear",
        tickfont: {
          size: 16, // изменение размера шрифта для подписей оси X
          color: "#18181b",
          family: "Inter",
        },
        tickvals: xAxisLabels,
        ticktext: xAxisLabels?.map((value) => value.toString()),
      },
      yaxis: {
        title: {
          text: "Кількість",
          font: {
            size: 18,
            color: "#18181b",
            family: "Arial",
            weight: "bold",
          },
        },
        tickfont: {
          size: 16, // изменение размера шрифта для подписей оси X
          color: "#18181b",
          family: "Inter"
        },
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
      legend: {
        orientation: "h",
        xanchor: "center",
        yanchor: "middle",
        font: {
          size: 12,
          color: "#18181b",
          family: "Arial",
        },
        x: 0.5,
        y: 1,
      },
      margin: {
        t: 60,
      },
      showlegend: true,
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
  },
);

export default HammingChart;
