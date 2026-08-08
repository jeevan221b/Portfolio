import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import { AppBar, Box, Container, Link, Stack, Toolbar, Typography } from '@mui/material';
import { HeroSection, ExperienceSection, ProjectsSection } from './components/sections'

function App() {
  return (
    <>
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(16px)', borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
            <Stack direction="row" spacing={1} sx={{ flexGrow: 1, alignItems: 'center' }}>
              <CodeRoundedIcon color="secondary" />
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Raj Diwakar</Typography>
            </Stack>
            <Stack direction="row" spacing={{ xs: 2, sm: 3 }}>
              <Link href="#experience" color="text.secondary" underline="hover" variant="body2">Experience</Link>
              <Link href="#projects" color="text.secondary" underline="hover" variant="body2">Projects</Link>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main">
        <Container maxWidth="lg">
          <Stack spacing={{ xs: 10, md: 16 }} sx={{ py: { xs: 7, md: 12 } }}>
            <HeroSection />
            <ExperienceSection />
            <ProjectsSection />
          </Stack>
        </Container>
      </Box>

      <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 4 }}>
        <Container maxWidth="lg">
          <Typography align="center" color="text.secondary" variant="body2">
            © {new Date().getFullYear()} Raj Diwakar. Built with React and Material UI.
          </Typography>
        </Container>
      </Box>
    </>
  )
}

export default App
