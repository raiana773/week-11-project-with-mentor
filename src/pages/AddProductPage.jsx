import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useProductContext } from "../contexts/ProductContext";

function AddProductPage() {
  // ! 30
  const { addProduct } = useProductContext();
  // ! 20
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  //    ! 22
  function handleChance(e) {
    const obj = {
      ...formValue,
      [e.target.name]: e.target.value,
    };
    setFormValue(obj);
  }

  //   ! 24
  function handleSubmit(e) {
    e.preventDefault();
    if (
      !formValue.title.trim() ||
      !formValue.description.trim() ||
      !formValue.price.trim() ||
      !formValue.category.trim() ||
      !formValue.image.trim()
    ) {
      alert("Заполните все поля");
      return;
    }

    //   ! 31
    addProduct(formValue);

    //   ! 27
    setFormValue({
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
    // console.log(formValue);
  }

  // ! 19
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add Product</h1>
      <form
        //   ! 25 onSubmit={(e) => handleSubmit(e)}
        onSubmit={(e) => handleSubmit(e)}
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* //! 23 onChange={(e)=> handleChance(e)} */}
        {/* // ! 21  value={formValue.title} */}
        <TextField
          value={formValue.title}
          onChange={(e) => handleChance(e)}
          name="title"
          label="Title"
          variant="outlined"
        />
        <TextField
          value={formValue.description}
          onChange={(e) => handleChance(e)}
          name="description"
          label="Description"
          variant="outlined"
        />
        <TextField
          value={formValue.price}
          onChange={(e) => handleChance(e)}
          name="price"
          label="Price"
          variant="outlined"
        />
        {/* <TextField
          value={formValue.category}
          onChange={(e) => handleChance(e)}
          name="category"
          label="Category"
          variant="outlined"
        /> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formValue.category}
            label="Category"
            name="category"
            onChange={(e) => handleChance(e)}
          >
            <MenuItem value={"men's clothing"}>Men</MenuItem>
            <MenuItem value={"women's clothing"}>Women</MenuItem>
            <MenuItem value={"jewelery"}>Jewelery</MenuItem>
            <MenuItem value={"electronics"}>Electronics</MenuItem>
          </Select>
        </FormControl>
        <TextField
          value={formValue.image}
          onChange={(e) => handleChance(e)}
          name="image"
          label="Image"
          variant="outlined"
        />
        {/* // ! 26 type="submit*/}
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
}

export default AddProductPage;
