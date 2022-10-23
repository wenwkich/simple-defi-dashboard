import { useToast } from "@chakra-ui/react";
import { Transaction } from "ethers";

export function useTxSubmittedToast() {
  const toast = useToast();

  return (tx: Transaction) => {
    toast({
      title: "Transaction submitted to the blockchain",
      description: `tx id ${tx.hash} is submitted`,
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
  };
}
