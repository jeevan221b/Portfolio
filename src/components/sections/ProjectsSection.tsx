import { useRef, useState } from "react";
import { ArchitectureFlow, SectionHeader } from "../ui";
import { smokyTexture } from "../ui/textures";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, ButtonBase, Chip, Collapse, Grid, Link, Stack, Typography } from "@mui/material";
import projectNexus from "../../assets/project-nexus.png";
import projectSkywatcher from "../../assets/project-skywatcher.png";

type Variant = "large" | "tall" | "wide";

type ProjectLink = { label: string; href: string };

export type Project = {
  title: string;
  category: string;
  // Short what-is-it + why-I-built-it line — shown on the card itself, no
  // click required.
  summary: string;
  // Longer write-up, only shown once the card is expanded.
  idea: string;
  tech: string[];
  image: string | null;
  variant: Variant;
  // Optional — only defined once a project's real chain/links are provided.
  architecture?: string[];
  links?: ProjectLink[];
};

const projects: Project[] = [
  {
    title: "Nexus",
    category: "PERSONAL INFRASTRUCTURE",
    summary:
      "A self-hosted personal server built from an old Android phone — handling my media, automation, and personal tools without buying any new hardware.",
    idea: "Turned an unused Android phone into a self-hosted personal server — no extra hardware required. Termux provides the Linux environment, Nginx handles routing, and a lightweight Node service backed by SQLite powers media management, automation, and personal tools, all exposed through a secure Cloudflare tunnel.",
    tech: ["React", "Node", "SQLite", "Nginx", "Cloudflare"],
    image: projectNexus,
    variant: "large",
    architecture: ["Android", "Termux", "Nginx", "Node", "SQLite"],
  },
  {
    title: "SkyWatcher",
    category: "ASTRONOMY SYSTEM",
    summary:
      "An automated astronomy notification system that monitors upcoming celestial events and tells me when the sky is worth looking at.",
    idea: "Personal astronomy assistant that monitors celestial events and provides notifications for planets, Moon phases, and visibility.",
    tech: ["Python", "Telegram", "Astronomy", "Automation"],
    image: projectSkywatcher,
    variant: "tall",
  },
  {
    title: "Nexus Blog",
    category: "SELF-HOSTED PLATFORM",
    summary:
      "A personal blog self-hosted on my Nexus server, where I write about Raspberry Pi builds, automation experiments, and IoT tinkering.",
    idea: "A personal blog and writing space self-hosted on the same Nexus home server, sharing notes on Raspberry Pi, automation, and IoT experiments.",
    tech: ["Raspberry Pi", "Docker", "Nginx", "Markdown"],
    image: null,
    variant: "wide",
  },
];

const gridSize: Record<Variant, { xs: number; md: number }> = {
  large: { xs: 12, md: 8 },
  tall: { xs: 12, md: 4 },
  wide: { xs: 12, md: 12 },
};

// Clearance for the sticky floating nav pill so a scrolled-to card isn't
// tucked underneath it.
const STICKY_HEADER_OFFSET = 96;

