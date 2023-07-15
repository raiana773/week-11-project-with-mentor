import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import { LIMIT } from "../utils/consts";
import ProductCard from "./ProductCard";

function ProductList() {
  // ! 10
  const { products, getProducts, pageTotalCount } = useProductContext();
  // 4
  const [searchParams, setSearchParams] = useSearchParams();

  // 2
  const [inputVal, setInputVal] = useState(
    searchParams.get("title_like") || ""
  );
  // console.log(...searchParams);
  // console.log(searchParams.get("title_like"));

  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );

  const [page, setPage] = useState(+searchParams.get("_page") || 1);

  // ! 11
  useEffect(() => {
    getProducts();
    // 6
  }, [searchParams]);

  // ? работает по URL прописать id  прописать другую страницу и туда попадаем
  const [firstMount, setFirstMount] = useState(true);

  // 5
  useEffect(() => {
    if (firstMount) {
      setFirstMount(false);
      return;
    }
    if (category === "all") {
      setSearchParams({
        title_like: inputVal,
        _limit: LIMIT,
        _page: 1,
      });
    } else {
      setSearchParams({
        title_like: inputVal,
        category: category,
        _limit: LIMIT,
        _page: 1,
      });
    }
    setPage(1);
  }, [inputVal, category]);

  useEffect(() => {
    if (category === "all") {
      setSearchParams({
        title_like: inputVal,
        _limit: LIMIT,
        _page: page,
      });
    } else {
      setSearchParams({
        title_like: inputVal,
        category: category,
        _limit: LIMIT,
        _page: page,
      });
    }
  }, [page]);

  // если пропишем в URL не существующую страницу он зайдет в существующую
  useEffect(() => {
    if (pageTotalCount < page) {
      setPage(pageTotalCount);
    }
  }, [pageTotalCount]);

  return (
    <div>
      <TextField
        // 3 onChange={(e) => setInputVal(e.target.value)}  value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        value={inputVal}
        label="Search..."
        variant="outlined"
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categoty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Categoty"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"men's clothing"}>Men</MenuItem>
          <MenuItem value={"women's clothing"}>Women</MenuItem>
          <MenuItem value={"jewelery"}>Jewelery</MenuItem>
          <MenuItem value={"electronics"}>Electronics</MenuItem>
        </Select>
      </FormControl>
      {/*  // ! 12 */}
      {/* spacing- расстояние между карточками снизу и с верху */}
      <Grid container spacing={2}>
        {products.map((item) => {
          return <ProductCard key={item.id} item={item} />;
        })}
      </Grid>
      <Box sx={{ maxWidth: "max-content", margin: "20px auto" }}>
        <Pagination
          onChange={(e, p) => setPage(p)}
          page={page}
          color="primary"
          count={pageTotalCount}
        />
      </Box>
    </div>
  );
}

export default ProductList;
