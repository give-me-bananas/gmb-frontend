import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AlertData, useTipAlerts } from "../../hooks/apis/useTipAlert";

const FullContainer = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: transparent;
`;

const AlertAnimatedBox = styled.div`
  max-height: 600px;
  max-width: 1280px;
  height: 600px;
  width: 1280px;
  display: flex;
  overflow: hidden;
  animation:
    fadein 0.5s,
    fadeout 0.5s 2.5s;
`;

const AlertImageBox = styled.div`
  height: 100%;
  width: 300px;
  min-width: 300px;
  max-height: 100%;
`;

const AlertImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const AlertContent = styled.div`
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AlertSenderName = styled.h1`
  font-family: "Rocher";
  font-size: 36px;
  margin: 16px;
`;

const AlertSenderMessage = styled.p`
  font-family: "Inter";
  font-size: 24px;
  margin: 16px;
  font-weight: bold;
  color: #ff9900;
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 3.6em;
`;

export const AlertBrowserSource = () => {
  const { userId } = useParams();
  const { hasAlerts, getNextAlert, markAlertAsRead } = useTipAlerts(
    userId ?? "",
  );
  const [currentAlert, setCurrentAlert] = useState<AlertData>();
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    const asyncFn = async () => {
      if (hasAlerts && currentAlert === undefined) {
        const newAlert = await getNextAlert();
        if (newAlert) {
          setCurrentAlert(newAlert);
          setFlag(true);
          markAlertAsRead(newAlert.id);

          setTimeout(() => {
            setFlag(false);
            setCurrentAlert(undefined);
          }, 3000);
        }
      }
    };
    asyncFn();
  }, [hasAlerts, getNextAlert, currentAlert, markAlertAsRead]);
  return (
    <FullContainer>
      {flag ? (
        <AlertAnimatedBox>
          <AlertImageBox>
            <AlertImage src="/img/good_banana.svg" />
          </AlertImageBox>

          <AlertContent>
            <AlertSenderName>
              {currentAlert?.senderName} gave you bananas for{" "}
              {currentAlert?.tipAmount}
            </AlertSenderName>
            <AlertSenderMessage>{currentAlert?.message}</AlertSenderMessage>
          </AlertContent>
        </AlertAnimatedBox>
      ) : (
        <></>
      )}
    </FullContainer>
  );
};
