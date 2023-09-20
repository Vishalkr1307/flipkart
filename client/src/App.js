import { useColorModeValue,Box } from '@chakra-ui/react';
import { AllRoute } from './page/AllRoute';

function App() {
  const bgColor=useColorModeValue("gray.50","gray.900")
  return (
    < >
    <AllRoute/>
    </>
  );
}

export default App;
