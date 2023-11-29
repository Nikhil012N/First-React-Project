import React, { createContext ,useState} from 'react'
import Header from './Header';
import Footer from './Footer';
export const colorApi=createContext();
const Layout = ({children}) => {
  const [theme, setTheme] = useState('white');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'white' ? 'black' : ''));
  };

  return (
  <>

  <Header/>
  {children}
<br/><br/><br/>
  <Footer/>
  </>
  )
};
export default Layout;