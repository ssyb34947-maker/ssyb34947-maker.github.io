import { motion } from 'framer-motion'
import { skillCategories } from '@/data/skills'
import { SkillCard } from './SkillCard'
import { HandDrawnTitle } from './HandDrawnTitle'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const categoryVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      type: 'spring',
    },
  },
}

export function SkillSection() {
  return (
    <section className="py-16">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <HandDrawnTitle title="技术栈" subtitle="技术学无止境，应用放在第一" icon="🛠️" />

        <motion.div
          className="space-y-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {skillCategories.map((category) => (
            <motion.div key={category.title} variants={categoryVariants} className="relative">
              {/* 手绘风格的分类标题 */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <i className={`iconfont ${category.icon} text-xl text-accent`} />
                  <svg
                    className="absolute -inset-2 w-8 h-8 text-accent/30"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M4 16C4 8 8 4 16 4C24 4 28 8 28 16C28 24 24 28 16 28C8 28 4 24 4 16Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      fill="none"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold relative">
                  {category.title}
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2 text-accent/40"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 4Q25 0 50 4T100 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </h3>
              </div>

              {/* 技能卡片网格 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
