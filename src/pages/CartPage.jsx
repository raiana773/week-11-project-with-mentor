import * as React from "react";
import { Table, Button, Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCartContext } from "../contexts/CartContext";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, plusCount, minusCount, deleteProductFromCart } =
    useCartContext();

  return (
    <TableContainer sx={{ padding: "10px" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Sub Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.products.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="right">
                <img width={50} src={item.image} alt="" />
              </TableCell>
              <TableCell align="right">{item.category}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.subPrice}</TableCell>

              <TableCell>
                <Button onClick={() => plusCount(item.id)}>+</Button>
                <Typography component="span" variant="h6">
                  {item.count}
                </Typography>
                <Button
                  onClick={() => {
                    if (item.count <= 1) {
                      deleteProductFromCart(item.id);
                    } else {
                      minusCount(item.id);
                    }
                  }}
                >
                  -
                </Button>
              </TableCell>
            </TableRow>
          ))}

          <Typography variant="h4">
            Total price: ${cart.totalPrice.toFixed(2)}
          </Typography>
        </TableBody>
      </Table>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Button component={Link} to="/success" variant="contained">
          Buy🦄🦄🦄🦄🦄🦄
        </Button>
      </Box>
    </TableContainer>
  );
}
