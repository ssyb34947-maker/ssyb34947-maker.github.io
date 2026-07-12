import { motion } from 'framer-motion'
import type { Skill } from '@/data/skills'

interface SkillCardProps {
  skill: Skill
  index: number
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, rotate: -2 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: Math.random() * 4 - 2,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: 'spring',
      stiffness: 100,
    },
  }),
}

export function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      className="group relative"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      whileHover={{ scale: 1.05, rotate: 0 }}
    >
      <div
        className="relative p-4 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 hover:border-accent transition-colors duration-300"
        style={{
          boxShadow: '3px 3px 0 rgba(0,0,0,0.1)',
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <div className="flex-1 min-w-0">
            <span className="font-bold text-sm truncate">{skill.name}</span>
          </div>
        </div>

        <div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: skill.color }}
        />
      </div>
    </motion.div>
  )
}
