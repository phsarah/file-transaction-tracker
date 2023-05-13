import Router from './route/Router'
import { ChakraProvider, theme } from '@chakra-ui/react';


function App() {
  return (
    <div>
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>

    </div>
  );
}

export default App;