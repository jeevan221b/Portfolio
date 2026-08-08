type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <Stack component="header" spacing={1.5} sx={{ mb: { xs: 3.5, md: 5 } }}>
    <Typography component="h2" variant="h3">{title}</Typography>
    <Box sx={{ width: 56, height: 4, borderRadius: 2, background: 'linear-gradient(90deg, #8b5cf6, #22d3ee)' }} />
    {subtitle && <Typography color="text.secondary" sx={{ maxWidth: 'md' }}>{subtitle}</Typography>}
  </Stack>
);
import { Box, Stack, Typography } from '@mui/material';
