import { useToast } from "@chakra-ui/react";
import { Transaction } from "ethers";

export function useTxSuccessToast() {
  const toast = useToast();

  return (tx: Transaction) => {
    toast({
      title: "Transaction success",
      description: `tx id ${tx.hash} is successful`,
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "bottom-right",
    });
  };
}
