import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  HStack,
  Select,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';
import { useQuery } from 'react-query';
import axios from 'axios';
import PortfolioStats from '../components/Portfolio/PortfolioStats';
import PortfolioTable from '../components/Portfolio/PortfolioTable';
import { useAuth } from '../contexts/AuthContext';
import { PortfolioItem } from '../types';

const fetchPortfolio = async (userId: string) => {
  const { data } = await axios.get(`http://jdwd40.com/api/portfolios/${userId}`);
  return data;
};

const Portfolio = () => {
  const { user } = useAuth();
  const [sortField, setSortField] = useState<string>('value');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const { data, isLoading, error } = useQuery(
    ['portfolio', user?.id],
    () => fetchPortfolio(user!.id),
    {
      enabled: !!user?.id,
      refetchInterval: 30000,
    }
  );

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedPortfolio = React.useMemo(() => {
    if (!data) return [];
    const portfolio = data.filter((item: any) => !('totalValue' in item)) as PortfolioItem[];
    
    return [...portfolio].sort((a, b) => {
      const aValue = sortField === 'value' 
        ? parseFloat(a.current_price) * parseFloat(a.amount)
        : sortField === 'price' 
          ? parseFloat(a.current_price)
          : parseFloat(a.amount);
          
      const bValue = sortField === 'value'
        ? parseFloat(b.current_price) * parseFloat(b.amount)
        : sortField === 'price'
          ? parseFloat(b.current_price)
          : parseFloat(b.amount);

      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }, [data, sortField, sortDirection]);

  const totalValue = React.useMemo(() => {
    if (!data) return 0;
    const portfolio = data.filter((item: any) => !('totalValue' in item)) as PortfolioItem[];
    return portfolio.reduce((sum, item) => 
      sum + (parseFloat(item.current_price) * parseFloat(item.amount)), 0
    );
  }, [data]);

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
        <Text color="red.500">Error loading portfolio data</Text>
      </Box>
    );
  }

  return (
    <Container maxW="7xl">
      <Heading mb={8} size="lg">My Portfolio</Heading>
      
      <PortfolioStats totalValue={totalValue} mb={8} />

      <Box bg={useColorModeValue('white', 'gray.800')} rounded="lg" shadow="sm" overflow="hidden">
        <HStack p={4} spacing={4} borderBottom="1px" borderColor={useColorModeValue('gray.200', 'gray.700')}>
          <Select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            w="auto"
            size="sm"
          >
            <option value="value">Sort by Value</option>
            <option value="price">Sort by Price</option>
            <option value="amount">Sort by Amount</option>
          </Select>
          
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<ArrowUpDown size={16} />}
            onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
          >
            {sortDirection.toUpperCase()}
          </Button>
        </HStack>

        <PortfolioTable portfolio={sortedPortfolio} />
      </Box>
    </Container>
  );
};

export default Portfolio;