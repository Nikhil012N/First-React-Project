import React from 'react';
import "../reg.css"
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
function Header() {
  const navigate = useNavigate();
  const displayPicture = localStorage.getItem('myDp');
  const logOut = () => {
    localStorage.clear();
    navigate("/login");

  }
  return (
    <>
      <header>
        <nav>
          <ul id="headerul">
            {localStorage?.getItem('username') &&
              <>

                <li>
                  <img src={"data:image/png;base64,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"} height="40" width="40" alt="logo" />
                </li>
                <li>
                  <Link to='/home' >Home</Link>
                </li>
                <li>
                  <Link to="/products ">Products </Link>
                </li>
                <li>
                  <Link to="/pichart ">Chart </Link>
                </li>
                <li>
                  <Link to="/form ">Formik </Link>
                </li>
                <div style={{ float: 'right' }}>
                  <li>
                    <Button size="small">
                      <img src={displayPicture} alt="Uploaded photographs" crossOrigin="anonymous" width={35} height={35} />
                    </Button>
                    <Button size="large">{localStorage?.getItem('username')}</Button>&nbsp;&nbsp;<Button variant='outlined' onClick={logOut}>Logout</Button>
                  </li>
                </div>
              </>
            }
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;