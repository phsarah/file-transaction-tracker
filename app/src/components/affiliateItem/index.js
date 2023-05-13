import { Box, Text } from '@chakra-ui/react';

const AffiliateItem = ({ affiliate }) => {
  return (
    <Box key={affiliate.seller} mb={4}>
      <Text fontWeight="bold">{affiliate.seller}</Text>
      <Text>
        Valor: {Number(affiliate.total / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Text>
    </Box>
  );
};

export default AffiliateItem;
