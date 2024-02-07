import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const FlexBox = ({ children, ...props }) => (
  <Box display="flex" {...props}>
    {children}
  </Box>
);

FlexBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FlexBox;
