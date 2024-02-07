import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Formik, FieldArray } from 'formik';
import { Alert, Snackbar, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import {
  getProductDetails,
  productAdd,
  productUpdate,
} from '../slice/productSlice';
import BackButton from '../components/BackButton';
import Navbar from '../components/Navbar';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  discountPercentage: yup.number().required('Discount percentage is required'),
  rating: yup.number().required('Rating is required'),
  stock: yup.number().required('Stock is required'),
  brand: yup.string().required('Brand is required'),
  category: yup.string().required('Category is required'),
  thumbnail: yup.string().url().required('Thumbnail is required'),
  images: yup.array(yup.string().url()).required('Images are required'),
});

const ProductForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Default severity is success

  const [initialValues, setInitialValues] = React.useState({
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: [],
  });

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id))
        .unwrap()
        .then(res => {
          setInitialValues(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [id]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const AddProduct = data => {
    dispatch(productAdd(data))
      .unwrap()
      .then(res => {
        if (res.id) {
          setSnackbarMessage('Product created successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          navigate('/products');
        } else {
          setSnackbarMessage(res.message);
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
          // setLoading(false);k
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const UpdateProduct = (data, productId) => {
    dispatch(productUpdate({ data, id: productId }))
      .unwrap()
      .then(res => {
        if (res.id) {
          setSnackbarMessage('Product updated successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          navigate('/products');
        } else {
          setSnackbarMessage(res.message);
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleFormSubmit = values => {
    if (id) {
      UpdateProduct(values, id);
    } else {
      AddProduct(values);
    }
  };

  return (
    <>
      <Navbar />
      <Card
        sx={{
          p: 6,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
          mt: 4,
        }}
      >
        <BackButton />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 34,
                      color: '#0288d1',
                    }}
                  >
                    {id ? 'EDIT PRODUCT' : 'ADD PRODUCT'}
                  </Typography>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="title"
                    label="Title"
                    color="info"
                    size="medium"
                    placeholder="Title"
                    value={values.title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="description"
                    label="Description"
                    color="info"
                    size="medium"
                    placeholder="Description"
                    value={values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="price"
                    label="Price"
                    color="info"
                    size="medium"
                    placeholder="Price"
                    value={values.price}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="discountPercentage"
                    label="Discount Percentage"
                    color="info"
                    size="medium"
                    placeholder="Discount Percentage"
                    value={values.discountPercentage}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={
                      !!touched.discountPercentage &&
                      !!errors.discountPercentage
                    }
                    helperText={
                      touched.discountPercentage && errors.discountPercentage
                    }
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="rating"
                    label="Rating"
                    color="info"
                    size="medium"
                    placeholder="Rating"
                    value={values.rating}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.rating && !!errors.rating}
                    helperText={touched.rating && errors.rating}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="stock"
                    label="Stock"
                    color="info"
                    size="medium"
                    placeholder="Stock"
                    value={values.stock}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.stock && !!errors.stock}
                    helperText={touched.stock && errors.stock}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="brand"
                    label="Brand"
                    color="info"
                    size="medium"
                    placeholder="Brand"
                    value={values.brand}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.brand && !!errors.brand}
                    helperText={touched.brand && errors.brand}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="category"
                    label="Category"
                    color="info"
                    size="medium"
                    placeholder="Category"
                    value={values.category}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="thumbnail"
                    name="thumbnail"
                    label="Thumbnail"
                    color="info"
                    size="medium"
                    placeholder="Thumbnail"
                    value={values.thumbnail}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.thumbnail && !!errors.thumbnail}
                    helperText={touched.thumbnail && errors.thumbnail}
                  />
                </Grid>
                <FieldArray
                  name="images"
                  render={arrayHelpers => (
                    <Grid item xs={12}>
                      {values.images && values.images.length > 0
                        ? values.images.map((image, index) => (
                            <div key={image} style={{ marginBottom: '1.5rem' }}>
                              <TextField
                                fullWidth
                                name={`images.${index}`}
                                label={`Image URL ${index + 1}`}
                                color="info"
                                size="medium"
                                placeholder={`Image URL ${index + 1}`}
                                value={image}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.images && !!errors.images}
                                helperText={touched.images && errors.images}
                                InputProps={{
                                  endAdornment: (
                                    <Button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <Close />
                                    </Button>
                                  ),
                                }}
                              />
                            </div>
                          ))
                        : null}
                      <Button
                        type="button"
                        onClick={() => arrayHelpers.push('')}
                      >
                        Add a image URL
                      </Button>
                    </Grid>
                  )}
                />
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="info"
                    type="submit"
                    sx={{ width: '100%' }}
                  >
                    {id ? 'Edit Product' : 'Add Product'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Card>
    </>
  );
};

export default ProductForm;
