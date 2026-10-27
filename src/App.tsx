import { CursorGlow, ScrollProgress, Starfield } from './components/fx';
import { useSmoothScroll } from './components/motion';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { About, Contact, Experience, Footer, Lab, Skills, Work } from './components/Sections';

export default function App() {
  useSmoothScroll();
  return (
    <>
      <Starfield />
      <div className="grain" aria-hidden />
      <CursorGlow />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Work />
        <Lab />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
