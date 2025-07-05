import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip)

export default function BedStatsChart() {
  const chartData = {
    labels: ['Available', 'Occupied', 'Emergency'],
    datasets: [
      {
        label: 'Bed Count',
        data: [53, 102, 24],
        backgroundColor: ['#64bcae', '#ef4444', '#f59e0b'],
        borderRadius: 6,
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold text-[#132d2e] mb-2">📊 Bed Occupancy</h3>
      <Bar data={chartData} />
    </div>
  )
}
