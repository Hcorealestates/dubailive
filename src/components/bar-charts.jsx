"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
export default function BarCharts({ chartData }) {

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-primary-700/60 flex flex-col *:py-0.5">
          <div className='font-semibold'>{label}</div>
          <div>{`Volume : ${payload[0].value}`}</div>
          <div>{`Sales AED ${payload[1].value} B`}</div>
        </div>
      );
    }
    return null;
  };

  return <><ResponsiveContainer width={"100%"} height={350}>
    <BarChart
      data={chartData}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      {/* <Legend /> */}
      <Bar
        dataKey="Volume"
        fill="#00843d"
      // activeBar={<Rectangle fill="pink" stroke="blue" />}
      >
        <LabelList position={'top'} dataKey="name" />
      </Bar>
      <Bar
        dataKey="Sales"
        fill="#00843d"
      />
      <Legend verticalAlign="bottom" height={36} />
    </BarChart>
  </ResponsiveContainer>
  </>
}