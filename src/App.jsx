import { BrowserRouter } from 'react-router-dom';
import Routing from './Component/Routing';
import Layout from "./Component/Layout";

function App() {

  return (
    <>
      <BrowserRouter>
      <Layout>
         <Routing />
         </Layout>
      </BrowserRouter>
    </>
  )
};

export default App;
