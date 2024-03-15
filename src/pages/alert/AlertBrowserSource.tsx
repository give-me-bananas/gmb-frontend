import { LoaderFunction, useLoaderData } from "react-router-dom";

export const loader: LoaderFunction = ({ params }) => {
  const userId = params.userId;
  return { userId };
};

export const AlertBrowserSource = () => {
  const { userId } = useLoaderData() as { userId: string };
  
  return <div>{userId}</div>;
};
