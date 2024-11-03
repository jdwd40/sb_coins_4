import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useColorModeValue } from '@chakra-ui/react';

interface PriceHistory {
  history_id: number;
  price: string;
  timestamp: string;
}

interface PriceChartProps {
  priceHistory: PriceHistory[];
}

const PriceChart = ({ priceHistory }: PriceChartProps) => {
  const lineColor = useColorModeValue('brand.500', 'brand.200');
  const gridColor = useColorModeValue('gray.200', 'gray.700');

  const data = priceHistory.map(item => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    price: parseFloat(item.price),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="timestamp"
          tick={{ fontSize: 12 }}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          domain={['auto', 'auto']}
          tickFormatter={(value) => `$${value.toFixed(2)}`}
        />
        <Tooltip
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke={lineColor}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;