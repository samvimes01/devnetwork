import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../action/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = ({ auth: { user }, profile: { profile, loading }, getCurrentProfile }) => {
useEffect(() => {
  getCurrentProfile();
}, [])

  return loading && profile === null ? <Spinner /> : (
  <>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className="lead">
      <i className="fas fa-user">Welcome {user && user.name}</i>
    </p>
    {profile !== null ? (
      <DashboardActions />
    ) : (
      <>
      <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
      </>
    )}
  </>)
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
