import { useGetAllUsersQuery } from "./userAPI";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

import UsersList from "./UsersList";
import { useDashboardContext } from "./DashboardContext";
import StatCard from "./StatCard";



const Dashboard = () => {
    const { totalUsers, companies, countries, averageAge, topGender } = useDashboardContext();
    const { isLoading } = useGetAllUsersQuery();
    const drawerWidth = 260;
    
    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f6f8fb" }}>

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
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
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
                        <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
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
                                value={totalUsers}
                                subtitle="Общее количество записей"
                                icon={<GroupOutlinedIcon />}
                                iconBg="primary.light"
                                loading={isLoading}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                            <StatCard
                                title="Компаний"
                                value={companies}
                                subtitle="Уникальные места работы"
                                icon={<ApartmentOutlinedIcon />}
                                iconBg="success.light"
                                loading={isLoading}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                            <StatCard
                                title="Стран"
                                value={countries}
                                subtitle="География пользователей"
                                icon={<PublicOutlinedIcon />}
                                iconBg="warning.light"
                                loading={isLoading}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                            <StatCard
                                title="Средний возраст"
                                value={averageAge}
                                subtitle={topGender}
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
