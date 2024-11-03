import React from 'react';
import {
  Box,
  Heading,
  Text,
  Badge,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface CoinEventProps {
  type: string;
  duration?: string;
  isPositive?: boolean;
  impact?: 'low' | 'medium' | 'high';
}

const CoinEvent = ({ type, duration, isPositive, impact }: CoinEventProps) => {
  const getImpactColor = () => {
    switch (impact) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Heading size="md" mb={2}>Current Event</Heading>
      
      <Box>
        <Badge colorScheme={getImpactColor()} mb={2}>
          {impact?.toUpperCase()} IMPACT
        </Badge>
        
        <Text fontSize="lg" fontWeight="medium" mb={2}>
          {isPositive ? (
            <TrendingUp className="inline mr-2" size={20} color="green" />
          ) : (
            <TrendingDown className="inline mr-2" size={20} color="red" />
          )}
          {type}
        </Text>
        
        {duration && (
          <Text color="gray.600" fontSize="sm">
            Duration: {duration}
          </Text>
        )}
      </Box>
    </VStack>
  );
};

export default CoinEvent;