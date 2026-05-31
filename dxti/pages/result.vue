<template>
  <view class="result">
    <!-- 分享卡片内容区域 -->
    <view id="share-card" class="share-card">
      <!-- 人格类型 -->
      <view class="type-section">
        <text class="type-label">🎉 你的大学人格类型</text>
        <view class="type-badge">
          <text class="type-name">{{ personality.name }}</text>
        </view>
        <text class="type-desc">{{ personality.description }}</text>
      </view>

      <view class="divider"></view>

      <!-- Top 3 大学 -->
      <view class="uni-section">
        <text class="section-title">🎯 与你最匹配的大学</text>

        <view class="uni-card gold" v-if="top3[0]">
          <text class="rank-badge">🥇 匹配度 {{ toPercent(top3[0].similarity) }}%</text>
          <text class="uni-name">{{ top3[0].name }}</text>
          <text class="uni-tags">{{ top3[0].tags.join(' × ') }}</text>
        </view>

        <view class="uni-card silver" v-if="top3[1]">
          <text class="rank-badge">🥈 匹配度 {{ toPercent(top3[1].similarity) }}%</text>
          <text class="uni-name">{{ top3[1].name }}</text>
          <text class="uni-tags">{{ top3[1].tags.join(' × ') }}</text>
        </view>

        <view class="uni-card bronze" v-if="top3[2]">
          <text class="rank-badge">🥉 匹配度 {{ toPercent(top3[2].similarity) }}%</text>
          <text class="uni-name">{{ top3[2].name }}</text>
          <text class="uni-tags">{{ top3[2].tags.join(' × ') }}</text>
        </view>
      </view>

      <view class="footer-note">
        <text>DXTI · 大学人格类型测试</text>
      </view>

      <!-- 二维码占位区 -->
      <view class="qr-section">
        <view class="qr-placeholder">
          <text class="qr-text">扫码测测你的大学人格 →</text>
        </view>
      </view>
    </view>

    <!-- 操作按钮 -->
    <view class="actions">
      <view class="btn-share" @click="handleShare">
        <text>📤 生成分享图</text>
      </view>
      <view class="btn-retry" @click="handleRetry">
        <text>🔄 重新测试</text>
      </view>
    </view>
  </view>
</template>

<script>
import { calculateScores, buildUserVector, getPersonalityType, matchUniversities } from '@/utils/scoring.js'
import { generateShareImage } from '@/utils/share.js'
import universities from '@/data/universities.json'

export default {
  name: 'Result',
  data() {
    return {
      personality: { name: '', description: '' },
      top3: [],
      scores: {}
    }
  },
  onLoad(options) {
    const answers = JSON.parse(decodeURIComponent(options.answers || '[]'))
    this.computeResult(answers)
  },
  methods: {
    computeResult(answers) {
      const scores = calculateScores(answers)
      const userVector = buildUserVector(scores)
      const personality = getPersonalityType(scores)
      const matched = matchUniversities(userVector, universities)

      this.scores = scores
      this.personality = personality
      this.top3 = matched.slice(0, 3)
    },
    toPercent(sim) {
      return Math.round(sim * 100)
    },
    async handleShare() {
      const ok = await generateShareImage('#share-card', 'dxti-result.png')
      if (ok) {
        uni.showToast({ title: '图片已保存', icon: 'success' })
      } else {
        uni.showToast({ title: '生成失败，请重试', icon: 'none' })
      }
    },
    handleRetry() {
      uni.navigateTo({ url: '/pages/quiz' })
    }
  }
}
</script>

<style scoped>
.result {
  min-height: 100vh;
  padding: 24px 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.share-card {
  width: 100%;
  max-width: 380px;
  background: #fff;
  border-radius: 20px;
  padding: 28px 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.type-section {
  text-align: center;
  margin-bottom: 20px;
}

.type-label {
  font-size: 0.8rem;
  color: #888;
  display: block;
  margin-bottom: 12px;
}

.type-badge {
  display: inline-block;
  background: linear-gradient(135deg, #f8f4fc, #e8faf8);
  border-radius: 14px;
  padding: 10px 24px;
  margin-bottom: 12px;
}

.type-name {
  font-size: 1.6rem;
  font-weight: 800;
  color: #88619a;
}

.type-desc {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.6;
}

.divider {
  height: 1px;
  background: #eee;
  margin: 20px 0;
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  display: block;
  margin-bottom: 16px;
  text-align: center;
}

.uni-card {
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 10px;
}

.uni-card.gold {
  background: #fdf6f0;
  border: 2px solid #f4c542;
}

.uni-card.silver {
  background: #f5f5f5;
}

.uni-card.bronze {
  background: #fafafa;
}

.rank-badge {
  font-size: 0.75rem;
  color: #999;
  display: block;
  margin-bottom: 4px;
}

.uni-name {
  font-size: 1.2rem;
  font-weight: 800;
  color: #333;
  display: block;
}

.uni-tags {
  font-size: 0.8rem;
  color: #888;
  margin-top: 4px;
  display: block;
}

.footer-note {
  text-align: center;
  margin-top: 20px;
  font-size: 0.7rem;
  color: #ccc;
}

.qr-section {
  text-align: center;
  margin-top: 12px;
}

.qr-placeholder {
  display: inline-block;
  border: 2px dashed #ddd;
  border-radius: 10px;
  padding: 16px 24px;
}

.qr-text {
  font-size: 0.75rem;
  color: #bbb;
}

.actions {
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.btn-share {
  background: linear-gradient(135deg, #88619a, #33b5a9);
  border-radius: 50px;
  padding: 16px;
  text-align: center;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
}

.btn-retry {
  background: #f5f5f5;
  border-radius: 50px;
  padding: 16px;
  text-align: center;
  color: #888;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
}
</style>
