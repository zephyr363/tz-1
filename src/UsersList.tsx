import { useMemo, useState } from "react";
import { useGetAllUsersQuery } from "./userAPI";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import SearchIcon from "@mui/icons-material/Search";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const UsersList = () => {
    const { data, error, isLoading } = useGetAllUsersQuery();
    const users = data?.users ?? [];

    const [search, setSearch] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const filteredUsers = useMemo(() => {
        const value = search.trim().toLowerCase();

        if (!value) return users;

        return users.filter((user) => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
            return (
                fullName.includes(value) ||
                user.email.toLowerCase().includes(value) ||
                user.username.toLowerCase().includes(value) ||
                user.address.city.toLowerCase().includes(value) ||
                user.company.name.toLowerCase().includes(value)
            );
        });
    }, [users, search]);

    const selectedUser =
        filteredUsers.find((u) => u.id === selectedUserId) ?? filteredUsers[0] ?? null;

    if (isLoading) {
        return (
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    minHeight: 500,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 4,
                }}
            >
                <Stack alignItems="center" spacing={2}>
                    <CircularProgress />
                    <Typography color="text.secondary">Загрузка пользователей...</Typography>
                </Stack>
            </Paper>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ borderRadius: 3 }}>
                Не удалось загрузить пользователей.
            </Alert>
        );
    }

    return (
        <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
            <Paper
                elevation={0}
                sx={{
                    flex: 1.2,
                    p: 2,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                }}
            >
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        placeholder="Поиск по имени, email, городу, компании..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Typography variant="body2" color="text.secondary">
                        Найдено: {filteredUsers.length}
                    </Typography>

                    <List sx={{ p: 0 }}>
                        {filteredUsers.map((user, index) => (
                            <Box key={user.id}>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        selected={selectedUser?.id === user.id}
                                        onClick={() => setSelectedUserId(user.id)}
                                        sx={{
                                            borderRadius: 3,
                                            alignItems: "flex-start",
                                            py: 1.5,
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={user.username}
                                                src={user.image}
                                                sx={{ width: 52, height: 52 }}
                                            />
                                        </ListItemAvatar>

                                        <ListItemText
                                            primary={
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                    flexWrap="wrap"
                                                >
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        {user.firstName} {user.lastName}
                                                    </Typography>
                                                    <Chip
                                                        label={user.company.department}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </Stack>
                                            }
                                            secondary={
                                                <Stack spacing={0.75} sx={{ mt: 0.75 }}>
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <EmailOutlinedIcon sx={{ fontSize: 16 }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            {user.email}
                                                        </Typography>
                                                    </Stack>

                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            {user.address.city}, {user.address.state}, {user.address.country}
                                                        </Typography>
                                                    </Stack>

                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <BusinessOutlinedIcon sx={{ fontSize: 16 }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            {user.company.name}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>

                                {index !== filteredUsers.length - 1 && (
                                    <Divider variant="inset" component="li" sx={{ my: 1 }} />
                                )}
                            </Box>
                        ))}
                    </List>
                </Stack>
            </Paper>

            <Paper
                elevation={0}
                sx={{
                    flex: 0.9,
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    minHeight: 520,
                }}
            >
                {selectedUser ? (
                    <Stack spacing={2.5}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar
                                alt={selectedUser.username}
                                src={selectedUser.image}
                                sx={{ width: 72, height: 72 }}
                            />
                            <Box>
                                <Typography variant="h6" fontWeight={700}>
                                    {selectedUser.firstName} {selectedUser.lastName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    @{selectedUser.username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {selectedUser.age} лет • {selectedUser.gender}
                                </Typography>
                            </Box>
                        </Stack>

                        <Divider />

                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Контакты
                            </Typography>
                            <Typography variant="body1">{selectedUser.email}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {selectedUser.phone}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Локация
                            </Typography>
                            <Typography variant="body1">
                                {selectedUser.address.city}, {selectedUser.address.state},{" "}
                                {selectedUser.address.country}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {selectedUser.address.address}, {selectedUser.address.postalCode}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Компания
                            </Typography>
                            <Typography variant="body1">{selectedUser.company.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {selectedUser.company.title} • {selectedUser.company.department}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Банк
                            </Typography>
                            <Typography variant="body1">{selectedUser.bank.cardType}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {selectedUser.bank.currency} • {selectedUser.bank.iban}
                            </Typography>
                        </Box>
                    </Stack>
                ) : (
                    <Typography color="text.secondary">Пользователь не выбран</Typography>
                )}
            </Paper>
        </Stack>
    );
};

export default UsersList;