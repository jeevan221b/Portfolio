import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { GradientText } from "../ui";

export const HeroSection = () => (
  <Box
    component="section"
    sx={{
      mx: "auto",
      textAlign: "center",
      py: { xs: 3, md: 7 },
    }}
  >
    <Stack spacing={{ xs: 3, md: 4 }} sx={{ alignItems: "center" }}>
      <Typography
        component="h1"
        variant="h2"
        sx={{ fontSize: { xs: "2.9rem", sm: "4.4rem", md: "5.5rem" } }}
      >
        Hi, I'm <GradientText>Raj Diwakar</GradientText>
      </Typography>
      <Typography
        color="text.secondary"
        sx={{
          maxWidth: 790,
          fontSize: { xs: "1rem", md: "1.2rem" },
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
  </Box>
);
