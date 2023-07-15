import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

function ProductDetailsPage() {
  const { oneProduct, getOneProduct } = useProductContext();
  const { id } = useParams();
  useEffect(() => {
    getOneProduct(id);
  }, []);
  console.log(oneProduct);

  //   if (!oneProduct) {
  //     return <h1>Loading...</h1>;
  //   }

  return (
    <>
      {oneProduct ? (
        <Card sx={{ display: "flex", maxWidth: "800px" }}>
          <CardMedia
            component="img"
            alt="green iguana"
            sx={{ width: "300px" }}
            // height="140"
            image={oneProduct.image}
          />
          <Box>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {oneProduct.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {oneProduct.description}
              </Typography>
              <Typography variant="h6">${oneProduct.price}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Box>
        </Card>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default ProductDetailsPage;
