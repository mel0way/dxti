<script>
export default {
  onLaunch() { console.log('DXTI launched') }
}
</script>

<style lang="scss">
@import './uni.scss';

/* #ifndef MP-WEIXIN */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #fff;
  color: #333;
}
/* #endif */

/* #ifdef MP-WEIXIN */
page, view, text, image, scroll-view, swiper, swiper-item, button, input, textarea, navigator {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

page {
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #fff;
  color: #333;
  min-height: 100vh;
}
/* #endif */

/* #ifndef MP-WEIXIN */
page {
  min-height: 100vh;
  background: #fff;
}
/* #endif */
</style>
