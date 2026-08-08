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

export const ExperienceSection = () => (
  <Box component="section" id="experience">
    <SectionHeader
      title="Professional experience"
      subtitle="Building reliable products and thoughtful web experiences."
    />
    <Stack spacing={2}>
      {experiences.map((experience) => (
        <Accordion
          key={`${experience.company}-${experience.period}`}
          disableGutters
          elevation={0}
          sx={{
            overflow: "hidden",
            border: 1,
            borderColor: "divider",
            borderRadius: "16px !important",
            transition:
              "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
            "&:hover": {
              borderColor: "primary.main",
              boxShadow: "0 16px 36px rgba(124, 92, 255, 0.18)",
              transform: "translateY(-4px)",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreRoundedIcon color="secondary" />}
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
                <BusinessCenterRoundedIcon color="secondary" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography component="h3" variant="h5">
                    {experience.role}
                  </Typography>
                  <Typography color="secondary.main" sx={{ fontWeight: 700 }}>
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
