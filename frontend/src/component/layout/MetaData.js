import React from 'react';
import Helmet from 'react-helmet';

const MetaData = ({ heading }) => {
  return (
    <Helmet>
      <title>{heading}</title>
    </Helmet>
  );
}

export default MetaData;
