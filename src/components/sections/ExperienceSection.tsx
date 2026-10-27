import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { experiences } from "../../data/experiences";
import { SectionHeader } from "../ui";
import { smokyTexture } from "../ui/textures";

const glowPositions = ["12% -20%", "88% 120%"];

export const ExperienceSection = () => (
  <Box component="section" id="experience">
    <SectionHeader
      title="Professional Experience"
      subtitle="Building reliable products and thoughtful web experiences."
      index="01 // EXPERIENCE"
    />
    <Stack spacing={2}>
      {experiences.map((experience, index) => (
        <Accordion
          key={`${experience.company}-${experience.period}`}
          disableGutters
          elevation={0}
          sx={{
            overflow: "hidden",
            border: 1,
            borderColor: "divider",
            borderRadius: "12px !important",
            bgcolor: "rgba(10, 12, 16, 0.6)",
            backgroundImage: smokyTexture(glowPositions[index % glowPositions.length]),
            backdropFilter: "blur(16px)",
            transition:
              "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
            "&:hover": {
              borderColor: "primary.main",
              boxShadow: "0 16px 36px rgba(74, 158, 255, 0.18)",
              transform: "translateY(-4px)",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreRoundedIcon color="primary" />}
            aria-controls={`${experience.company}-details`}
            id={`${experience.company}-header`}
            sx={{
              px: { xs: 2.5, md: 3.5 },
              py: 1,
              "&.Mui-expanded": { minHeight: 64 },
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ width: "100%", justifyContent: "space-between", pr: 1 }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "flex-start" }}
              >
                <BusinessCenterRoundedIcon color="primary" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography component="h3" variant="h5" sx={{ textTransform: "none" }}>
                    {experience.role}
                  </Typography>
                  <Typography color="primary.main" sx={{ fontWeight: 700 }}>
                    {experience.company}
                  </Typography>
                </Box>
              </Stack>
              <Chip
                label={experience.period}
                size="small"
                variant="outlined"
                sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
              />
            </Stack>
          </AccordionSummary>
          <AccordionDetails
            sx={{ px: { xs: 2.5, md: 3.5 }, pb: { xs: 2.5, md: 3.5 } }}
          >
            <Stack spacing={2.5}>
              <Typography color="text.secondary">
                {experience.description}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ flexWrap: "wrap" }}
              >
                {experience.skills.map((skill) => (
                  <Chip key={skill} label={skill} size="small" />
                ))}
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  </Box>
);
