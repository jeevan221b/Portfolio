import { GlowCard, SectionHeader } from '../ui';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { Box, CardContent, Chip, Grid, Link, Stack, Typography } from '@mui/material';

const projects = [
  {
    title: 'AI Workspace',
    description: 'A collaborative platform for AI-powered productivity with real-time editing.',
    tech: ['OpenAI', 'WebSockets', 'Redux'],
  },
  {
    title: 'EcoTrack',
    description: 'Environmental monitoring dashboard with complex data visualizations.',
    tech: ['D3.js', 'Firebase', 'React Query'],
  },
  {
    title: 'Nexus Commerce',
    description: 'Next-generation e-commerce engine with headless architecture.',
    tech: ['Shopify', 'GraphQL', 'Next.js'],
  },
];

export const ProjectsSection = () => (
  <Box component="section" id="projects">
    <SectionHeader title="Selected projects" subtitle="A few ideas I have shaped into usable, production-minded products." />
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid key={project.title} size={{ xs: 12, md: 4 }}>
          <GlowCard>
            <CardContent sx={{ p: 3.5, '&:last-child': { pb: 3.5 } }}>
              <Stack spacing={2.5} sx={{ height: '100%' }}>
                <Typography component="h3" variant="h5">{project.title}</Typography>
                <Typography color="text.secondary" sx={{ flexGrow: 1 }}>{project.description}</Typography>
                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
            {project.tech.map((technology) => (
                    <Chip key={technology} label={technology} size="small" variant="outlined" />
            ))}
                </Stack>
                <Link href="#" color="secondary.main" underline="hover" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontWeight: 700 }}>
                  View project <ArrowOutwardRoundedIcon fontSize="small" />
                </Link>
              </Stack>
            </CardContent>
          </GlowCard>
        </Grid>
      ))}
    </Grid>
  </Box>
);
