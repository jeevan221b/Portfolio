import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Stack, Typography } from "@mui/material";

type ArchitectureFlowProps = {
  steps: string[];
  size?: "compact" | "full";
};

// Renders a chain like "Android → Termux → Nginx → Node → SQLite" as
// connected pill tokens. `compact` is a plain single-line version for card
// previews; `full` is the larger, wrapping version for the expanded panel.
export const ArchitectureFlow = ({ steps, size = "full" }: ArchitectureFlowProps) => {
  if (size === "compact") {
    return (
      <Typography
        noWrap
        sx={{
          color: "text.secondary",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {steps.join("  →  ")}
      </Typography>
    );
  }

  return (
    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", alignItems: "center" }}>
      {steps.map((step, index) => (
        <Stack key={step} direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              px: 1.5,
              py: 0.75,
              borderRadius: 9999,
              border: 1,
              borderColor: "divider",
              bgcolor: "rgba(74, 158, 255, 0.06)",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "text.primary",
              }}
            >
              {step}
            </Typography>
          </Box>
          {index < steps.length - 1 && (
            <ArrowForwardRoundedIcon sx={{ fontSize: "1rem", color: "primary.main", flexShrink: 0 }} />
          )}
        </Stack>
      ))}
    </Stack>
  );
};
