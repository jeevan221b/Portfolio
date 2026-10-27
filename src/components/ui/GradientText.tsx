import type { ReactNode } from 'react';
import { Box } from '@mui/material';

type GradientTextProps = {
  children: ReactNode;
  className?: string;
};

// Solid accent colour with a soft glow — matches the Figma design's
// treatment for emphasised words (e.g. "PROBLEM SOLVER.").
export const GradientText = ({ children, className = '' }: GradientTextProps) => (
  <Box
    component="span"
    className={className}
    sx={{
      color: 'primary.main',
      textShadow: '0 0 20px rgba(74, 158, 255, 0.45)',
      display: 'inline-block',
    }}
  >
    {children}
  </Box>
);
