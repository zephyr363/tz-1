import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";



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
                    sx={{ height: "100%", alignItems: "center", justifyContent: "space-between" }}
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
                                sx={{ lineHeight: 1.1, mb: 1, fontWeight: 700 }}
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

export default StatCard;