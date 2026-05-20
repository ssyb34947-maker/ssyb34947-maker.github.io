export interface Interest {
  title: string
  emoji: string
  description: string
  color: string
  tags: string[]
}

export const interests: Interest[] = [
  {
    title: '人工智能',
    emoji: '🤖',
    description: '探索 AI 的无限可能性',
    color: '#8B5CF6',
    tags: ['LLM', '机器学习', 'agent', 'Diffusion'],
  },
  {
    title: '金融科技',
    emoji: '🌟',
    description: '参与金融科技项目，关注金融科技趋势',
    color: '#F59E0B',
    tags: ['区块链', '量化交易', '风控'],
  },
  {
    title: '创意软件开发',
    emoji: '✍️',
    description: '我爱vibe coding，使我生产力暴增',
    color: '#10B981',
    tags: ['项目管理', 'vibe coding', '沟通'],
  },
]
