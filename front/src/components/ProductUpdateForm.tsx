import { FormEventHandler, useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Grid2 } from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useTokenStore } from "../hooks/store";
import { fetchApiWithToken } from "../utils/fetchApi";
import { ProductType } from "../types/Product";

const emptyProduct: ProductType = {
  id: '',
  name: '',
  description: '',
  quantity: 0,
  price: 0.0
};

export default function ProductUpdateForm() {
  const {token} = useTokenStore();
  const params = useParams();
  const [product, setProduct] = useState<ProductType>(emptyProduct);
  const navigate = useNavigate();

  useEffect(() => {
    const endpoint = `/api/product/${params.id}`;
    fetchApiWithToken(token, endpoint).then(response => {
      setProduct(response);
    });
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name')!.toString(),
      description: formData.get('description')!.toString(),
      quantity: parseInt(formData.get('quantity')!.toString(), 10),
      price: parseFloat(formData.get('price')!.toString())
    };
    const endpoint = `/api/product/update/${params.id}`;
    fetchApiWithToken(token, endpoint, 'PUT', data).then((response) => {
      navigate('/', {state: response});
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 5, mx: "auto" }}>
      <Typography variant="h6" gutterBottom marginTop={2}>
        Mise à jour du produit
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <TextField
            fullWidth
            label="Nom"
            name="name"
            value={product?.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={product?.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            fullWidth
            label="Quantité"
            name="quantity"
            type="number"
            value={product?.quantity}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Prix"
            name="price"
            type="number"
            value={product?.price}
            onChange={handleChange}
            margin="normal"
          />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 size={6}></Grid2>
        <Grid2 size={6}>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} style={{marginRight: '15px'}}>
            <NavLink to="/" style={{color: '#fff'}}>Annuler</NavLink>
          </Button>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Mettre à jour
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
}
