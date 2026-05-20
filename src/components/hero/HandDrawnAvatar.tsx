import { motion } from 'framer-motion'

interface HandDrawnAvatarProps {
  src: string
  alt: string
}

export function HandDrawnAvatar({ src, alt }: HandDrawnAvatarProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      }}
    >
      {/* 外层手绘装饰圈 */}
      <svg
        className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] text-accent/20"
        viewBox="0 0 200 200"
      >
        <motion.circle
          cx="100"
          cy="100"
          r="95"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </svg>

      {/* 中层虚线装饰圈 */}
      <svg
        className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] text-accent/10"
        viewBox="0 0 200 200"
      >
        <motion.circle
          cx="100"
          cy="100"
          r="92"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />
      </svg>

      {/* 头像容器 */}
      <div
        className="relative size-[200px] lg:size-[300px] rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800"
        style={{
          boxShadow: '4px 4px 0 rgba(0,0,0,0.1), 8px 8px 0 rgba(0,0,0,0.05)',
        }}
      >
        {/* 手绘风格边框 */}
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-600 z-10 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
          }}
        />
        <img className="size-full object-cover" src={src} alt={alt} loading="lazy" />
      </div>

      {/* 装饰小点 */}
      <motion.div
        className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent/30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-accent/20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* 手绘星星装饰 */}
      <svg
        className="absolute -bottom-4 -right-4 w-12 h-12 text-accent/30"
        viewBox="0 0 48 48"
      >
        <motion.path
          d="M24 4 L27 18 L42 18 L30 26 L34 40 L24 32 L14 40 L18 26 L6 18 L21 18 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
      </svg>
    </motion.div>
  )
}
