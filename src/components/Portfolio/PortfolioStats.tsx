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
  useColorModeValue,
} from '@chakra-ui/react';

interface PortfolioStatsProps extends BoxProps {
  totalValue: number;
}

const PortfolioStats = ({ totalValue, ...props }: PortfolioStatsProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={bgColor} p={6} rounded="lg" shadow="sm" borderColor={borderColor} borderWidth={1} {...props}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Stat>
          <StatLabel>Total Portfolio Value</StatLabel>
          <StatNumber>${totalValue.toLocaleString()}</StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
};

export default PortfolioStats;