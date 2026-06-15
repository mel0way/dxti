<template>
  <view class="zhenti">
    <view class="header">
      <text class="page-title">📋 严谨测试</text>
      <text class="page-subtitle">最准确最真实的测试 —— 历年高考真题</text>
    </view>

    <!-- 搜索框 -->
    <view class="search-wrap">
      <input
        class="search-input"
        v-model="searchText"
        placeholder="搜索省份 / 年份 / 科目..."
        @input="onSearch"
      />
    </view>

    <!-- 筛选标签 -->
    <view class="filters">
      <view class="filter-group">
        <text class="filter-label">省份</text>
        <view class="tags">
          <view
            v-for="p in provinces"
            :key="p"
            class="tag"
            :class="{ active: selectedProvince === p }"
            @click="toggleFilter('province', p)"
          >{{ p }}</view>
        </view>
      </view>

      <view class="filter-group">
        <text class="filter-label">年份</text>
        <view class="tags">
          <view
            v-for="y in years"
            :key="y"
            class="tag"
            :class="{ active: selectedYear === y }"
            @click="toggleFilter('year', y)"
          >{{ y }}</view>
        </view>
      </view>

      <view class="filter-group">
        <text class="filter-label">科目</text>
        <view class="tags">
          <view
            v-for="s in subjects"
            :key="s"
            class="tag"
            :class="{ active: selectedSubject === s }"
            @click="toggleFilter('subject', s)"
          >{{ s }}</view>
        </view>
      </view>
    </view>

    <!-- 结果列表 -->
    <view class="exam-list">
      <view
        v-for="exam in filteredExams"
        :key="exam.id"
        class="exam-item"
        @click="openLink(exam.url)"
      >
        <view class="exam-info">
          <text class="exam-title">{{ exam.title }}</text>
          <text class="exam-desc">{{ exam.desc }}</text>
        </view>
        <text class="exam-link">查看 →</text>
      </view>

      <view v-if="filteredExams.length === 0" class="empty">
        <text>😕 没有找到匹配的真题，换个条件试试</text>
      </view>
    </view>
  </view>
</template>

<script>
import exams from '@/data/exams.json'

export default {
  name: 'Zhenti',
  data() {
    return {
      exams,
      searchText: '',
      selectedProvince: null,
      selectedYear: null,
      selectedSubject: null,
      provinces: ['全国', '北京', '上海', '天津', '浙江'],
      years: [2026],
      subjects: ['语文', '数学', '英语', '物理', '化学', '生物', '政治', '历史', '地理']
    }
  },
  computed: {
    filteredExams() {
      let list = this.exams

      if (this.searchText) {
        const kw = this.searchText.toLowerCase()
        list = list.filter(e =>
          e.title.toLowerCase().includes(kw) ||
          e.province.includes(kw) ||
          e.subject.includes(kw)
        )
      }

      if (this.selectedProvince) {
        list = list.filter(e => e.province === this.selectedProvince)
      }
      if (this.selectedYear) {
        list = list.filter(e => e.year === this.selectedYear)
      }
      if (this.selectedSubject) {
        list = list.filter(e => e.subject === this.selectedSubject)
      }

      return list
    }
  },
  methods: {
    toggleFilter(type, value) {
      if (type === 'province') {
        this.selectedProvince = this.selectedProvince === value ? null : value
      } else if (type === 'year') {
        this.selectedYear = this.selectedYear === value ? null : value
      } else if (type === 'subject') {
        this.selectedSubject = this.selectedSubject === value ? null : value
      }
    },
    onSearch() {},
    openLink(url) {
      // #ifdef H5
      window.open(url, '_blank')
      // #endif
      // #ifdef MP-WEIXIN
      uni.setClipboardData({ data: url, success: () => {
        uni.showToast({ title: '链接已复制，请在浏览器中打开', icon: 'none' })
      }})
      // #endif
    }
  }
}
</script>

<style scoped>
.zhenti {
  min-height: 100vh;
  padding: 24px 20px;
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: #333;
  display: block;
}

.page-subtitle {
  font-size: 0.8rem;
  color: #888;
  margin-top: 4px;
  display: block;
}

.search-wrap {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  background: #f5f5f5;
  border: none;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 0.9rem;
  color: #333;
}

.search-input::placeholder {
  color: #bbb;
}

.filters { margin-bottom: 20px; }

.filter-group { margin-bottom: 14px; }

.filter-label {
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 8px;
  display: block;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #f0f0f0;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #666;
  cursor: pointer;
}

.tag.active {
  background: #88619a;
  color: #fff;
}

.exam-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.exam-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 12px;
  cursor: pointer;
}

.exam-info { flex: 1; }

.exam-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #333;
  display: block;
}

.exam-desc {
  font-size: 0.75rem;
  color: #888;
  margin-top: 2px;
  display: block;
}

.exam-link {
  color: #33b5a9;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-left: 12px;
}

.empty {
  text-align: center;
  padding: 40px 0;
  font-size: 0.9rem;
  color: #bbb;
}
</style>
