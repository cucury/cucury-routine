<script lang="ts">
import { defineComponent } from 'vue'
import DiaryDetailMood from '@/components/diary/detail/DiaryDetailMood.vue'
import CucuryButton from '@/components/button/CucuryButton.vue'
import { routineServerInstance } from '@/service'
import { Diary } from '@/models'
import useCalendarStore from '@/stores/calendar'
import useDiaryStore from '@/stores/diary'

export default defineComponent({
  name: 'DiaryDetail',
  props: {
    id: {
      type: Number,
      required: false
    },
  },
  setup() {
    const routineServer = routineServerInstance()
    const calendarStore = useCalendarStore()
    const diaryStore = useDiaryStore()
    return {
      routineServer,
      calendarStore,
      diaryStore
    }
  },
  components: { CucuryButton, DiaryDetailMood },
  data() {
    return {
      content: '',
      diaryDetailMood: null,
      diary: new Diary(null, '', '', 0),
      loaded: false
    }
  },
  async mounted() {
    this.diaryStore.$subscribe(async(mutation) => {
      if ( mutation.events.key === 'diary' && mutation.events.newValue.id > 0) {
        try {
          const res = await this.routineServer.get(`/diary/${mutation.events.newValue.id}`)
          const data = res.data.pop()
          this.diary = new Diary(data.id, data.mood, data.content, data.time)
          console.log('hoge', data, this.diary)
        } catch(error) {
          console.error(error)
        }
      } else {
        this.diary = new Diary(null, '', '', 0)
      }
      this.loaded = true
    })
  },
  methods: {
    async saveDiary() {
      try {
        if (!this.diary.mood || !this.diary.content) {
          alert('기분과 내용을 입력해주세요')
          return
        }
        const data = {
          id: this.diary.id,
          mood: this.diary.mood,
          content: this.diary.content,
          time: this.calendarStore.getSelectedDate().getTime().toString()
        }
        const isUpdate = this.diary.id ?? 0 > 0
        if (isUpdate) {
          await this.routineServer.put('/diary', data)
        } else {
          await this.routineServer.post('/diary', data)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<template>
  <div
    v-if="loaded"
    class="flex flex-col gap-4">
    <div>
      <div>
        <div>기분</div>
      </div>
      <div>
        <div class="px-4">
          <DiaryDetailMood
            :mood="diary.mood"
            @update:mood="diary.mood = $event"/>
        </div>
      </div>
    </div>
    <div>
      <div>
        <div>기록</div>
      </div>
      <div>
        <div class="flex justify-center px-4">
          <textarea
            v-model="diary.content"
            class="border border-gray-200 rounded-xl w-[90vw] p-3 focus:border-transparent focus:ring-1 focus:outline-0"
            placeholder="일기를 작성해보세요"
            rows="5"
          />
        </div>
      </div>
    </div>
    <div>
      <CucuryButton
        @click="saveDiary"
      > 저장 </CucuryButton>
    </div>
  </div>
</template>
