import {
  Button,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../api/productApi";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const BACKEND_URL = "http://localhost:3000"; 

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

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={() => navigate("/products/create")}
      >
        + Create Product
      </Button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {products.map((prod: any) => (
          <div key={prod._id} style={{ width: "250px" }}>
            <Card>
              {prod.images?.[0] && (
                <CardMedia
  component="img"
  height="140"
  image={
    prod.images?.[0]?.startsWith("http")
      ? prod.images[0]
      : `${BACKEND_URL}${prod.images[0]}`
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
