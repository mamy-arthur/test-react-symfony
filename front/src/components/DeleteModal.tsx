import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchApiWithToken } from '../utils/fetchApi';
import { ProductType } from '../types/Product';
import { useTokenStore } from '../hooks/store';
import { useNavigate } from 'react-router-dom';
const emptyProduct: ProductType = {
  id: '',
  name: '',
  description: '',
  quantity: 0,
  price: 0
}
function DeleteModal({open, setOpen, productid}: any) {
  const [product, setProduct] = useState<ProductType>(emptyProduct);
  const {token} = useTokenStore();
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const endpoint = `/api/product/${productid}`;
    fetchApiWithToken(token, endpoint, 'GET').then(response => {
      setProduct(response);
    });
  }, [productid]);

  const handleDelete = (e: any) => {
    e.preventDefault();
    const endpoint = `/api/product/delete/${productid}`;
    fetchApiWithToken(token, endpoint, 'DELETE').then((response) => {
      navigate('/', {state: response});
      setOpen(false);
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Suppression de produit:</DialogTitle>
        <DialogContent>
          <p>Voulez-vous vraiment supprimer le produit: {product.name} ?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="warning">
            Supprimer
          </Button>
          <Button onClick={handleClose} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
