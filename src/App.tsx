import { ChakraProvider } from "@chakra-ui/react";

// import { Home } from "./components/home";
import "./App.css";
import { Routes } from 'react-router-dom';

function App() {

  return (
    <ChakraProvider>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="about" element={<About />} /> */}
      </Routes>           
    </ChakraProvider>
  );
}

export default App;
