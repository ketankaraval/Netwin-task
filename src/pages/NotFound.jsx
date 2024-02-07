import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FlexBox from '../components/FlexBox';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <FlexBox
      px={2}
      minHeight="100vh"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box maxWidth={320} width="100%" mb={3}>
        <img
          alt="Not Found!"
          src="/public/assets/404.svg"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Box>

      <FlexBox flexWrap="wrap" gap={2}>
        <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/login')}
        >
          Go to Login Page
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default NotFound;
