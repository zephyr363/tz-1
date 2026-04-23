import { useMemo } from "react";
import { useGetAllUsersQuery } from "./userAPI";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
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
import Skeleton from "@mui/material/Skeleton";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

import UsersList from "./UsersList";

const drawerWidth = 260;

type StatCardProps = {
    title: string;
    value: number | string;
    subtitle: string;
    icon: React.ReactNode;
    iconBg: string;
    loading?: boolean;
};

const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    iconBg,
    loading = false,
}: StatCardProps) => {
    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,1) 100%)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                },
            }}
        >
            <CardContent sx={{ p: 2.5 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1, fontWeight: 500 }}
                        >
                            {title}
                        </Typography>

                        {loading ? (
                            <Skeleton variant="text" width={90} height={42} />
                        ) : (
                            <Typography
                                variant="h4"
                                fontWeight={800}
                                sx={{ lineHeight: 1.1, mb: 1 }}
                            >
                                {value}
                            </Typography>
                        )}

                        <Typography variant="caption" color="text.secondary">
                            {subtitle}
                        </Typography>
                    </Box>

                    <Avatar
                        sx={{
                            bgcolor: iconBg,
                            width: 48,
                            height: 48,
                            boxShadow: 2,
                        }}
                    >
                        {icon}
                    </Avatar>
                </Stack>
            </CardContent>
        </Card>
    );
};

const Dashboard = () => {
    const { data, isLoading } = useGetAllUsersQuery();
    const users = data?.users ?? [];

    const stats = useMemo(() => {
        const totalUsers = users.length;
        const companies = new Set(users.map((user) => user.company.name)).size;
        const countries = new Set(users.map((user) => user.address.country)).size;
        const averageAge = totalUsers
            ? Math.round(users.reduce((acc, user) => acc + user.age, 0) / totalUsers)
            : 0;

        const maleCount = users.filter((user) => user.gender === "male").length;
        const femaleCount = users.filter((user) => user.gender === "female").length;
        const topGender =
            maleCount === femaleCount
                ? "Поровну"
                : maleCount > femaleCount
                    ? "Больше мужчин"
                    : "Больше женщин";

        return {
            totalUsers,
            companies,
            countries,
            averageAge,
            topGender,
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
                        <Typography variant="h6" fontWeight={700}>
                            Users Dashboard
                        </Typography>
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
                    <ListItemButton
                        sx={{
                            borderRadius: 3,
                            mb: 1,
                            bgcolor: "rgba(255,255,255,0.08)",
                        }}
                    >
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
                    height: "100vh",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
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

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                            <StatCard
                                title="Всего пользователей"
                                value={stats.totalUsers}
                                subtitle="Общее количество записей"
                                icon={<GroupOutlinedIcon />}
                                iconBg="primary.light"
                                loading={isLoading}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                            <StatCard
                                title="Компаний"
                                value={stats.companies}
                                subtitle="Уникальные места работы"
                                icon={<ApartmentOutlinedIcon />}
                                iconBg="success.light"
                                loading={isLoading}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                            <StatCard
                                title="Стран"
                                value={stats.countries}
                                subtitle="География пользователей"
                                icon={<PublicOutlinedIcon />}
                                iconBg="warning.light"
                                loading={isLoading}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                            <StatCard
                                title="Средний возраст"
                                value={stats.averageAge}
                                subtitle={stats.topGender}
                                icon={<TrendingUpOutlinedIcon />}
                                iconBg="secondary.light"
                                loading={isLoading}
                            />
                        </Grid>
                    </Grid>
                    <UsersList />
                </Stack>
            </Box>
        </Box>
    );
};

export default Dashboard;