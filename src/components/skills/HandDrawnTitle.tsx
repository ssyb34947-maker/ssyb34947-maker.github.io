import { motion } from 'framer-motion'

interface HandDrawnTitleProps {
  title: string
  subtitle?: string
  icon?: string
}

export function HandDrawnTitle({ title, subtitle, icon }: HandDrawnTitleProps) {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative inline-block">
        {/* 手绘装饰圈 */}
        <svg
          className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] text-accent/20"
          viewBox="0 0 200 80"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M10 40C10 20 30 10 60 10C100 10 140 10 160 20C180 30 190 50 180 60C170 70 140 75 100 75C60 75 30 70 20 60C10 50 10 40 10 40Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </svg>

        <h2 className="text-3xl font-bold relative inline-flex items-center gap-2">
          {icon && <span className="text-2xl">{icon}</span>}
          <span>{title}</span>
        </h2>

        {/* 手绘下划线 */}
        <svg
          className="absolute -bottom-2 left-0 w-full h-3 text-accent"
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M2 8C20 4 40 6 60 4C80 2 95 6 98 8"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </svg>
      </div>

      {subtitle && (
        <motion.p
          className="text-secondary mt-4 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
