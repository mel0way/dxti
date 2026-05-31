/**
 * 计算用户在 4 个维度的得分
 * @param {Array} answers - [{ questionId, selectedDim }]
 * @returns {{ A: number, C: number, U: number, R: number, P: number, S: number, M: number, F: number }}
 */
export function calculateScores(answers) {
  const scores = { A: 0, P: 0, C: 0, S: 0, U: 0, M: 0, R: 0, F: 0 }
  answers.forEach(({ selectedDim }) => {
    if (scores[selectedDim] !== undefined) {
      scores[selectedDim] += 1
    }
  })
  return scores
}

/**
 * 计算余弦相似度
 * @param {number[]} vecA 用户向量 [学术分, 综合分, 都市分, 严谨分]
 * @param {number[]} vecB 大学向量
 * @returns {number} 0~1 之间的相似度
 */
export function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] * vecA[i]
    normB += vecB[i] * vecB[i]
  }
  if (normA === 0 || normB === 0) return 0
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

/**
 * 构建用户 4 维向量
 * 维度顺序：[学术, 综合, 都市, 严谨]
 * 每个维度取该方向得分
 */
export function buildUserVector(scores) {
  return [
    scores.A,  // 学术方向
    scores.C,  // 综合方向
    scores.U,  // 都市方向
    scores.R   // 严谨方向
  ]
}

/**
 * 判定人格类型
 * 比较每个维度的两个方向，取得分高者
 * 返回 16 种人格之一的索引
 */
const TYPE_MAP = {
  'ACUR': '卷王',
  'ACUF': '活人感',
  'ACMR': '如何呢',
  'ACMF': '爱你老己',
  'ASUR': '预制菜',
  'ASUF': '当个事儿办',
  'ASMR': '夯',
  'ASMF': '勇敢小羊',
  'PCUR': '嘉豪',
  'PCUF': '高雅企鹅',
  'PCMR': '我要验牌',
  'PCMF': '显眼包',
  'PSUR': '搭子',
  'PSUF': 'KSKBL',
  'PSMR': '豆包',
  'PSMF': '多邻国'
}

const TYPE_DESCRIPTIONS = {
  '卷王': '你是自习室最后一个走的人，什么事都要做到极致。自驱力是你最强的武器，你相信努力不会被辜负。',
  '活人感': '在这个 AI 生成一切的时代，你的真实和不伪装是最稀缺的品质。朋友圈敢发素颜，聊天敢说真话。',
  '如何呢': '天塌了你也只是一句"如何呢~又能怎~"。你用豁达消解焦虑，用幽默对抗内卷。你是朋友圈里最松弛的那个人。',
  '爱你老己': '你学会了理直气壮地爱自己。对自己好不是自私，是生存技能。每天睡前你都会在心里说一句"老己辛苦了"。',
  '预制菜': '你的生活像预制菜一样精确、高效、可复现。计划表精确到分钟，你享受秩序带来的掌控感。',
  '当个事儿办': '无论大事小事，你都认真对待。在你眼里，没有"随便搞搞"——健身当个事儿办，谈恋爱也当个事儿办。',
  '夯': '你就是 Hot 到发烫的存在。做什么都做到顶级，别人还在起步你已经到终点了。你就是别人口中的"别人家的孩子"。',
  '勇敢小羊': '你永远在给自己鼓掌。吃好一顿饭很棒，睡好一觉也很棒。你用温柔的方式对待自己，也温暖着身边的人。',
  '嘉豪': '你身上有一种"用力过猛"的少年气。也许有人在背后笑你，但多年后他们会怀念那个曾经拼尽全力的自己——就像怀念嘉豪。',
  '高雅企鹅': '你表面端庄优雅、一切 OK，内心早就在跳企鹅舞了。你的发疯是有格调的，体面地崩溃是一种高级技能。',
  '我要验牌': '你对不公平零容忍。"凭什么？"是你的口头禅。你用幽默的方式反抗，不内耗不较真，但绝不吃亏。',
  '显眼包': '你在人群中自带聚光灯。不是刻意张扬，而是你本身就足够有趣、足够特别，让人不得不注意你。',
  '搭子': '你是轻社交大师。学习搭子、吃饭搭子、考研搭子——你懂得在不同场景匹配不同的人，高效又不内耗。',
  'KSKBL': '你是接头暗号大师，圈层文化的原住民。别人听不懂的梗你全懂，你就是活的网络百科全书。',
  '豆包': '你是行走的答案之书，什么都知道一点。朋友有问题第一个想到的就是你，"问豆包"是你的专属称号。',
  '多邻国': '你不达目的绝不罢休。像那只绿色猫头鹰一样，友善但执着，温柔但不可拒绝。一旦定了目标，没人能拦住你。'
}

export function getPersonalityType(scores) {
  const key =
    (scores.A >= scores.P ? 'A' : 'P') +
    (scores.C >= scores.S ? 'C' : 'S') +
    (scores.U >= scores.M ? 'U' : 'M') +
    (scores.R >= scores.F ? 'R' : 'F')

  return {
    key,
    name: TYPE_MAP[key],
    description: TYPE_DESCRIPTIONS[TYPE_MAP[key]]
  }
}

/**
 * 匹配大学：计算所有大学的余弦相似度，返回排序后的结果
 * @param {number[]} userVector
 * @param {Array} universities
 * @returns {Array} 带 similarity 字段的大学列表，降序排列
 */
export function matchUniversities(userVector, universities) {
  return universities
    .map(uni => ({
      ...uni,
      similarity: cosineSimilarity(userVector, uni.vector)
    }))
    .sort((a, b) => b.similarity - a.similarity)
}

/**
 * 将余弦相似度归一化为百分比显示
 */
export function toPercentage(similarity) {
  return Math.round(similarity * 100)
}
