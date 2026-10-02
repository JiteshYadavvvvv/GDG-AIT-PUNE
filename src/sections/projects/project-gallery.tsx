import type { Project } from "./data";
import { ProjectCard } from "./project-card";

interface ProjectGalleryProps {
  projects: Project[];
}

const ROTATIONS = [-1.5, 1, -1];

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          delay={index * 0.08}
          rotation={ROTATIONS[index % ROTATIONS.length]}
        />
      ))}
    </div>
  );
}
