import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Spinner,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import PriceChart from '../components/PriceChart';
import CoinEvent from '../components/CoinEvent';
import TradeForm from '../components/TradeForm';

interface CoinDetails {
  coin_id: number;
  name: string;
  symbol: string;
  current_price: string;
  supply: string;
  market_cap: string;
  description: string;
  priceHistory: Array<{
    history_id: number;
    price: string;
    timestamp: string;
  }>;
  allTimeHigh: string;
  allTimeLow: string;
  medianAverage: string;
  meanAverage: string;
  last5minsValue: string;
  percentage5mins: string;
  last10minsValue: string;
  percentage10mins: string;
  last30minsValue: string;
  percentage30mins: string;
  eventDuration?: string;
  eventType?: string;
  coinEventPositive?: boolean;
  eventImpact?: 'low' | 'medium' | 'high';
}

const fetchCoinDetails = async (id: string): Promise<CoinDetails> => {
  const { data } = await axios.get(`http://jdwd40.com/api/coins/${id}`);
  return data;
};

const CoinDetails = () => {
  const { id } = useParams<{ id: string }>();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const { data: coin, isLoading, error } = useQuery(
    ['coin', id],
    () => fetchCoinDetails(id!),
    {
      enabled: !!id,
      refetchInterval: 30000,
    }
  );

  if (isLoading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" color="brand.500" />
      </Box>
    );
  }

  if (error || !coin) {
    return (
      <Box textAlign="center" py={20}>
        <Text color="red.500">Error loading coin data</Text>
      </Box>
    );
  }

  const priceChange5m = parseFloat(coin.percentage5mins);
  const priceChange10m = parseFloat(coin.percentage10mins);
  const priceChange30m = parseFloat(coin.percentage30mins);

  return (
    <Container maxW="7xl">
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        <GridItem>
          <Box bg={bgColor} p={6} rounded="lg" shadow="sm" borderColor={borderColor} borderWidth={1} mb={8}>
            <Heading size="lg" mb={2}>
              {coin.name}{' '}
              <Badge colorScheme="brand" fontSize="md">
                {coin.symbol}
              </Badge>
            </Heading>
            <Text color="gray.600" mb={6}>
              {coin.description}
            </Text>

            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
              <Stat>
                <StatLabel>Current Price</StatLabel>
                <StatNumber>${parseFloat(coin.current_price).toLocaleString()}</StatNumber>
                {priceChange5m !== 0 && (
                  <StatHelpText>
                    <StatArrow type={priceChange5m >= 0 ? 'increase' : 'decrease'} />
                    {Math.abs(priceChange5m)}% (5m)
                  </StatHelpText>
                )}
              </Stat>

              <Stat>
                <StatLabel>Market Cap</StatLabel>
                <StatNumber>${parseInt(coin.market_cap).toLocaleString()}</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Supply</StatLabel>
                <StatNumber>{parseInt(coin.supply).toLocaleString()}</StatNumber>
              </Stat>
            </Grid>
          </Box>

          <Box bg={bgColor} p={6} rounded="lg" shadow="sm" borderColor={borderColor} borderWidth={1} mb={8}>
            <Heading size="md" mb={6}>Price History</Heading>
            <Box h="400px">
              <PriceChart priceHistory={coin.priceHistory} />
            </Box>
          </Box>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            <Box bg={bgColor} p={6} rounded="lg" shadow="sm" borderColor={borderColor} borderWidth={1}>
              <Heading size="md" mb={6}>Price Statistics</Heading>
              <Grid templateColumns="1fr" gap={4}>
                <Stat>
                  <StatLabel>All Time High</StatLabel>
                  <StatNumber>${parseFloat(coin.allTimeHigh).toLocaleString()}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>All Time Low</StatLabel>
                  <StatNumber>${parseFloat(coin.allTimeLow).toLocaleString()}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Average Price (Mean)</StatLabel>
                  <StatNumber>${parseFloat(coin.meanAverage).toLocaleString()}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Average Price (Median)</StatLabel>
                  <StatNumber>${parseFloat(coin.medianAverage).toLocaleString()}</StatNumber>
                </Stat>
              </Grid>
            </Box>

            {coin.eventType && (
              <Box bg={bgColor} p={6} rounded="lg" shadow="sm" borderColor={borderColor} borderWidth={1}>
                <CoinEvent
                  type={coin.eventType}
                  duration={coin.eventDuration}
                  isPositive={coin.coinEventPositive}
                  impact={coin.eventImpact}
                />
              </Box>
            )}
          </Grid>
        </GridItem>

        <GridItem>
          <TradeForm coin={coin} />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default CoinDetails;