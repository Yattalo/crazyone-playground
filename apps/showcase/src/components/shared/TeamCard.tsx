import { motion } from "motion/react";
import { Twitter, Github, Linkedin } from "lucide-react";
import type { TeamMember } from "../../data/team-members";

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

export function TeamCard({ member, index = 0 }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {member.bio}
        </p>
        <div className="flex items-center gap-3">
          {member.social.twitter && (
            <a
              href={`https://twitter.com/${member.social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {member.social.github && (
            <a
              href={`https://github.com/${member.social.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {member.social.linkedin && (
            <a
              href={`https://linkedin.com/in/${member.social.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
