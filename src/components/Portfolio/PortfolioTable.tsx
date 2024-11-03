import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';
import { PortfolioItem } from '../../types';

interface PortfolioTableProps {
  portfolio: PortfolioItem[];
}

const PortfolioTable = ({ portfolio }: PortfolioTableProps) => {
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Asset</Th>
          <Th isNumeric>Amount</Th>
          <Th isNumeric>Price</Th>
          <Th isNumeric>Value</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {portfolio.map((item) => {
          const value = parseFloat(item.current_price) * parseFloat(item.amount);
          
          return (
            <Tr key={item.coin_id}>
              <Td>
                <HStack>
                  <Text fontWeight="medium">{item.name}</Text>
                </HStack>
              </Td>
              <Td isNumeric>
                <Text color={textColor}>
                  {parseFloat(item.amount).toLocaleString()}
                </Text>
              </Td>
              <Td isNumeric>
                <Text color={textColor}>
                  ${parseFloat(item.current_price).toLocaleString()}
                </Text>
              </Td>
              <Td isNumeric>
                <Text fontWeight="medium">
                  ${value.toLocaleString()}
                </Text>
              </Td>
              <Td>
                <IconButton
                  icon={<Trash2 size={16} />}
                  aria-label="Remove from portfolio"
                  variant="ghost"
                  colorScheme="red"
                  size="sm"
                />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default PortfolioTable;