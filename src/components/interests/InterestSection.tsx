import { motion } from 'framer-motion'
import { interests } from '@/data/interests'
import { InterestCard } from './InterestCard'
import { HandDrawnTitle } from '../skills/HandDrawnTitle'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export function InterestSection() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <HandDrawnTitle title="兴趣领域" subtitle="探索，求知" icon="💡" />

        {/* 手绘风格引言 */}
        <motion.div
          className="relative mb-10 p-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {/* 手绘引号 */}
          <div className="absolute top-0 left-2 text-6xl text-accent/20 font-serif">"</div>
          <div className="absolute bottom-0 right-2 text-6xl text-accent/20 font-serif rotate-180">
            "
          </div>

          {/* 手绘边框 */}
          <svg
            className="absolute inset-0 w-full h-full text-accent/30 pointer-events-none"
            viewBox="0 0 400 120"
            preserveAspectRatio="none"
          >
            <motion.rect
              x="2"
              y="2"
              width="396"
              height="116"
              rx="20"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 4"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />
          </svg>

          <p className="text-center text-secondary italic relative z-10">
            技术始终都要坚持为人民服务
            <br />
            坚持技术是为创造好的产品
          </p>
        </motion.div>

        {/* 兴趣卡片网格 */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {interests.map((interest, index) => (
            <InterestCard key={interest.title} interest={interest} index={index} />
          ))}
        </motion.div>

        {/* 底部装饰 */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2 text-secondary text-sm">
            <span className="w-8 h-px bg-accent/30" />
            <span>永远保持学习的热情</span>
            <span className="w-8 h-px bg-accent/30" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
