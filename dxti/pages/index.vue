<template>
  <view class="home">
    <text class="title">DXTI</text>
    <text class="subtitle">大学人格类型测试</text>
  </view>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}
.title {
  font-size: 2rem;
  font-weight: 800;
  color: #88619a;
}
.subtitle {
  font-size: 0.9rem;
  color: #888;
  margin-top: 8px;
}
</style>
