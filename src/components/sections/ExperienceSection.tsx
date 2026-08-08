import { GlowCard, SectionHeader } from '../ui';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import { Box, Chip, Stack, Typography } from '@mui/material';

const experiences = [
  {
    role: 'Senior Full Stack Engineer',
    company: 'Tech Innovators',
    period: '2023 - Present',
    description: 'Leading the development of cloud-native applications using React and Node.js.',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Creative Solutions',
    period: '2021 - 2023',
    description: 'Built and maintained multiple client projects with a focus on UI/UX and performance.',
    skills: ['Next.js', 'PostgreSQL', 'TailwindCSS'],
  },
];

export const ExperienceSection = () => (
  <Box component="section" id="experience">
    <SectionHeader title="Professional experience" subtitle="Building reliable products and thoughtful web experiences." />
    <Stack spacing={2}>
      {experiences.map((experience) => (
        <GlowCard key={`${experience.company}-${experience.period}`}>
          <Stack spacing={2.5} sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'space-between' }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                <BusinessCenterRoundedIcon color="secondary" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography component="h3" variant="h5">{experience.role}</Typography>
                  <Typography color="secondary.main" sx={{ fontWeight: 700 }}>{experience.company}</Typography>
                </Box>
              </Stack>
              <Chip label={experience.period} size="small" variant="outlined" sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }} />
            </Stack>
            <Typography color="text.secondary">{experience.description}</Typography>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
            {experience.skills.map((skill) => (
                <Chip key={skill} label={skill} size="small" />
            ))}
            </Stack>
          </Stack>
        </GlowCard>
      ))}
    </Stack>
  </Box>
);
