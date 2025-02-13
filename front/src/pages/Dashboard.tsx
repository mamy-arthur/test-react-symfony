import { useEffect, useState } from "react";
import { useTokenStore } from "../hooks/store";
import { fetchApiWithToken } from "../utils/fetchApi";
import { ProductType } from "../types/Product";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Container, Button, Snackbar, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { NavLink, useLocation } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";

export function Dashboard() {
    const {token} = useTokenStore();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState('');
    const location = useLocation();
    const message = location.state?.message;
    const [open, setOpen] = useState(false);
    useEffect(() => {
        fetchApiWithToken(token, '/api/products').then(response => setProducts(response));
    }, []);

    useEffect(() => {
        if (location.state?.id) {
            const id = location.state?.id;
            setProducts(products => products.filter(p => p.id !== id));
        }
        setOpen(true);
    }, [message]);

    const handleDeleteClick = (productid: string) => {
        setSelectedProductId(productid);
        setOpenModal(true);
    };

    const handleClose = (reason: any) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <>
            <Container >
                {message && <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert severity="success" variant="filled">
                        {message}
                    </Alert>
                </Snackbar>}
                <Typography variant="h5" gutterBottom>
                    Liste des Produits
                </Typography>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} style={{float: 'right', marginBottom: '15px'}}>
                    <NavLink to="/product/create" style={{color: '#fff'}}>Créer un nouveau produit</NavLink>
                </Button>
                <TableContainer component={Paper} sx={{ width: "100%" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom</TableCell>
                                <TableCell>Quantité</TableCell>
                                <TableCell>Prix</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product: ProductType) => (
                                <TableRow key={product.id?.toString()}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.quantity?.toString()}</TableCell>
                                    <TableCell>{product.price?.toString()}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary">
                                            <NavLink to={`/product/update/${product.id}`}>
                                                <EditIcon />
                                            </NavLink>
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => handleDeleteClick(product.id?.toString())}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            {openModal && <DeleteModal open={openModal} setOpen={setOpenModal} productid={selectedProductId}/>}
        </>
    );
}