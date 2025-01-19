import Plot from 'react-plotly.js';
import { Config, Data, Layout } from 'plotly.js';
import './plotly-styles.css';
import { memo } from 'react';

interface HammingChartProps {
  data1: number[];
  data2?: number[];
  xAxisLabels?: number[];
}

const HammingChart = memo(
  ({ data1, data2, xAxisLabels }: HammingChartProps) => {
    const plotData = [
      {
        // First dataset configuration
        y: data1, // Array of y-axis values for the first dataset
        name: 'Вага лінійної послідовності', // Name of the first dataset
        type: 'scattergl', // Use WebGL-accelerated scatter plot for performance
        mode: 'lines+markers',
        marker: {
          color: '#8884d8',
          size: 8,
        },
        line: {
          shape: 'spline',
          color: '#8884d8',
          width: 3,
        },
        fill: 'tozeroy', // Fill area under the line to the zero value on the Y-axis
        fillcolor: 'rgba(136, 132, 216, 0.2)',
        opacity: 0.9,
        hoverinfo: 'none', // Disable default hover information
        hovertemplate:
          '<b>Вага Хеммінга:</b> %{x}<br><b>Кількість:</b> %{y}<extra></extra>', // Custom hover template
      },
      {
        // Second dataset configuration
        y: data2, // Array of y-axis values for the second dataset
        name: 'Вага матричної послідовності', // Name of the second dataset
        type: 'scattergl', // Use WebGL-accelerated scatter plot
        mode: 'lines+markers',
        marker: {
          color: '#82ca9d',
          size: 8,
        },
        line: {
          shape: 'spline',
          color: '#82ca9d',
          width: 3,
        },
        fill: 'tozeroy', // Fill area under the line to the zero value on the Y-axis
        fillcolor: 'rgba(136, 132, 216, 0.2)',
        opacity: 0.9,
        hoverinfo: 'none', // Disable default hover information
        hovertemplate:
          '<b>Вага Хеммінга:</b> %{x}<br><b>Кількість:</b> %{y}<extra></extra>', // Custom hover template
      },
    ] as Data[];

    const plotLayout = {
      title: {
        text: 'Розподіл ваг Хеммінга у блоці', // Title of the plot
        font: {
          size: 24,
          color: '#18181b',
          family: 'Inter',
          weight: 'bold',
        },
      },
      // Configuration for the X-axis
      xaxis: {
        title: {
          text: 'Вага', // Title of the X-axis
          font: {
            size: 18,
            color: '#18181b',
            family: 'Inter',
            weight: 'bold',
          },
        },
        type: 'linear', // Linear scale for the X-axis
        tickfont: {
          size: 16,
          color: '#18181b',
          family: 'Inter',
        },
        tickvals: xAxisLabels, // Custom tick values for the X-axis
        ticktext: xAxisLabels?.map((value) => value.toString()), // Custom tick labels for the X-axis
      },
      // Configuration for the Y-axis
      yaxis: {
        title: {
          text: 'Кількість', // Title of the Y-axis
          font: {
            size: 18,
            color: '#18181b',
            family: 'Inter',
            weight: 'bold',
          },
        },
        tickfont: {
          size: 16,
          color: '#18181b',
          family: 'Inter',
        },
      },
      // Configuration for hover labels
      hoverlabel: {
        font: {
          size: 16,
          color: '#18181b',
          family: 'Inter',
        },
        align: 'left',
        bgcolor: '#fff',
        bordercolor: '#d1d5db',
        borderwidth: 2,
      },
      // Configuration for the legend
      legend: {
        orientation: 'h',
        xanchor: 'center', // Anchor the legend to the center of the X-axis
        yanchor: 'middle', // Anchor the legend to the middle of the Y-axis
        indentation: 10, // Additional space for legend items
        font: {
          size: 12,
          color: '#18181b',
          family: 'Inter',
        },
        x: 0.5, // Position the legend at the center of the X-axis
        y: 1, // Position the legend above the plot
      },
      margin: {
        t: 60, // Top margin for the plot layout
      },
      showlegend: true, // Always show the legend
    } as Partial<Layout>;

    // Configuration for the plot's behavior and UI
    const plotConfig = {
      showEditInChartStudio: true, // Enable editing in Plotly Chart Studio
      modeBarButtonsToRemove: ['lasso2d', 'select2d'], // Remove specific mode bar buttons
      plotlyServerURL: 'https://chart-studio.plotly.com', // URL for the Plotly Chart Studio server
      locale: 'ua', // Set locale to Ukrainian
      displaylogo: false, // Hide the Plotly logo in the mode bar
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
  },
);

HammingChart.displayName = 'HammingChart'; // For DevTools
export default HammingChart;
