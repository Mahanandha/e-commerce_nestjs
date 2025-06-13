import {
  Button,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

import { fetchProducts, deleteProduct } from "../api/productApi";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ name: "", price: "" });
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  const filteredProducts = products.filter((prod: any) => {
    const nameMatch = prod.name
      .toLowerCase()
      .includes(filters.name.toLowerCase());
    const priceMatch =
      filters.price === "" || prod.price <= Number(filters.price);
    return nameMatch && priceMatch;
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      {/* Filters and Create Button */}
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        gap={2}
        mb={3}
        justifyContent="space-between"
      >
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Filter by Name"
            size="small"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
          <TextField
            label="Filter by Price"
            size="small"
            type="number"
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/products/create")}
        >
          + Create Product
        </Button>
      </Box>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {filteredProducts.map((prod: any) => (
          <div key={prod._id} style={{ width: "250px" }}>
            <Card>
              {prod.images?.[0] && (
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    prod.images[0].startsWith("http")
                      ? prod.images[0]
                      : `http://localhost:3000${prod.images[0]}`
                  }
                  alt={prod.name}
                />
              )}
              <CardContent>
                <Typography variant="h6">{prod.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {prod.description}
                </Typography>
                <Typography variant="body2">Stock: {prod.stock}</Typography>
                <Typography variant="body2">Price: ₹{prod.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`/products/edit/${prod._id}`)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(prod._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}
