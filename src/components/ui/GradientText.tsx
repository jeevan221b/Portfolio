import type { ReactNode } from 'react';
import { Box } from '@mui/material';

type GradientTextProps = {
  children: ReactNode;
  className?: string;
};

export const GradientText = ({ children, className = '' }: GradientTextProps) => (
  <Box
    component="span"
    className={className}
    sx={{
      background: 'linear-gradient(120deg, #a78bfa, #22d3ee)',
      backgroundClip: 'text',
      color: 'transparent',
      display: 'inline-block',
    }}
  >
    {children}
  </Box>
);
