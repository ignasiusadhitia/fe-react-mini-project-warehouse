import React from 'react';

import PropTypes from 'prop-types';

const RecentActivity = ({ activities }) => {
  return (
    <ul>
      {activities?.map((activity, index) => (
        <li key={index}>{activity}</li>
      ))}
    </ul>
  );
};

RecentActivity.propTypes = {
  activities: PropTypes.array.isRequired,
};

export default RecentActivity;
