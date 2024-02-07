import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import PropTypes from 'prop-types';
import FlexBox from './FlexBox';
import ProductGridCard from './ProductGridCard';

const ProductsGridView = ({
  products,
  totalItems,
  itemsPerPage,
  currentPage,
  updateCurrentPage,
}) => (
  <>
    <Grid container spacing={3} justifyContent="center">
      {products.map(item => (
        <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
          <ProductGridCard
            id={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            discountPercentage={item.discountPercentage}
            rating={item.rating}
            stock={item.stock}
            brand={item.brand}
            category={item.category}
            thumbnail={item.thumbnail}
            images={item.images}
          />
        </Grid>
      ))}
    </Grid>

    <FlexBox
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      mt={4}
    >
      <Typography variant="subtitle2" color="grey.600">
        Showing {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{' '}
        Products
      </Typography>
      <Pagination
        count={Math.ceil(totalItems / itemsPerPage)}
        variant="outlined"
        color="primary"
        onChange={(_e, page) => updateCurrentPage(page)}
      />
    </FlexBox>
  </>
);

export default ProductsGridView;

ProductsGridView.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
      discountPercentage: PropTypes.number,
      rating: PropTypes.number,
      stock: PropTypes.number,
      brand: PropTypes.string,
      category: PropTypes.string,
      thumbnail: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  updateCurrentPage: PropTypes.func.isRequired,
};
