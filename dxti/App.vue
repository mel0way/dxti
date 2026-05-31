<script>
export default {
  onLaunch() { console.log('DXTI launched') }
}
</script>

<style lang="scss">
@import './uni.scss';

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #fff;
  color: #333;
}

/* mini-program only: */
page {
  min-height: 100vh;
  background: #fff;
}
</style>
