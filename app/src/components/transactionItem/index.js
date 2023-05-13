import { Box, Text } from '@chakra-ui/react';
import { format } from 'date-fns';

const TransactionItem = ({ transaction, handleProductClick }) => {
  return (
    <Box key={transaction.id} mb={4}>
      <Text>Tipo: {transaction.typeId}</Text>
      <Text fontWeight="bold">Vendedor: {transaction.seller}</Text>
      <Text>
        Produto:
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => handleProductClick(transaction.product)}
        >
          {transaction.product}
        </span>
      </Text>
      <Text>
        Valor: {Number(transaction.value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Text>
      <Text>Data: {format(new Date(transaction.date), 'dd/MM/yyyy')}</Text>
    </Box>
  );
};

export default TransactionItem;
