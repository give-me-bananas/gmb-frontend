import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export type AlertData = {
  id: string;
  senderName: string;
  message: string;
  tipAmount: string;
};

export const useTipAlerts = (userId: string) => {
  const [currentAlert, setCurrentAlert] = useState<AlertData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertDataArr, setAlertDataArr] = useState<AlertData[]>();

  const fetchData = useCallback(async () => {
    const { data, status } = await axios.get<AlertData[]>(
      `/users/${userId}/alerts`,
    );
    if (status === 200) {
      setAlertDataArr(data);
    } else {
      console.error(`Error ${status}: ${data}`);
    }
  }, [userId]);

  useEffect(() => {
    const asyncFn = async () => {
      if (!isLoading) {
        setIsLoading(true);
        await fetchData();
        setIsLoading(false);
      }
    };

    const intervalHandle = setInterval(asyncFn, 5000);

    return () => {
      clearInterval(intervalHandle);
    };
  }, [fetchData, isLoading]);

  const getNextAlert = useCallback(async () => {
    // Dequeue the next alert and remove the alert from backend
    if (!alertDataArr || alertDataArr?.length === 0) {
      setCurrentAlert(undefined);
      return;
    }

    const nextAlert = alertDataArr[0];
    setIsLoading(true);

    const { data, status } = await axios.delete<AlertData>(
      `/users/${userId}/alerts/${nextAlert.id}`,
    );
    if (status !== 200) {
      console.error(`Error ${status}: ${data}`);
    }

    // Refetch data
    await fetchData();
    setIsLoading(false);
  }, [fetchData, alertDataArr, userId]);

  return { currentAlert, getNextAlert };
};
