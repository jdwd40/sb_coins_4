import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useUserFunds } from '../hooks/useUserFunds';

interface TradeFormProps {
  coin: {
    coin_id: number;
    name: string;
    current_price: string;
  };
}

const TradeForm = ({ coin }: TradeFormProps) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState<string>('');
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: funds } = useUserFunds(user?.id);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const createTransaction = async (data: any) => {
    const response = await axios.post('http://jdwd40.com/api/transactions', data);
    return response.data;
  };

  const { mutate: executeTrade, isLoading } = useMutation(createTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(['userFunds', user?.id]);
      queryClient.invalidateQueries(['portfolio', user?.id]);
      toast({
        title: 'Trade executed successfully',
        status: 'success',
        duration: 3000,
      });
      setAmount('');
    },
    onError: (error: any) => {
      toast({
        title: 'Trade failed',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
      });
    },
  });

  const handleTrade = (type: 'buy' | 'sell') => {
    if (!user || !amount) return;

    const tradeAmount = parseFloat(amount);
    const price = parseFloat(coin.current_price);
    const totalCost = tradeAmount * price;

    if (type === 'buy' && totalCost > parseFloat(funds?.funds || '0')) {
      toast({
        title: 'Insufficient funds',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    executeTrade({
      user_id: user.id,
      coin_id: coin.coin_id,
      type,
      amount: tradeAmount,
      price: coin.current_price,
    });
  };

  if (!user) {
    return (
      <Box bg={bgColor} p={6} rounded="lg" shadow="sm" borderColor={borderColor} borderWidth={1}>
        <Text>Please sign in to trade</Text>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} p={6} rounded="lg" shadow="sm" borderColor={borderColor} borderWidth={1}>
      <VStack spacing={6}>
        <Text fontSize="xl" fontWeight="bold">Trade {coin.name}</Text>
        
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <NumberInput
            value={amount}
            onChange={(value) => setAmount(value)}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        {amount && (
          <Text>
            Total: ${(parseFloat(amount) * parseFloat(coin.current_price)).toLocaleString()}
          </Text>
        )}

        <VStack spacing={4} w="full">
          <Button
            colorScheme="green"
            w="full"
            onClick={() => handleTrade('buy')}
            isLoading={isLoading}
          >
            Buy
          </Button>
          <Button
            colorScheme="red"
            w="full"
            onClick={() => handleTrade('sell')}
            isLoading={isLoading}
          >
            Sell
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default TradeForm;