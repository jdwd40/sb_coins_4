import React from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  BoxProps,
} from '@chakra-ui/react';
import { MarketData } from '../types';

interface MarketStatsProps extends BoxProps {
  marketData: MarketData;
}

const MarketStats = ({ marketData, ...props }: MarketStatsProps) => {
  const stats = [
    {
      label: 'Market Total',
      value: `$${parseInt(marketData.marketTotal).toLocaleString()}`,
      change: parseFloat(marketData.percentage5mins || '0'),
    },
    {
      label: 'Market Event',
      value: marketData.currentEvent?.type.toUpperCase() || 'None',
      subtext: marketData.currentEvent
        ? `Ends ${new Date(marketData.currentEvent.end_time).toLocaleTimeString()}`
        : undefined,
    },
  ];

  return (
    <Box bg="white" p={6} rounded="lg" shadow="sm" {...props}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {stats.map((stat) => (
          <Stat key={stat.label}>
            <StatLabel>{stat.label}</StatLabel>
            <StatNumber>{stat.value}</StatNumber>
            {stat.change !== undefined && (
              <StatHelpText>
                <StatArrow type={stat.change >= 0 ? 'increase' : 'decrease'} />
                {Math.abs(stat.change)}%
              </StatHelpText>
            )}
            {stat.subtext && (
              <StatHelpText>{stat.subtext}</StatHelpText>
            )}
          </Stat>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MarketStats;