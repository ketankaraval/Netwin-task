import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { deleteProduct , deleteSuccess} from '../slice/productSlice';

const ProductListCard = ({
  id,
  title,
  price,
  discountPercentage,
  rating,
  imgUrl,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (_e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <ListItem
      alignItems="center"
      style={{
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Adding box shadow
      }}
    >
      <ListItemAvatar>
        <Avatar alt={title} src={imgUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                style={{ fontWeight: 'bold' }}
              >
                Price: {price}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                style={{ fontWeight: 'bold' }}
              >
                Discount: {discountPercentage}%
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                style={{ fontWeight: 'bold' }}
              >
                Rating: {rating}
              </Typography>
            </Grid>
          </Grid>
        }
      />
      <IconButton onClick={() => navigate(`/product/${id}`)}>
        <EditIcon color="info" />
      </IconButton>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon color="error" />
      </IconButton>
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
            color="primary"
            variant="contained"
            autoFocus
            onClick={() => {
              dispatch(deleteProduct(id))
                .unwrap()
                .then(res => {
                  console.log(res);
                  setSnackbarOpen(true);
                  dispatch(deleteSuccess())

                })
                .catch(err => {
                  console.error(err);
                });
              handleClose();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
    </ListItem>
  );
};

ProductListCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discountPercentage: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default ProductListCard;
