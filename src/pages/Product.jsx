import React, { useCallback, useEffect, useState } from 'react';
import {  useDispatch, useSelector} from 'react-redux';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Apps from '@mui/icons-material/Apps';
import ViewList from '@mui/icons-material/ViewList';
import axios from 'axios';
import { InputAdornment, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { debounce } from 'lodash';
import FlexBox from '../components/FlexBox';
import ProductsGridView from '../components/ProductGridView';
import ProductsListView from '../components/ProductListView';
import Navbar from '../components/Navbar';
import { deleteInitial } from '../slice/productSlice';

const Product = () => {
  const dispatch = useDispatch()
  const deleteProductSucces = useSelector((state) => state.product.productDeleteSuccess);

  const [view, setView] = useState('grid');
  const toggleView = useCallback(v => () => setView(v), []);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  console.log(deleteProductSucces)
  const updateCurrentPage = page => {
    setCurrentPage(page);
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`,
      );
      setProducts(response.data.products);
      dispatch(deleteInitial)
      setTotalItems(response.data.total);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
    }

    setLoading(false);
  };
  useEffect(()=>{
    if(deleteProductSucces){
      fetchProducts()
    }

  },[deleteProductSucces])

  const debouncedSearch = useCallback(
    debounce(async searchText => {
      if (searchText.trim() !== '') {
        setLoading(true);
        setError('');

        try {
          const response = await axios.get(
            `https://dummyjson.com/products/search?q=${searchText}&limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`,
          );
          setProducts(response.data.products);
          setTotalItems(response.data.total);
        } catch (err) {
          setError('Failed to search products. Please try again later.');
        }

        setLoading(false);
      } else {
        fetchProducts();
      }
    }, 500),
    [currentPage],
  );

  const handleSearch = value => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const renderProducts = () => {
    if (loading) {
      return (
        <FlexBox justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </FlexBox>
      );
    }

    if (error) {
      return (
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      );
    }

    if (products && products.length > 0) {
      if (view === 'grid') {
        return (
          <ProductsGridView
            products={products}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalItems={totalItems}
            updateCurrentPage={updateCurrentPage}
          />
        );
      }
      return (
        <ProductsListView
          products={products}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalItems={totalItems}
          updateCurrentPage={updateCurrentPage}
        />
      );
    }
    return (
      <Typography variant="body1" align="center">
        No products found.
      </Typography>
    );
  };
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <Container
      sx={{
        mt: 4,
        mb: 6,
      }}
    >
      <Navbar />
      <Card
        elevation={1}
        sx={{
          mb: '3rem',
          mt: '4rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: {
            sm: '1rem 1.25rem',
            md: '0.5rem 1.25rem',
            xs: '1.25rem 1.25rem 0.25rem',
          },
        }}
      >
        <FlexBox
          alignItems="center"
          columnGap={4}
          flexWrap="wrap"
          my="0.5rem"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleSearch(searchTerm)}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FlexBox alignItems="center" my="0.25rem">
            <Typography variant="subtitle1" color="grey.600" mr={1}>
              View:
            </Typography>
            <IconButton onClick={toggleView('grid')}>
              <Apps
                color={view === 'grid' ? 'primary' : 'inherit'}
                fontSize="small"
              />
            </IconButton>
            <IconButton onClick={toggleView('list')}>
              <ViewList
                color={view === 'list' ? 'primary' : 'inherit'}
                fontSize="small"
              />
            </IconButton>
          </FlexBox>
        </FlexBox>
      </Card>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          {renderProducts()}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Product;
