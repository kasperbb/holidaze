import { formatDate } from '@utils/formatDate'
import { getDatesArray } from '@utils/date'

export const getLineChartOptions = (days = 14) => ({
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: 'dark',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth' as const,
  },
  xaxis: {
    type: 'category' as const,
    categories: getDatesArray(days).map(date => formatDate(date, { weekday: undefined })),
    labels: {
      style: {
        colors: '#c8cfca',
        fontSize: '12px',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#c8cfca',
        fontSize: '12px',
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ['#2650D9', '#4FD1C5', '#2D3748', '#E69319'],
  },
  colors: ['#2650D9', '#4FD1C5', '#2D3748', '#E69319'],
})
