import { motion } from 'framer-motion'

interface HandDrawnGreetingProps {
  name: string
  bio: string
}

export function HandDrawnGreeting({ name, bio }: HandDrawnGreetingProps) {
  return (
    <div className="relative">
      {/* 手绘问候语 */}
      <motion.h1
        className="text-3xl text-center lg:text-left text-balance relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 flex-wrap justify-center lg:justify-start">
          {/* Hi there 带手绘效果 */}
          <span className="relative inline-block">
            <span>Hi there</span>
            <motion.svg
              className="absolute -bottom-1 left-0 w-full h-3 text-accent"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <path
                d="M2 8C20 4 40 6 60 4C80 2 95 6 98 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </motion.svg>
          </span>
          
          <span>, I'm</span>
          
          {/* 名字带手绘高亮 */}
          <span className="relative inline-block font-bold">
            <span className="relative z-10">{name}</span>
            <motion.span
              className="absolute -z-1 top-[20%] left-[-4px] right-[-4px] h-[70%] bg-accent/25 rounded-sm"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{ transformOrigin: 'left', rotate: '-2deg' }}
            />
            {/* 手绘边框装饰 */}
            <svg
              className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] text-accent/20 pointer-events-none"
              viewBox="0 0 120 50"
              preserveAspectRatio="none"
            >
              <motion.rect
                x="2"
                y="2"
                width="116"
                height="46"
                rx="8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="6 3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </svg>
          </span>
          
          {/* 挥手动画 */}
          <motion.span
            className="inline-block text-2xl"
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }}
          >
            👋
          </motion.span>
        </span>
      </motion.h1>

      {/* Bio 介绍 */}
      <motion.div
        className="mt-3 text-center lg:text-left"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="relative inline-block">
          {/* 手绘引号装饰 */}
          <span className="absolute -left-4 -top-2 text-2xl text-accent/30 font-serif">"</span>
          <span className="text-lg text-primary">{bio}</span>
          <span className="absolute -right-4 -bottom-2 text-2xl text-accent/30 font-serif rotate-180">"</span>
        </div>
      </motion.div>
    </div>
  )
}
