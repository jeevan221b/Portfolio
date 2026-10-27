import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import WorkHistoryRoundedIcon from "@mui/icons-material/WorkHistoryRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { Box, Button, Chip, Grid, Stack, Typography } from "@mui/material";
import { GradientText } from "../ui";
import heroBlueprint from "../../assets/hero-blueprint.png";

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Box
    sx={{
      height: "100%",
      p: { xs: 2.5, md: 3 },
      border: 1,
      borderColor: "divider",
      borderRadius: 3,
      bgcolor: "rgba(10, 12, 16, 0.6)",
      backdropFilter: "blur(16px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 2,
      minHeight: 120,
    }}
  >
    <Box sx={{ color: "text.secondary" }}>{icon}</Box>
    <Box>
      <Typography
        color="text.secondary"
        sx={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em" }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

export const HeroSection = () => (
  <Box
    component="section"
    sx={{ position: "relative", py: { xs: 3, md: 5 }, overflow: "hidden" }}
  >
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        top: -160,
        right: -160,
        width: 384,
        height: 384,
        borderRadius: "50%",
        bgcolor: "rgba(74, 158, 255, 0.12)",
        filter: "blur(80px)",
        pointerEvents: "none",
      }}
    />
    <Grid container spacing={{ xs: 6, md: 5 }} sx={{ position: "relative", alignItems: "center" }}>
      <Grid size={{ xs: 12, md: 7 }}>
        <Stack spacing={{ xs: 3, md: 4 }} sx={{ alignItems: "flex-start" }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              fontSize: { xs: "2.75rem", sm: "3.75rem", md: "4.6rem" },
              lineHeight: 1.02,
            }}
          >
            <Box component="span" sx={{ color: "text.secondary", display: "block" }}>
              Hi, I'm
            </Box>
            <Box component="span" sx={{ display: "block" }}>
              Raj <GradientText>Diwakar</GradientText>
            </Box>
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 620,
              fontSize: { xs: "1rem", md: "1.05rem" },
              lineHeight: 1.8,
            }}
          >
            I'm a software developer with nearly 3 years of professional experience,
            specializing in React, TypeScript, and JavaScript. I've worked on
            production applications across web development and AI-driven products,
            including intelligent recruitment and workflow solutions. I enjoy
            turning complex problems into simple, reliable software—from building
            production-grade user interfaces to experimenting with systems,
            automation, and self-hosted technology in my personal projects. Outside
            of my professional work, I build and maintain projects involving
            Raspberry Pi, Linux, automation, IoT, and astronomy, constantly
            exploring technologies beyond my everyday stack. I build software
            professionally. I build systems because I'm curious.
          </Typography>
          <Button
            href="#projects"
            variant="contained"
            size="large"
            endIcon={<ArrowDownwardRoundedIcon />}
          >
            Explore my work
          </Button>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              position: "relative",
              height: { xs: 200, md: 240 },
              borderRadius: 3,
              border: 1,
              borderColor: "divider",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(16px)",
              bgcolor: "rgba(10, 12, 16, 0.6)",
            }}
          >
            <Box
              component="img"
              src={heroBlueprint}
              alt=""
              aria-hidden
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.25,
                mixBlendMode: "screen",
              }}
            />
            <Chip
              label="Full-Stack Engineer"
              sx={{
                position: "relative",
                px: 1,
                borderRadius: 9999,
                borderColor: "rgba(74, 158, 255, 0.3)",
                color: "primary.main",
                bgcolor: "transparent",
              }}
            />
          </Box>
          <Grid container spacing={2}>
            <Grid size={6}>
              <StatCard
                icon={<WorkHistoryRoundedIcon />}
                label="EXPERIENCE"
                value="~3 YEARS"
              />
            </Grid>
            <Grid size={6}>
              <StatCard icon={<BuildRoundedIcon />} label="FOCUS" value="FULL-STACK" />
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  </Box>
);
