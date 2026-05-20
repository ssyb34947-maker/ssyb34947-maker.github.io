export interface Skill {
  name: string
  icon: string
  color: string
  description: string
  level: '熟悉' | '掌握' | '了解' | '初学'
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
      { name: 'Agent', icon: '⚛️', color: '#61DAFB', description: '智能体，好玩', level: '熟悉' },
      {
        name: '时间序列分析',
        icon: '💚',
        color: '#4FC08D',
        description: '等我学会了，一定要把亏的钱赚回来',
        level: '熟悉',
      },
      { name: 'CV', icon: '🔷', color: '#3178C6', description: '了解的不多', level: '了解' },
      { name: 'NLP', icon: '🌊', color: '#06B6D4', description: '做的多点', level: '掌握' },
      { name: 'ML', icon: '▲', color: '#000000', description: '好用', level: '掌握' },
    ],
  },
  {
    title: '金融科技',
    icon: 'icon-server',
    skills: [
      { name: '区块链', icon: '🟢', color: '#339933', description: '在学了', level: '初学' },
      {
        name: '量化交易',
        icon: '🐍',
        color: '#3776AB',
        description: '目前处于亏钱状态',
        level: '了解',
      },
      {
        name: '金融大数据分析',
        icon: '🐘',
        color: '#4169E1',
        description: '在学了',
        level: '初学',
      },
      { name: '金融风控', icon: '🍃', color: '#47A248', description: '在学了', level: '初学' },
    ],
  },
  {
    title: '软件/系统开发',
    icon: 'icon-tools',
    skills: [
      {
        name: 'Fast API',
        icon: '🔀',
        color: '#F05032',
        description: '我就要用Python写后端',
        level: '熟悉',
      },
      { name: 'React', icon: '🐳', color: '#2496ED', description: '我爱手绘风', level: '了解' },
      { name: 'Docker', icon: '🎨', color: '#F24E1E', description: '确实好用', level: '了解' },
      {
        name: 'Linux',
        icon: '🐧',
        color: '#FCC624',
        description: '等我有钱了一定要买一台Linux服务器',
        level: '了解',
      },
    ],
  },
  {
    title: '数据库/大数据分布式',
    icon: 'icon-tools',
    skills: [
      {
        name: 'PostgreSQL',
        icon: '🔀',
        color: '#F05032',
        description: '确实常用，好用',
        level: '熟悉',
      },
      {
        name: 'Redis',
        icon: '🐳',
        color: '#2496ED',
        description: '大型系统必用，确实牛',
        level: '掌握',
      },
      { name: 'MongoDB', icon: '🎨', color: '#F24E1E', description: '用的不多', level: '了解' },
      {
        name: 'Neo4j',
        icon: '🐧',
        color: '#FCC624',
        description: '感觉PostgreSQL都能平替他',
        level: '了解',
      },
      {
        name: 'Spark',
        icon: '🐧',
        color: '#FCC624',
        description: '在学了，在学了，加急',
        level: '初学',
      },
    ],
  },
]