export const ProjectsSection = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Top-aligns the card just below the sticky nav. When the card is short
  // enough to fit in the remaining viewport (true once fully expanded, for
  // every card here) this puts the whole thing on screen, not just its top
  // edge.
  const scrollCardIntoView = (title: string) => {
    const card = cardRefs.current[title];
    if (!card) return;
    const top = card.getBoundingClientRect().top + window.scrollY - STICKY_HEADER_OFFSET;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  };

  const handleToggle = (title: string) => {
    const next = expanded === title ? null : title;
    setExpanded(next);
    if (!next) return;

    // Expanding a card can move it (grid reflow puts a full-width card on
    // its own row), so wait a couple of frames for that layout change to
    // land before doing an initial, approximate scroll — this is still
    // measured against the collapsed header height, so it's only a first
    // pass. The Collapse's onEntered handler below does the precise, final
    // scroll once the panel has fully grown in.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollCardIntoView(title));
    });
  };

  return (
    <Box component="section" id="projects">
      <SectionHeader
        title="Personal Projects"
        subtitle="A few ideas I have shaped into usable, production-minded products."
        index="02 // PROJECTS"
      />
      <Grid container spacing={3}>
        {projects.map((project) => {
          const isExpanded = expanded === project.title;
          const panelId = `project-panel-${project.title.replace(/\s+/g, "-").toLowerCase()}`;

          return (
            <Grid
              key={project.title}
              size={isExpanded ? { xs: 12, md: 12 } : gridSize[project.variant]}
              sx={{ transition: "all 320ms ease" }}
            >
              <Box
                ref={(el: HTMLDivElement | null) => {
                  cardRefs.current[project.title] = el;
                }}
                sx={{
                  borderRadius: 3,
                  border: 1,
                  borderColor: isExpanded ? "primary.main" : "divider",
                  overflow: "hidden",
                  bgcolor: "rgba(10, 12, 16, 0.6)",
                  backdropFilter: "blur(16px)",
                  transition: "border-color 220ms ease, box-shadow 220ms ease",
                  boxShadow: isExpanded ? "0 16px 36px rgba(74, 158, 255, 0.18)" : "none",
                }}
              >
                <ButtonBase
                  component="div"
                  onClick={() => handleToggle(project.title)}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: isExpanded
                      ? { xs: 160, md: 180 }
                      : { xs: 360, md: project.variant === "wide" ? 320 : 500 },
                    display: "flex",
                    alignItems: "flex-end",
                    textAlign: "left",
                    transition: "transform 180ms ease, height 320ms ease",
                    "&:hover": !isExpanded ? { transform: "translateY(-4px)" } : undefined,
                    "&:focus-visible": {
                      outline: "2px solid",
                      outlineColor: "primary.main",
                      outlineOffset: -2,
                    },
                  }}
                >
                  {project.image ? (
                    <Box
                      component="img"
                      src={project.image}
                      alt=""
                      aria-hidden
                      sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: isExpanded ? 0.12 : 0.3,
                        transition: "opacity 320ms ease",
                      }}
                    />
                  ) : (
                    <Box
                      aria-hidden
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: smokyTexture("12% 15%"),
                        opacity: isExpanded ? 0.5 : 1,
                        transition: "opacity 320ms ease",
                      }}
                    />
                  )}
                  <Box
                    aria-hidden
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: isExpanded
                        ? "linear-gradient(0deg, #050505 45%, rgba(5,5,5,0.6) 100%)"
                        : "linear-gradient(0deg, #050505 15%, rgba(5,5,5,0.45) 55%, rgba(5,5,5,0) 100%)",
                      transition: "background 320ms ease",
                    }}
                  />
                  <Stack
                    spacing={isExpanded ? 1 : 1.5}
                    sx={{
                      position: "relative",
                      width: "100%",
                      p: { xs: 3, md: 4 },
                      py: isExpanded ? { xs: 2, md: 2.5 } : { xs: 3, md: 4 },
                      transition: "padding 320ms ease",
                    }}
                  >
                    <Typography
                      color="primary.main"
                      sx={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textShadow: "0 0 12px rgba(74, 158, 255, 0.4)",
                      }}
                    >
                      {project.category}
                    </Typography>
                    <Stack
                      direction="row"
                      sx={{ alignItems: "center", justifyContent: "space-between", gap: 2 }}
                    >
                      <Typography
                        component="h3"
                        variant="h3"
                        sx={{
                          fontSize:
                            !isExpanded && project.variant === "large"
                              ? { xs: "1.9rem", md: "2.5rem" }
                              : { xs: "1.6rem", md: "1.9rem" },
                          transition: "font-size 320ms ease",
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexShrink: 0,
                          transition: "transform 220ms ease",
                          transform: isExpanded ? "rotate(180deg)" : "none",
                        }}
                      >
                        {isExpanded ? <CloseRoundedIcon /> : <ArrowOutwardRoundedIcon />}
                      </Box>
                    </Stack>
                    {!isExpanded && (
                      <>
                        <Typography
                          color="text.secondary"
                          sx={{
                            fontSize: "0.9rem",
                            lineHeight: 1.6,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 4,
                            overflow: "hidden",
                          }}
                        >
                          {project.summary}
                        </Typography>
                        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", pt: 0.5 }}>
                          {project.tech.slice(0, 4).map((technology) => (
                            <Chip key={technology} label={technology} size="small" />
                          ))}
                        </Stack>
                      </>
                    )}
                  </Stack>
                </ButtonBase>

                <Collapse
                  in={isExpanded}
                  timeout={380}
                  unmountOnExit
                  onEntered={() => scrollCardIntoView(project.title)}
                >
                  <Box id={panelId} sx={{ p: { xs: 3, md: 4 }, borderTop: 1, borderColor: "divider" }}>
                    <Stack spacing={4}>
                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 5 }}>
                          <Box
                            sx={{
                              position: "relative",
                              height: { xs: 160, sm: "100%" },
                              minHeight: 160,
                              borderRadius: 2,
                              border: 1,
                              borderColor: "divider",
                              overflow: "hidden",
                            }}
                          >
                            {project.image ? (
                              <Box
                                component="img"
                                src={project.image}
                                alt={`${project.title} preview`}
                                sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
                              />
                            ) : (
                              <Box
                                aria-hidden
                                sx={{ position: "absolute", inset: 0, backgroundImage: smokyTexture("70% 20%") }}
                              />
                            )}
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 7 }}>
                          <Stack spacing={1.5}>
                            <Typography
                              sx={{
                                fontSize: "0.68rem",
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                color: "text.secondary",
                              }}
                            >
                              THE IDEA
                            </Typography>
                            <Typography color="text.secondary">{project.idea}</Typography>
                          </Stack>
                        </Grid>
                      </Grid>

                      {project.architecture && (
                        <Stack spacing={1.5}>
                          <Typography
                            sx={{
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              letterSpacing: "0.15em",
                              color: "text.secondary",
                            }}
                          >
                            ARCHITECTURE
                          </Typography>
                          <ArchitectureFlow steps={project.architecture} size="full" />
                        </Stack>
                      )}

                      <Stack spacing={1.5}>
                        <Typography
                          sx={{
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            color: "text.secondary",
                          }}
                        >
                          TECHNOLOGIES
                        </Typography>
                        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                          {project.tech.map((technology) => (
                            <Chip key={technology} label={technology} size="small" />
                          ))}
                        </Stack>
                      </Stack>

                      {project.links && project.links.length > 0 && (
                        <Stack direction="row" spacing={3} sx={{ justifyContent: "flex-end" }}>
                          {project.links.map((link) => (
                            <Link
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              color="primary.main"
                              underline="hover"
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 0.5,
                                fontWeight: 700,
                                fontSize: "0.7rem",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                              }}
                            >
                              {link.label} <ArrowOutwardRoundedIcon fontSize="small" />
                            </Link>
                          ))}
                        </Stack>
                      )}
                    </Stack>
                  </Box>
                </Collapse>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
