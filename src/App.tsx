import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

import NavWithWallet from "./components/nav/NavWithWallet";
import { ChakraProvider } from "@chakra-ui/react";
import StakingRoutes from "./StakingRoutes";
import { getDefaultProvider } from "ethers";
import { Config, DAppProvider, Mainnet } from "@usedapp/core";
import { config } from "./utils/constants/chains";

const AppWrapper = ({ children }: PropsWithChildren<any>) => {
  return <div className="flex flex-col h-screen">{children}</div>;
};

const BodyWrapper = ({ children }: PropsWithChildren<any>) => {
  return (
    <div className="flex justify-center py-10 flex-grow bg-[#FAFAFA]">
      {children}
    </div>
  );
};

function App() {
  const queryClient = new QueryClient();

  return (
    <DAppProvider config={config}>
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
    </DAppProvider>
  );
}

export default App;
