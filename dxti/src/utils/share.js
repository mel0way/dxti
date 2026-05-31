// #ifdef H5
import html2canvas from 'html2canvas'

/**
 * 将指定 DOM 元素渲染为图片 Blob
 * @param {string} selector - CSS 选择器，定位要截图的元素
 * @returns {Promise<Blob>}
 */
export async function captureElement(selector) {
  const el = document.querySelector(selector)
  if (!el) {
    throw new Error('Element not found: ' + selector)
  }

  const canvas = await html2canvas(el, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true,
    allowTaint: true
  })

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob)
      else reject(new Error('Canvas toBlob failed'))
    }, 'image/png')
  })
}

/**
 * 触发浏览器下载图片
 * @param {Blob} blob
 * @param {string} filename
 */
export function downloadImage(blob, filename = 'dxti-result.png') {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * 生成并下载分享图
 * @param {string} selector
 * @param {string} filename
 */
export async function generateShareImage(selector, filename) {
  try {
    const blob = await captureElement(selector)
    downloadImage(blob, filename)
    return true
  } catch (err) {
    console.error('Share image generation failed:', err)
    return false
  }
}
// #endif

// #ifdef MP-WEIXIN
/**
 * 微信小程序暂不支持生成分享图
 * 提示用户使用 H5 版本
 */
export async function generateShareImage(selector, filename) {
  uni.showToast({ title: '请用浏览器打开 dxti.vercel.app 生成分享图', icon: 'none', duration: 3000 })
  return false
}
// #endif
