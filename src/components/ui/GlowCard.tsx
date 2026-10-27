import type { ReactNode } from 'react';
import { Card, type SxProps, type Theme } from '@mui/material';

type GlowCardProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export const GlowCard = ({ children, sx }: GlowCardProps) => (
  <Card
    elevation={0}
    sx={{
      height: '100%',
      border: 1,
      borderColor: 'divider',
      bgcolor: 'rgba(10, 12, 16, 0.6)',
      backdropFilter: 'blur(16px)',
      transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
      '&:hover': {
        borderColor: 'primary.main',
        boxShadow: '0 16px 36px rgba(74, 158, 255, 0.18)',
        transform: 'translateY(-4px)',
      },
      ...sx,
    }}
  >
    {children}
  </Card>
);
