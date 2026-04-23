import { useMemo } from "react";
import { useGetAllUsersQuery } from "./userAPI";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

import UsersList from "./UsersList";

const drawerWidth = 260;

const Dashboard = () => {
    const { data } = useGetAllUsersQuery();
    const users = data?.users ?? [];

    const stats = useMemo(() => {
        const companies = new Set(users.map((user) => user.company.name)).size;
        const countries = new Set(users.map((user) => user.address.country)).size;
        const averageAge = users.length
            ? Math.round(users.reduce((acc, user) => acc + user.age, 0) / users.length)
            : 0;

        return {
            totalUsers: users.length,
            companies,
            countries,
            averageAge,
        };
    }, [users]);

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f6f8fb" }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    bgcolor: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(8px)",
                    color: "text.primary",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Интерактивная панель пользователей
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <Chip label="RTK Query" color="primary" variant="outlined" />
                        <Avatar sx={{ width: 36, height: 36 }}>R</Avatar>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        borderRight: "1px solid",
                        borderColor: "divider",
                        bgcolor: "#111827",
                        color: "#fff",
                    },
                }}
            >
                <Toolbar>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ bgcolor: "primary.main" }}>D</Avatar>
                        <Box>
                            <Typography variant="subtitle1" fontWeight={700}>
                                Дашборд
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.75 }}>
                                Админ панель
                            </Typography>
                        </Box>
                    </Stack>
                </Toolbar>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

                <List sx={{ px: 1.5, py: 2 }}>
                    <ListItemButton sx={{ borderRadius: 3, mb: 1, bgcolor: "rgba(255,255,255,0.08)" }}>
                        <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                            <DashboardOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Главная" />
                    </ListItemButton>
                </List>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: `${drawerWidth}px`,
                }}
            >
                <Toolbar />

                <Stack spacing={3}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 5,
                            background:
                                "linear-gradient(135deg, rgba(25,118,210,0.10), rgba(156,39,176,0.10))",
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Typography variant="h4" fontWeight={800} gutterBottom>
                            Добро пожаловать
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Просматривай пользователей, фильтруй список и смотри подробную информацию справа.
                        </Typography>
                    </Paper>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <Card sx={{ flex: 1, borderRadius: 4 }}>
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography color="text.secondary" variant="body2">
                                            Всего пользователей
                                        </Typography>
                                        <Typography variant="h4" fontWeight={700}>
                                            {stats.totalUsers}
                                        </Typography>
                                    </Box>
                                    <Avatar sx={{ bgcolor: "primary.light" }}>
                                        <GroupOutlinedIcon />
                                    </Avatar>
                                </Stack>
                            </CardContent>
                        </Card>

                        <Card sx={{ flex: 1, borderRadius: 4 }}>
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography color="text.secondary" variant="body2">
                                            Компаний
                                        </Typography>
                                        <Typography variant="h4" fontWeight={700}>
                                            {stats.companies}
                                        </Typography>
                                    </Box>
                                    <Avatar sx={{ bgcolor: "success.light" }}>
                                        <ApartmentOutlinedIcon />
                                    </Avatar>
                                </Stack>
                            </CardContent>
                        </Card>

                        <Card sx={{ flex: 1, borderRadius: 4 }}>
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography color="text.secondary" variant="body2">
                                            Стран
                                        </Typography>
                                        <Typography variant="h4" fontWeight={700}>
                                            {stats.countries}
                                        </Typography>
                                    </Box>
                                    <Avatar sx={{ bgcolor: "warning.light" }}>
                                        <PublicOutlinedIcon />
                                    </Avatar>
                                </Stack>
                            </CardContent>
                        </Card>

                        <Card sx={{ flex: 1, borderRadius: 4 }}>
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography color="text.secondary" variant="body2">
                                            Средний возраст
                                        </Typography>
                                        <Typography variant="h4" fontWeight={700}>
                                            {stats.averageAge}
                                        </Typography>
                                    </Box>
                                    <Avatar sx={{ bgcolor: "secondary.light" }}>
                                        <TrendingUpOutlinedIcon />
                                    </Avatar>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>

                    <UsersList />
                </Stack>
            </Box>
        </Box>
    );
};

export default Dashboard;