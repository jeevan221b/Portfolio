import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { HeroSection, ExperienceSection, ProjectsSection } from './components/sections'

function App() {
  return (
    <>
      <Box component="header" sx={{ position: 'sticky', top: 0, zIndex: 10, py: { xs: 1.5, md: 2.5 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: { xs: 1, sm: 2 },
              px: { xs: 2, md: 4 },
              py: { xs: 1.25, md: 1.5 },
              borderRadius: 9999,
              border: 1,
              borderColor: 'divider',
              bgcolor: 'rgba(10, 12, 16, 0.7)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', minWidth: 0 }}>
              <CodeRoundedIcon color="primary" sx={{ flexShrink: 0 }} />
              <Typography
                noWrap
                sx={{ fontWeight: 800, fontSize: { xs: '0.9rem', md: '1.05rem' }, letterSpacing: '-0.02em' }}
              >
                Raj Diwakar
              </Typography>
            </Stack>
            <Stack direction="row" spacing={{ xs: 1.75, sm: 4 }} sx={{ flexShrink: 0 }}>
              <Link
                href="#experience"
                color="text.secondary"
                underline="none"
                sx={navLinkSx}
              >
                Experience
              </Link>
              <Link
                href="#projects"
                color="text.secondary"
                underline="none"
                sx={navLinkSx}
              >
                Projects
              </Link>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Box component="main">
        <Container maxWidth="lg">
          <Stack spacing={{ xs: 10, md: 16 }} sx={{ py: { xs: 7, md: 12 } }}>
            <HeroSection />
            <ExperienceSection />
            <ProjectsSection />
          </Stack>
        </Container>
      </Box>

      <Box component="footer" sx={{ bgcolor: '#050505', borderTop: 1, borderColor: 'divider', py: { xs: 5, md: 7 }, position: 'relative', overflow: 'hidden' }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}
          >
            © {new Date().getFullYear()} Raj Diwakar. Built with React and Material UI.
          </Typography>
        </Container>
        <Typography
          aria-hidden
          sx={{
            position: 'absolute',
            right: { xs: -12, md: 24 },
            bottom: -36,
            fontSize: { xs: '3.5rem', md: '6.5rem' },
            fontWeight: 800,
            color: 'rgba(255, 255, 255, 0.04)',
            letterSpacing: '-0.03em',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          RAJ DIWAKAR
        </Typography>
      </Box>
    </>
  )
}

const navLinkSx = {
  fontSize: { xs: '0.62rem', sm: '0.7rem' },
  fontWeight: 600,
  letterSpacing: { xs: '0.08em', sm: '0.15em' },
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  transition: 'color 150ms ease',
  '&:hover': { color: 'primary.main' },
} as const;

export default App
