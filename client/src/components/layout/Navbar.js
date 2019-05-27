import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logout } from '../../action/auth';

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
    <li><a href="/dashboard">
      <i className="fas fa-user"></i>{' '}
      <span className="hide-sm">Developers</span></a></li>
      <li><a onClick={logout} href="#!">
        <i className="fas fa-sign-out-alt"></i>{' '}
        <span className="hide-sm">Logout</span>
      </a></li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      { !loading && (<>{ isAuthenticated? authLinks : guestLinks }</>)  }
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
