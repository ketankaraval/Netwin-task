import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import FlexBox from './FlexBox';
import { logout } from '../slice/authSlice';

const headerHeight = 72;

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();

  return (
    <div
      style={{
        borderBottom: '1px solid #f4f4f4',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99,
          background: 'white',
          height: headerHeight,
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        }}
      >
        <Container>
          <FlexBox height={headerHeight} alignItems="center">
            <Box
              sx={{
                cursor: 'pointer',
                fontWeight: currentPath.includes('/product') ? 700 : 400,
              }}
              onClick={() => navigate('/products')}
            >
              Products
            </Box>
            <Box mx="auto" />
            <FlexBox className="right-links" alignItems="center">
              <Typography
                style={{
                  cursor: 'pointer',
                  transition: 'color 250ms ease-in-out',
                  color: currentPath.includes('add-product')
                    ? '#3c3c3c'
                    : 'grey.600',
                  padding: '0.25rem 1.25rem',
                  fontWeight: currentPath.includes('add-product') ? 700 : 400,
                }}
                onClick={() => navigate('/add-product')}
              >
                Create Product
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Logout
              </Button>
            </FlexBox>
          </FlexBox>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
