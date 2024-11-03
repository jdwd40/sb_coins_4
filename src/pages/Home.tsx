import React from 'react';
import { Box, Container, Heading, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import CoinCard from '../components/CoinCard';
import MarketStats from '../components/MarketStats';
import { Coin, MarketData } from '../types';

const fetchCoins = async () => {
  const { data } = await axios.get('http://jdwd40.com/api/coins');
  return data;
};

const Home = () => {
  const { data, isLoading, error } = useQuery<(Coin | MarketData)[]>('coins', fetchCoins, {
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" color="brand.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={20}>
        <Text color="red.500">Error loading market data</Text>
      </Box>
    );
  }

  const coins = data?.filter((item): item is Coin => 'symbol' in item) || [];
  const marketData = data?.find((item): item is MarketData => 'marketTotal' in item);

  return (
    <Container maxW="7xl">
      <Heading mb={8} size="lg">Crypto Market</Heading>
      
      {marketData && <MarketStats marketData={marketData} mb={8} />}

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {coins.map((coin) => (
          <CoinCard key={coin.coin_id} coin={coin} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Home;