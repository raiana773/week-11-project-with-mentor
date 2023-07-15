import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import { useCartContext } from "../contexts/CartContext";
import { useAuthContext } from "../contexts/AuthContext";

// ! 13 {item}- передали из productList
function ProductCard({ item }) {
  // ! 16
  const { deleteProduct } = useProductContext();

  const { addProductToCart, deleteProductFromCart, isAlredyInCart } =
    useCartContext();
  const { isAdmin } = useAuthContext();
  return (
    <Grid item md={4} sm={6} xs={12}>
      <Card>
        <CardMedia
          component="img"
          alt="green iguana"
          height="500"
          //   ! 13
          image={item.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {/* // ! 13 */}
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* // ! 13 */}${item.price}
          </Typography>
        </CardContent>
        <CardActions>
          {/* // ! 17 onClick */}

          {isAdmin() ? (
            <>
              <Button
                onClick={() => deleteProduct(item.id)}
                color="error"
                size="small"
              >
                Delete
              </Button>
              <Button
                component={Link}
                to={`/edit/${item.id}`}
                color="warning"
                size="small"
              >
                Edit
              </Button>
            </>
          ) : null}

          <Button component={Link} to={`/details/${item.id}`} size="small">
            Learn more
          </Button>
          {isAlredyInCart(item.id) ? (
            <IconButton
              onClick={() => deleteProductFromCart(item.id)}
              color="error"
            >
              <RemoveShoppingCartOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => addProductToCart(item)} color="primary">
              <AddShoppingCartIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductCard;
