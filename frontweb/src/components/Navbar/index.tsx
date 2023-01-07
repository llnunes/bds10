import './styles.css';
import 'bootstrap/js/src/collapse.js';

import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import { useContext } from 'react';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';
import history from 'util/history';



const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h4>MovieFlix</h4>
        </Link>              

        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <>              
              <a href="#logout" onClick={handleLogoutClick}>
                <span className="sair-text">SAIR</span>
              </a>
            </>
          ) : (<></>)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
