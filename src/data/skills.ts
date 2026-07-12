export interface Skill {
  name: string
  icon: string
  color: string
}

export interface SkillCategory {
  title: string
  icon: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: '机器学习/人工智能',
    icon: 'icon-pantone',
    skills: [
      { name: 'Agent', icon: '⚛️', color: '#61DAFB' },
      { name: '时间序列分析', icon: '📈', color: '#4FC08D' },
      { name: 'CV', icon: '👁️', color: '#3178C6' },
      { name: 'NLP', icon: '📝', color: '#06B6D4' },
      { name: 'ML', icon: '🧠', color: '#000000' },
    ],
  },
  {
    title: '金融科技',
    icon: 'icon-server',
    skills: [
      { name: '区块链', icon: '⛓️', color: '#339933' },
      { name: '量化交易', icon: '📊', color: '#3776AB' },
      { name: '金融大数据分析', icon: '💹', color: '#4169E1' },
      { name: '金融风控', icon: '🛡️', color: '#47A248' },
    ],
  },
  {
    title: '软件/系统开发',
    icon: 'icon-tools',
    skills: [
      { name: 'Fast API', icon: '⚡', color: '#F05032' },
      { name: 'React', icon: '⚛️', color: '#2496ED' },
      { name: 'Flutter', icon: '💙', color: '#02569B' },
      { name: 'Docker', icon: '🐳', color: '#F24E1E' },
      { name: 'Linux', icon: '🐧', color: '#FCC624' },
    ],
  },
  {
    title: '数据库/大数据分布式',
    icon: 'icon-computer',
    skills: [
      { name: 'PostgreSQL', icon: '🐘', color: '#4169E1' },
      { name: 'Redis', icon: '🔴', color: '#DC382D' },
      { name: 'MongoDB', icon: '🌿', color: '#47A248' },
      { name: 'Neo4j', icon: '🔵', color: '#4581C3' },
      { name: 'Spark', icon: '⚡', color: '#E25A1C' },
    ],
  },
]
