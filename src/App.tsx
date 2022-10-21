import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

import NavWithWallet from "./components/nav/NavWithWallet";
import { ChakraProvider } from "@chakra-ui/react";
import StakingRoutes from "./StakingRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ChakraProvider>
          <AppWrapper>
            <NavWithWallet />
            <BodyWrapper>
              <StakingRoutes />
            </BodyWrapper>
          </AppWrapper>
        </ChakraProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
