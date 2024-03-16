import { LoaderFunction } from "react-router-dom";
import styled from "@emotion/styled";
// import { useState } from "react";

export const loader: LoaderFunction = ({ params }) => {
  const userId = params.userId;
  return { userId };
};

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
`;

const AlertImageBox = styled.div`
  height: 100%;
  width: 300px;
  padding: 16px;
`;

const AlertImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const AlertContent = styled.div`
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const AlertBrowserSource = () => {
  // const { userId } = useLoaderData() as { userId: string };
  // const [flag, setFlag] = useState<boolean>();

  return (
    <FullContainer>
      <AlertAnimatedBox>
        <AlertImageBox>
          <AlertImage src="/img/good_banana.svg" />
        </AlertImageBox>

        {/* <div height={"100%"} p={8} justifyItems={"center"}> */}
        <AlertContent>
          <h1>WK</h1>
          <p>"Lmao that's a good banana"</p>
        </AlertContent>
      </AlertAnimatedBox>
    </FullContainer>
  );
};
