import axios from "axios";
import { useCallback, useState } from "react";

const BASE_URL = import.meta.env.VITE_CORE_API_URL;

export const useUpdateRegisteredSmartAccount = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const updateRegisteredSmartAccount = useCallback(
    async (eoaAddress: string, smartAccountAddress: string) => {
      if (!isLoading) {
        setIsLoading(true);
        const res = await axios.post(`${BASE_URL}/address-mapping`, {
          address: eoaAddress,
          smartAccountAddress,
        });
        if (res.status === 200) {
          setIsSuccess(true);
          setError(null);
        } else {
          setIsSuccess(false);
          setError(res.data);
        }
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  return {
    isSuccess,
    isLoading,
    error,
    updateRegisteredSmartAccount,
  };
};
