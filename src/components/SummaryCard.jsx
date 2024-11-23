import React from 'react';

import PropTypes from 'prop-types';

const SummaryCard = ({ title, value }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default SummaryCard;
