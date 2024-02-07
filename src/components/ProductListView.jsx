import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import ProductListCard from './ProductListCard';
import FlexBox from './FlexBox';

const ProductsListView = ({
  products,
  totalItems,
  itemsPerPage,
  currentPage,
  updateCurrentPage,
}) => (
  <div>
    {products.map(item => (
      <ProductListCard
        id={item.id}
        key={item.id}
        slug={item.slug}
        title={item.title}
        price={item.price}
        discountPercentage={item.discountPercentage}
        rating={item.rating}
        imgUrl={item.thumbnail}
      />
    ))}

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
        count={10}
        variant="outlined"
        color="primary"
        onChange={(_e, page) => updateCurrentPage(page)}
      />
    </FlexBox>
  </div>
);

export default ProductsListView;

ProductsListView.propTypes = {
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
