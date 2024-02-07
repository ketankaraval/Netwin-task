import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import StarRating from './StarRating'; // Import the StarRating component
import { deleteProduct , deleteSuccess} from '../slice/productSlice';

const ProductGridCard = ({
  id,
  title,
  description,
  price,
  discountPercentage,
  rating,
  brand,
  images,
}) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const handleSnackbarClose = (_e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <Card
      sx={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '28rem',
      }}
    >
      <Slider {...settings}>
        {images.map(image => (
          <div key={image}>
            <img
              src={image}
              alt="product"
              style={{ width: '100%', height: '12rem' }}
            />
          </div>
        ))}
      </Slider>
      <CardContent
        sx={{
          height: '16rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Grid container justifyContent="space-between">
          <Grid item xs={12}>
            <Tooltip title={description} aria-label="add" placement="top">
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: 24,
                  color: '#F9629F',
                  my: 2,
                  height: '4.5rem',
                }}
              >
                {title}
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item lg={5}>
                <Typography
                  sx={{ fontWeight: 'bold', fontSize: 18, color: '#4d4c51' }}
                >
                  Rs. {price}/-
                </Typography>
              </Grid>
              <Grid
                item
                lg={7}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Typography
                  sx={{ fontWeight: 'bold', fontSize: 16, color: '#FF69B4' }}
                >
                  {brand}
                </Typography>
              </Grid>
            </Grid>
            <Tooltip title={`Rating: ${rating}`} placement="top">
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item lg={4}>
                  <Typography
                    sx={{ fontWeight: 'bold', fontSize: 16, color: '#4d4c51' }}
                  >
                    {discountPercentage}% off
                  </Typography>
                </Grid>
                <Grid
                  item
                  lg={8}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <StarRating count={rating} />
                </Grid>
              </Grid>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent="flex-end"
          alignItems="flex-end"
          gap={2}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/product/${id}`)}
          >
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={handleClickOpen}>
            Delete
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Delete Product</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this product?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error" variant="contained">
                No
              </Button>
              <Button
                onClick={() => {
                  dispatch(deleteProduct(id))
                    .unwrap()
                    .then(res => {
                      console.log(res);
                      dispatch(deleteSuccess())
                      setSnackbarOpen(true);
                    })
                    .catch(err => {
                      console.error(err);
                    });
                  handleClose();
                }}
                color="primary"
                variant="contained"
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </CardContent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Product deleted successfully
        </Alert>
      </Snackbar>
    </Card>
  );
};

ProductGridCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discountPercentage: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  brand: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductGridCard;
