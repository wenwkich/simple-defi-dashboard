import { useToast } from "@chakra-ui/react";

export function useErrorToast() {
  const toast = useToast();

  return (error: any) => {
    return toast({
      title: "Error",
      description: error.message || "Something went wrong",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "bottom-right",
    });
  };
}
