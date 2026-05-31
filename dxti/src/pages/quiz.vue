<template>
  <view class="quiz">
    <!-- 进度条 -->
    <view class="progress-wrap">
      <text class="progress-label">第 {{ currentIndex + 1 }} / {{ total }} 题</text>
      <view class="progress-bar">
        <view class="progress-fill" :style="{ width: progressPercent + '%' }"></view>
      </view>
    </view>

    <!-- 题目 -->
    <view class="question-wrap">
      <text class="question-text">{{ currentQuestion.question }}</text>
    </view>

    <!-- 选项 -->
    <view class="options">
      <view
        v-for="(opt, idx) in currentQuestion.options"
        :key="idx"
        class="option"
        :class="{ selected: selectedAnswer === idx }"
        @click="selectAnswer(idx)"
      >
        <view class="option-letter">{{ letters[idx] }}</view>
        <text class="option-text">{{ opt.text }}</text>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="nav">
      <view
        class="nav-btn nav-prev"
        :class="{ disabled: currentIndex === 0 }"
        @click="prevQuestion"
      >
        <text>← 上一题</text>
      </view>

      <view
        v-if="currentIndex < total - 1"
        class="nav-btn nav-next"
        :class="{ disabled: selectedAnswer === null }"
        @click="nextQuestion"
      >
        <text>下一题 →</text>
      </view>

      <view
        v-else
        class="nav-btn nav-submit"
        :class="{ disabled: selectedAnswer === null }"
        @click="submitTest"
      >
        <text>查看结果 🎉</text>
      </view>
    </view>
  </view>
</template>

<script>
import questions from '@/data/questions.json'

export default {
  name: 'Quiz',
  data() {
    return {
      questions,
      total: questions.length,
      currentIndex: 0,
      answers: [],      // [{ questionId, selectedDim }]
      selections: [],   // 记录每题的选项索引，用于回显
      selectedAnswer: null,
      letters: ['A', 'B', 'C', 'D']
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex]
    },
    progressPercent() {
      return Math.round(((this.currentIndex + 1) / this.total) * 100)
    }
  },
  methods: {
    selectAnswer(idx) {
      this.selectedAnswer = idx
    },
    saveCurrentAnswer() {
      const idx = this.selectedAnswer
      if (idx === null) return
      const q = this.currentQuestion
      this.answers[this.currentIndex] = {
        questionId: q.id,
        selectedDim: q.options[idx].dim
      }
      this.selections[this.currentIndex] = idx
    },
    nextQuestion() {
      if (this.selectedAnswer === null) return
      this.saveCurrentAnswer()
      this.currentIndex++
      this.selectedAnswer = this.selections[this.currentIndex] ?? null
    },
    prevQuestion() {
      if (this.currentIndex === 0) return
      this.saveCurrentAnswer()
      this.currentIndex--
      this.selectedAnswer = this.selections[this.currentIndex] ?? null
    },
    submitTest() {
      if (this.selectedAnswer === null) return
      this.saveCurrentAnswer()
      uni.navigateTo({
        url: '/pages/result?answers=' + encodeURIComponent(JSON.stringify(this.answers))
      })
    }
  }
}
</script>

<style scoped>
.quiz {
  min-height: 100vh;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
}

.progress-wrap { margin-bottom: 28px; }

.progress-label {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 8px;
  display: block;
}

.progress-bar {
  height: 8px;
  background: #eee;
  border-radius: 20px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #88619a, #33b5a9);
  border-radius: 20px;
  transition: width 0.3s;
}

.question-wrap { margin-bottom: 28px; }

.question-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  line-height: 1.6;
}

.options {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.option {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border: 2px solid #eee;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.15s;
}

.option.selected {
  border-color: #88619a;
  background: #f8f4fc;
}

.option-letter {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #f0e8f8;
  color: #88619a;
  font-weight: 700;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 12px;
}

.option.selected .option-letter {
  background: #88619a;
  color: #fff;
}

.option-text {
  font-size: 0.95rem;
  color: #444;
  line-height: 1.5;
  flex: 1;
}

.nav {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 20px;
}

.nav-btn {
  flex: 1;
  text-align: center;
  padding: 16px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.15s;
}

.nav-prev {
  background: #f5f5f5;
  color: #666;
}

.nav-next {
  background: linear-gradient(135deg, #88619a, #33b5a9);
  color: #fff;
}

.nav-submit {
  background: linear-gradient(135deg, #f4c542, #e2556d);
  color: #fff;
  flex: 2;
}

.nav-btn.disabled {
  opacity: 0.35;
  pointer-events: none;
}
</style>
