import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

export type AlertData = {
  id: string;
  senderName: string;
  message: string;
  tipAmount: string;
};

const BASE_URL = import.meta.env.VITE_ALERT_API_URL;

export const useTipAlerts = (userId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertDataArr, setAlertDataArr] = useState<AlertData[]>([]);

  const fetchData = useCallback(async () => {
    const { data, status } = await axios.get<{
      user: string;
      alerts: AlertData[];
    }>(`${BASE_URL}/users/${userId}/alerts`);
    if (status === 200) {
      setAlertDataArr(data.alerts);
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
    if (alertDataArr.length === 0) {
      return;
    }

    const nextAlert = alertDataArr[0];
    return nextAlert;
  }, [alertDataArr]);

  const markAlertAsRead = useCallback(
    async (alertId: string) => {
      const nextAlert = alertDataArr[0];
      setIsLoading(true);

      const { data, status } = await axios.delete<AlertData>(
        `${BASE_URL}/users/${userId}/alerts/${alertId}`,
      );
      if (status !== 204) {
        console.error(`Error ${status}: ${data}`);
      }

      // Refetch data
      await fetchData();
      setIsLoading(false);
      return nextAlert;
    },
    [fetchData, alertDataArr, userId],
  );

  const hasAlerts = useMemo(
    () => !isLoading && alertDataArr.length > 0,
    [isLoading, alertDataArr],
  );

  return { hasAlerts, getNextAlert, markAlertAsRead };
};
