import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

function EditProductPage() {
  //   const { addProduct } = useProductContext();
  const { oneProduct, getOneProduct, editProduct } = useProductContext();

  // ! useEffect
  const { id } = useParams();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  // !
  useEffect(() => {
    getOneProduct(id);
  }, []);

  //   !
  useEffect(() => {
    if (oneProduct) {
      setFormValue(oneProduct);
    }
  }, [oneProduct]);

  function handleChance(e) {
    const obj = {
      ...formValue,
      [e.target.name]: e.target.value,
    };
    setFormValue(obj);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !formValue.title.trim() ||
      !formValue.description.trim() ||
      !formValue.price.toString().trim() ||
      !formValue.category.trim() ||
      !formValue.image.trim()
    ) {
      alert("Заполните все поля");
      return;
    }

    // addProduct(formValue);
    // !
    editProduct(id, formValue);

    setFormValue({
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
    // console.log(formValue);
    navigate(-1);
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Edit Product</h1>
      <form
        // !  onSubmit={(e) => handleSubmit(e)}
        onSubmit={(e) => handleSubmit(e)}
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* //!  onChange={(e)=> handleChance(e)} */}
        {/* // !   value={formValue.title} */}
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
        <TextField
          value={formValue.category}
          onChange={(e) => handleChance(e)}
          name="category"
          label="Category"
          variant="outlined"
        />
        <TextField
          value={formValue.image}
          onChange={(e) => handleChance(e)}
          name="image"
          label="Image"
          variant="outlined"
        />
        {/* // !  type="submit*/}
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </div>
  );
}

export default EditProductPage;
