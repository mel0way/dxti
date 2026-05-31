<template>
  <view class="home">
    <view class="hero">
      <text class="logo">🧠</text>
      <text class="brand">DXTI</text>
      <text class="tagline">大学人格类型测试</text>
    </view>

    <view class="main-title">
      <text class="title-line">哪所大学</text>
      <text class="title-line">是你的命中注定？</text>
    </view>

    <view class="cards">
      <view class="card card-primary" @click="goQuiz">
        <view class="card-emoji">🧠</view>
        <view class="card-content">
          <text class="card-title">模拟测试</text>
          <text class="card-desc">40道有趣情景题，找出你的大学人格</text>
        </view>
        <text class="card-arrow">→</text>
      </view>

      <view class="card card-secondary" @click="goZhenti">
        <view class="card-emoji">📋</view>
        <view class="card-content">
          <text class="card-title">严谨测试</text>
          <text class="card-desc">最准确最真实的测试</text>
        </view>
        <text class="card-arrow">→</text>
      </view>
    </view>

    <view class="social-proof">
      <text class="proof-text">已有 12,345 人找到命中大学</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    goQuiz() {
      uni.navigateTo({ url: '/pages/quiz' })
    },
    goZhenti() {
      uni.navigateTo({ url: '/pages/zhenti' })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 40px 24px 32px;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}

.logo { font-size: 2.5rem; }

.brand {
  font-size: 1.3rem;
  font-weight: 700;
  color: $color-primary;
  margin-top: 4px;
}

.tagline {
  font-size: 0.8rem;
  color: $color-text-secondary;
  margin-top: 2px;
}

.main-title {
  text-align: center;
  margin-bottom: 36px;
}

.title-line {
  display: block;
  font-size: 1.6rem;
  font-weight: 800;
  color: $color-text;
  line-height: 1.4;
}

.cards {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.card {
  display: flex;
  align-items: center;
  padding: 20px 18px;
  border-radius: $radius-lg;
  cursor: pointer;
  transition: transform 0.15s;
}

.card:active { transform: scale(0.98); }

.card-primary {
  background: linear-gradient(135deg, #88619a, #b886c9);
  color: #fff;
}

.card-secondary {
  background: #3d4f6f;
  color: #fff;
}

.card-emoji { font-size: 1.8rem; margin-right: 14px; }

.card-content { flex: 1; }

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  display: block;
  color: #fff;
}

.card-desc {
  font-size: 0.8rem;
  opacity: 0.85;
  margin-top: 2px;
  display: block;
  color: #fff;
}

.card-arrow {
  font-size: 1.2rem;
  opacity: 0.7;
  color: #fff;
}

.social-proof {
  margin-top: 40px;
}

.proof-text {
  font-size: 0.75rem;
  color: #bbb;
}
</style>
