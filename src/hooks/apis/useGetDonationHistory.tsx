import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_CORE_API_URL;

export type DonationHistoryResponse = {
  streamer: string;
  donor: string;
  donorName: string | null;
  message: string | null;
  netDonation: string;
  commission: string;
};

export const useGetDonationHistory = (smartAccountAddress?: string) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<DonationHistoryResponse[]>([]);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const asyncFn = async () => {
      if (!isLoading && smartAccountAddress) {
        setIsLoading(true);
        const res = await axios.get<DonationHistoryResponse[]>(
          `${BASE_URL}/donations?streamer=${smartAccountAddress}`,
        );
        if (res.status === 200) {
          setData(res.data);
          setIsSuccess(true);
          setError(null);
        } else {
          setIsSuccess(false);
          setError(res.data);
        }
        setIsLoading(false);
      }
    };
    const handle = setInterval(asyncFn, 2000);
    return () => {
      clearInterval(handle);
    };
  }, [smartAccountAddress, isLoading]);

  return {
    data,
    isSuccess,
    isLoading,
    error,
  };
};
