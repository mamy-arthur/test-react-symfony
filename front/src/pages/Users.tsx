import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useTokenStore } from "../hooks/store";
import { useEffect, useState } from "react";
import { fetchApiWithToken } from "../utils/fetchApi";
type User = {
    id: String;
    email: String;
    roles: String[];
}
export function Users() {
    const {token} = useTokenStore();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const endpoint = `/api/users`;
        fetchApiWithToken(token, endpoint, 'GET').then(response => setUsers(response));
    }, []);
    return (
        <Container >
            <Typography variant="h5" gutterBottom>
                Liste des Utilisateurs
            </Typography>
            <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell>Roles</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map((user: User) => {
                                return (
                                    <TableRow key={user.id.toString()}>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.roles.join(', ')}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}