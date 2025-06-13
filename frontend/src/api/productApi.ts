import axios from "./axios";

export const fetchProducts = (filters = {}) =>
  axios.get("/products", { params: filters });

export const createProductWithImage = (formData: FormData) =>
  axios.post("/products/single", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProduct = (id: string, data: any) =>
  axios.patch(`/products/${id}`, data); // PATCH for edit

export const deleteProduct = (id: string) => axios.delete(`/products/${id}`);

export const getProductById = (id: string) => axios.get(`/products/${id}`);
