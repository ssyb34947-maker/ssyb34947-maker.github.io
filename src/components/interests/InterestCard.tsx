import { motion } from 'framer-motion'
import type { Interest } from '@/data/interests'

interface InterestCardProps {
  interest: Interest
  index: number
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: Math.random() * 6 - 3,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      type: 'spring',
      stiffness: 120,
      damping: 12,
    },
  }),
}

export function InterestCard({ interest, index }: InterestCardProps) {
  return (
    <motion.div
      className="group relative"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0,
        transition: { duration: 0.2 }
      }}
    >
      <div
        className="relative p-5 h-full rounded-3xl border-2 border-dashed transition-all duration-300 overflow-hidden"
        style={{
          backgroundColor: `${interest.color}08`,
          borderColor: `${interest.color}40`,
          boxShadow: `4px 4px 0 ${interest.color}30`,
        }}
      >
        {/* 手绘装饰角标 */}
        <div 
          className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-lg"
          style={{ backgroundColor: interest.color }}
        >
          {interest.emoji}
        </div>

        {/* 手绘胶带效果 */}
        <div 
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 opacity-60"
          style={{
            backgroundColor: interest.color,
            transform: 'translateX(-50%) rotate(-2deg)',
            maskImage: 'repeating-linear-gradient(90deg, black 0px, black 8px, transparent 8px, transparent 12px)',
            WebkitMaskImage: 'repeating-linear-gradient(90deg, black 0px, black 8px, transparent 8px, transparent 12px)',
          }}
        />

        <div className="pt-2">
          <h3 
            className="text-lg font-bold mb-2"
            style={{ color: interest.color }}
          >
            {interest.title}
          </h3>
          
          <p className="text-sm text-secondary mb-4 line-clamp-2">
            {interest.description}
          </p>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            {interest.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full border"
                style={{
                  borderColor: `${interest.color}50`,
                  color: interest.color,
                  backgroundColor: `${interest.color}10`,
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 悬停时的手绘圆圈装饰 */}
        <svg
          className="absolute -bottom-2 -right-2 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          viewBox="0 0 48 48"
        >
          <motion.circle
            cx="24"
            cy="24"
            r="18"
            stroke={interest.color}
            strokeWidth="2"
            strokeDasharray="4 2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileHover={{ pathLength: 1 }}
          />
        </svg>
      </div>
    </motion.div>
  )
}
