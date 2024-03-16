import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_CORE_API_URL;

type RegisteredSmartAccount = {
  smartAccountAddress: string;
};

export const useGetRegisteredSmartAccount = (eoaAddress: string) => {
  const [smartAccountAddress, setSmartAccountAddress] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const asyncFn = async () => {
      if (eoaAddress && !isLoading) {
        setIsLoading(true);
        const res = await axios.get<RegisteredSmartAccount>(
          `${BASE_URL}/smart-account/${eoaAddress}`,
        );
        if (res.status === 200) {
          setSmartAccountAddress(res.data.smartAccountAddress);
        }
        setIsLoading(false);
      }
    };
    asyncFn();
  }, [eoaAddress, isLoading]);

  return smartAccountAddress;
};
