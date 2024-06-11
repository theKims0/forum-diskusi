import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({ signOut }) {
  return (
    <div className="head-app">
      <nav>
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/thread">Thread</Link>
        <button type="button" className="button-primary" onClick={signOut}>Sign out</button>
      </nav>
    </div>
  );
}

Navigation.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
