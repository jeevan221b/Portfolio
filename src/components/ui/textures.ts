// Layered radial-glow + grid texture used to give image-less glass panels
// (project cards, experience accordions, dialogs) the same "smoky" look as
// the photographic cards. `position` shifts the glow so repeated uses don't
// look identical.
export const smokyTexture = (position = "12% 15%") =>
  [
    `radial-gradient(circle at ${position}, rgba(74,158,255,0.14), transparent 55%)`,
    "linear-gradient(135deg, rgba(74,158,255,0.05), transparent 65%)",
    "repeating-linear-gradient(115deg, rgba(255,255,255,0.035) 0, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 64px)",
    "repeating-linear-gradient(25deg, rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 64px)",
  ].join(", ");
