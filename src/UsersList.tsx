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
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useDashboardContext } from "./DashboardContext";

const UsersList = () => {
    const {users,findUserByAnyField } = useDashboardContext();
    const { error, isLoading } = useGetAllUsersQuery();

    const [search, setSearch] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const filteredUsers = useMemo(() => {
        const value = search.toLowerCase();
        return findUserByAnyField(value);
    }, [users, search]);

    const selectedUser = useMemo(() => {
        return users.find((user) => user.id === selectedUserId) || null;
    }, [users, selectedUserId]);

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
                <Stack sx={{ alignItems:"center" }} spacing={2}>
                    <CircularProgress />
                    <Typography color="text.secondary">Загрузка пользователей...</Typography>
                </Stack>
            </Paper>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ borderRadius: 3 }}>
                Ошибка при загрузке данных. Пожалуйста, попробуйте позже.
            </Alert>
        );
    }

    return (
        <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={3}
            sx={{
                height: { xs: "auto", lg: "calc(100vh - 320px)" },
                minHeight: { lg: 520 },
                overflow: "hidden",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    flex: 1.2,
                    p: 2,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    overflow: "hidden",
                }}
            >
                <Stack spacing={2} sx={{ minHeight: 0, height: "100%" }}>
                    <TextField
                        fullWidth
                        placeholder="Имя, email, город, компания..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        size="small"

                    />

                    <Typography variant="body2" color="text.secondary">
                        Найдено: {filteredUsers?.length || 0}
                    </Typography>

                    <Box
                        sx={{
                            flex: 1,
                            minHeight: 0,
                            overflowY: "auto",
                            pr: 1,
                        }}
                    >
                        <List sx={{ p: 0 }}>
                            {filteredUsers?.map((user, index) => (
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
                                                        sx={{
                                                            alignItems: "center",
                                                            flexWrap: "wrap"
                                                        }}
                                                    >
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
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
                                                        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                                            <EmailOutlinedIcon sx={{ fontSize: 16 }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {user.email}
                                                            </Typography>
                                                        </Stack>

                                                        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                                            <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {user.address.city}, {user.address.state}, {user.address.country}
                                                            </Typography>
                                                        </Stack>

                                                        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
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
                    </Box>
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
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                        pr: 1,
                    }}
                >
                    {selectedUser ? (
                        <Stack spacing={2.5}>
                            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                                <Avatar
                                    alt={selectedUser.username}
                                    src={selectedUser.image}
                                    sx={{ width: 72, height: 72 }}
                                />
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        {selectedUser.firstName} {selectedUser.lastName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        @{selectedUser.username}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedUser.age} лет {selectedUser.gender === "male" ? "Мужчина" : "Женщина"}
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
                                    {selectedUser.company.title} {selectedUser.company.department}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Банк
                                </Typography>
                                <Typography variant="body1">{selectedUser.bank.cardType}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {selectedUser.bank.currency}  {selectedUser.bank.iban}
                                </Typography>
                            </Box>
                        </Stack>
                    ) : (
                        <Typography color="text.secondary">Пользователь не выбран</Typography>
                    )}
                </Box>
            </Paper>
        </Stack>
    );
};

export default UsersList;
