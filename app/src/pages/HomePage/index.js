import { useState, useEffect } from 'react';

import { ArrowBackIcon } from '@chakra-ui/icons';
import { Container, Text, Center, Box, Heading, FormControl, FormLabel, Button, Spinner, Icon, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

import TransactionItem from '../../components/transactionItem'
import AffiliateItem from '../../components/affiliateItem'
import ProducerItem from '../../components/producerItem'

import SalesManagerService from "../../services/SalesManagerService";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [producer, setProducer] = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('upload');

  const [alertMessage, setAlertMessage] = useState(null);
  const [alertStatus, setAlertStatus] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const salesManagerService = new SalesManagerService();
        const response = await salesManagerService.fetchTransactions();

        setTransactions(response);
      } catch (error) {
        console.error({
          message: "Erro ao carregar as transações",
          data: error
        });
      }
    };

    fetchTransactions();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setAlertMessage('Por favor, selecione um arquivo para fazer o upload!');
      setAlertStatus('warning');
      return;
    }

    setIsLoading(true);

    try {
      const salesManagerService = new SalesManagerService();
      await salesManagerService.uploadFile(file);

      const response = await salesManagerService.fetchTransactions();
      setTransactions(response);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setAlertMessage('Arquivo enviado com sucesso!');
      setAlertStatus('success');

      setFile(null);
      goToListPage('list');
    } catch (error) {
      setAlertMessage('Ocorreu um erro ao enviar o arquivo. Por favor, tente novamente.');
      setAlertStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = async (productName) => {
    const salesManagerService = new SalesManagerService();
    const producer = await salesManagerService.fetchTotalProducerBalance(productName);
    const affiliates = await salesManagerService.fetchTotalAffiliateBalance(productName);

    setProducer(producer);
    setAffiliates(affiliates)

    setCurrentPage('totalBalance');
  };

  const goToUploadPage = () => {
    setCurrentPage('upload');
  };

  const goToListPage = () => {
    setCurrentPage('list')
  };


  return (
    <Center height="100vh" bgColor={'green.50'}>
      <Container maxWidth="md">
        <Box
          bg="white"
          boxShadow="md"
          p={8}
          borderRadius="lg"
          textAlign="center"
        >
          {currentPage === 'upload' && (
            <>
              <Heading size="lg" mb={8}>
                Upload de Transações de Venda
              </Heading>
              {alertMessage && (
                <Alert status={alertStatus} mb={4}>
                  <AlertIcon />
                  <AlertTitle>{alertMessage}</AlertTitle>
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel mt={10} htmlFor="file">Selecione um arquivo</FormLabel>
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    accept=".txt"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file">
                    <Button as="span" width="full" color="white"
                      bgColor={"teal"}>
                      {file ? file.name : 'Selecionar arquivo'}
                    </Button>
                  </label>
                </FormControl>
                <Button
                  mt={6}
                  color="white"
                  bgColor={"teal"}
                  type="submit"
                  width="full"
                  isLoading={isLoading}
                  loadingText="Enviando..."
                  spinnerPlacement="end"
                  loadingSpinner={<Spinner color="black" size="sm" />}
                  fontSize="md"
                  fontWeight="bold"
                >
                  Enviar
                </Button>
              </form>
              <Button mt={4} onClick={goToListPage}>
                Ir para a lista de transações
              </Button>
            </>
          )}

          {currentPage === 'list' && (
            <>
              <Heading size="lg" mb={8}>
                Lista de Transações
              </Heading>
              <Box p={4} bg="white" boxShadow="md" borderRadius="lg">
                {Array.isArray(transactions) && transactions.length > 0 ? (
                  <Box
                    p={4}
                    bg="white"
                    borderRadius="lg"
                    maxHeight="300px"
                    overflowY="auto"
                    my={4}
                  >
                    {transactions.map((transaction) => (
                      <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                        handleProductClick={handleProductClick}
                      />
                    ))}
                  </Box>
                ) : (
                  <Text>Não há transações disponíveis.</Text>
                )}
              </Box>
              <Button
                mt={4}
                onClick={goToUploadPage}
                leftIcon={<Icon as={ArrowBackIcon} />}>
                Voltar para Upload
              </Button>
            </>
          )}

          {currentPage === 'totalBalance' && (
            <>
              <Heading size="lg" mb={8}>
                Produtor e Afiliados
              </Heading>
              <Box p={4} bg="white" boxShadow="md" borderRadius="lg">
                {producer.map((producer) => (
                  <ProducerItem key={producer.seller} producer={producer} />
                ))}
                <Heading size="md" mb={5}>
                  Afiliados
                </Heading>
                {affiliates.map((affiliate) =>
                (
                  <AffiliateItem key={affiliate.seller} affiliate={affiliate} />
                ))}
              </Box>
              <Button mt={4} onClick={goToListPage} leftIcon={<Icon as={ArrowBackIcon} />}>

                Voltar para a lista de transações
              </Button>
            </>
          )}

        </Box>
      </Container>
    </Center>
  );
};

export default HomePage





