// src/pages/ProductForm.tsx
import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Input,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import {
  createProductWithImage,
  getProductById,
  updateProduct,
} from "../api/productApi";

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      getProductById(id!).then((res) => {
        const { name, description, price, stock } = res.data;
        setForm({ name, description, price, stock });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        // Optional image update handling (only if backend supports it)
        await updateProduct(id!, form);
        alert("Product updated!");
      } else {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price.toString());
        formData.append("stock", form.stock.toString());
        if (image) formData.append("image", image);

        await createProductWithImage(formData);
        alert("Product created!");
      }
      navigate("/products");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("There was a problem. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? "Edit Product" : "Create Product"}
        </Typography>

        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          value={form.description}
          onChange={handleChange}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          fullWidth
          margin="normal"
          value={form.price}
          onChange={handleChange}
          required
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          fullWidth
          margin="normal"
          value={form.stock}
          onChange={handleChange}
          required
        />

        {!isEdit && (
          <Box mt={2}>
            <Typography variant="body2" gutterBottom>
              Upload Product Image
            </Typography>
            <Input type="file" onChange={handleImageChange} fullWidth />
          </Box>
        )}

        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!form.name || form.price <= 0 || form.stock < 0}
          >
            {isEdit ? "Update" : "Create"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
