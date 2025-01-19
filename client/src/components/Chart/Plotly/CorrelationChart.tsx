import Plot from 'react-plotly.js';
import { Config, Data, Layout } from 'plotly.js';
import './plotly-styles.css';
import { memo } from 'react';
import { useLocation } from 'react-router-dom';
interface CorrelationChartProps {
  data1: number[];
  data2?: number[];
}

const CorrelationChart = memo(({ data1, data2 }: CorrelationChartProps) => {
  // Set such values that there will be no clipping on the chart
  const yAxisLimit = 1.1;
  const xAxisLimit = -1.1;

  const location = useLocation();
  // Depending on the page of the generator, we display the corresponding captions on the graph
  const legendNames = () => {
    if (data1 && data2) {
      if (location.pathname === '/sum-and-product-generator') {
        return {
          name1: 'Послідовність S (сум)',
          name2: 'Послідовність P (добутків)',
        };
      } else if (location.pathname === '/register-comparison') {
        return {
          name1: 'Лінійна послідовність',
          name2: 'Матрична послідовність',
        };
      }
    }
    return {};
  };

  const plotData = [
    {
      // First dataset configuration
      y: data1, // Array of y-axis values for the first dataset
      name: data1 && data2 && legendNames().name1, // Name of the first dataset (conditionally retrieved)
      type: 'scattergl', // Use WebGL-accelerated scatter plot for better performance with large datasets
      mode: 'lines+markers', // Plot both lines and markers
      marker: {
        // Marker color and size
        color: '#8884d8',
        size: 8,
      },
      line: {
        shape: 'spline', // Smooth line shape
        color: '#8884d8', // Line color matching marker color
        width: 3,
      },
      opacity: 0.9, // Set transparency level for the dataset
      hoverinfo: 'none', // Display information from text on hovering
      hovertemplate:
        '<b>Індекс:</b> %{x}<br><b>Коеф. кореляції:</b> %{y}<br><extra></extra>', // Custom hover template for displaying x and y values
    },
    {
      // Second dataset configuration
      y: data2, // Array of y-axis values for the second dataset
      name: data1 && data2 && legendNames().name2,
      type: 'scattergl',
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
      opacity: 0.9,
      hoverinfo: 'none',
      hovertemplate:
        '<b>Індекс:</b> %{x}<br><b>Коеф. кореляції:</b> %{y}<br><extra></extra>',
    },
  ] as Data[];

  const plotLayout = {
    title: {
      text: 'Автокореляційний графік', // Title of the plot
      font: {
        // Font size, color, family and weight for the title
        size: 24,
        color: '#18181b',
        family: 'Inter',
        weight: 'bold',
      },
    },
    // Configuration for the X-axis
    xaxis: {
      title: {
        text: 'Індекс', // Title of the X-axis
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
    },
    // Configuration for the Y-axis
    yaxis: {
      title: {
        text: 'Коефіцієнт кореляції', // Title of the Y-axis
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
      range: [xAxisLimit, yAxisLimit], // Range for the Y-axis
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
    showlegend: !!(data1 && data2), // Show legend only if both datasets are present
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
});

CorrelationChart.displayName = 'CorrelationChart'; // For DevTools
export default CorrelationChart;
