import { Box, Stack, Typography } from '@mui/material';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  index?: string;
};

export const SectionHeader = ({ title, subtitle, index }: SectionHeaderProps) => (
  <Stack component="header" spacing={2} sx={{ mb: { xs: 4, md: 6 } }}>
    <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderBottom: 1,
        borderColor: 'divider',
        pb: { xs: 2, md: 3 },
      }}
    >
      <Typography
        component="h2"
        variant="h2"
        sx={{ fontSize: { xs: '2rem', sm: '2.75rem', md: '3rem' } }}
      >
        {title}
      </Typography>
      {index && (
        <Typography
          color="text.secondary"
          sx={{
            flexShrink: 0,
            fontWeight: 600,
            fontSize: '0.68rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {index}
        </Typography>
      )}
    </Stack>
    {subtitle && (
      <Box sx={{ maxWidth: 'md' }}>
        <Typography color="text.secondary">{subtitle}</Typography>
      </Box>
    )}
  </Stack>
);
