import { Container, TextField, Button, Typography, Box, Paper, Grid2 } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthStatus, useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { FormEventHandler } from 'react';

const LoginPage = () => {
  const {login, status} = useAuth();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    login(data.get('email')!.toString(), data.get('password')!.toString());
  };
  if (status === AuthStatus.Authenticated) {
    return <Navigate to='/'/>;
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{marginLeft: 'auto'}}
    >
        <Grid2 container justifyContent="center">
            <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <LockOutlinedIcon color="primary" style={{ fontSize: 40 }} />
                <Typography component="h1" variant="h5">
                    Connexion
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Adresse Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Se connecter
                    </Button>
                </Box>
                </Box>
            </Paper>
        </Grid2>
    </Container>
  );
};

export default LoginPage;