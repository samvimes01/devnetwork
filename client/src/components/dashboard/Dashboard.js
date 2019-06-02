import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ auth: { user }, profile: { profile, loading }, getCurrentProfile }) => {
useEffect(() => {
  getCurrentProfile();
}, [getCurrentProfile])

  return loading && profile === null ? <Spinner /> : (
  <>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className="lead">
      <i className="fas fa-user">Welcome {user && user.name}</i>
    </p>
    {profile !== null ? (
      <>
      <DashboardActions />
      <Experience experience={profile.experience} />
      <Education education={profile.education} />
      <div className="my-2">
        <button className="btn btn-danger" onClick={() => deleteAccount()}>
          <i className="fas fa-user-minus"></i> Delete account
        </button>
      </div>
      </>
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
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
