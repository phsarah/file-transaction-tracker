import { Box, Text } from '@chakra-ui/react';

const ProducerItem = ({ producer }) => {
  return (
    <Box key={producer.seller} mb={4}>
      <Text fontWeight="bold">{producer.seller}</Text>
      <Text>
        Valor: {Number(producer.total / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Text>
    </Box>
  );
};

export default ProducerItem;
