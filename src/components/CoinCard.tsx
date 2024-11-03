import React from 'react';
import { Box, Flex, Heading, Text, Badge, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Coin } from '../types';

interface CoinCardProps {
  coin: Coin;
}

const CoinCard = ({ coin }: CoinCardProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const priceChange = parseFloat(coin.percentage5mins || '0');
  const isPositive = priceChange >= 0;

  return (
    <Box
      as={RouterLink}
      to={`/coin/${coin.coin_id}`}
      p={6}
      bg={bgColor}
      border="1px"
      borderColor={borderColor}
      rounded="lg"
      shadow="sm"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">{coin.name}</Heading>
        <Badge colorScheme="brand">{coin.symbol}</Badge>
      </Flex>

      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        ${parseFloat(coin.current_price).toLocaleString()}
      </Text>

      <Flex justify="space-between" align="center">
        <Text color="gray.600">Market Cap</Text>
        <Text fontWeight="medium">
          ${parseInt(coin.market_cap).toLocaleString()}
        </Text>
      </Flex>

      {priceChange !== 0 && (
        <Flex align="center" mt={4} color={isPositive ? 'green.500' : 'red.500'}>
          {isPositive ? (
            <TrendingUp size={16} className="mr-1" />
          ) : (
            <TrendingDown size={16} className="mr-1" />
          )}
          <Text fontWeight="medium">{Math.abs(priceChange)}%</Text>
        </Flex>
      )}
    </Box>
  );
};

export default CoinCard;