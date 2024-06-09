<template>
  <main class='bg-gray-50 h-[calc(100vh_-_80px)] overflow-y-scroll px-4 flex flex-col gap-4'>
    <section class='flex flex-col items-end m-2'>
      <input
        type='text'
        class='bg-gray-200 w-full p-2 rounded-lg'
        v-model='routine.title'
        maxlength='100'
        placeholder='루틴 제목을 입력해주세요.'
      />
      {{ routine.title?.length ?? 0 }} / 100
    </section>
    <section class='flex flex-col gap-2'>
      <div>
        루틴설정
      </div>
      <div class='p-4 bg-white border rounded-lg flex flex-col gap-2'>
        <div class='flex items-center justify-between'>
          <div>
            반복요일
          </div>
          <button
            class='px-2 py-1 rounded-full text-xs bg-lime-500 border border-lime-600 text-white cursor-pointer'
            @click='() => { routine._dayOfWeek = [1, 2, 3, 4, 5] }'
          >
            매일
          </button>
        </div>
        <div class='flex gap-2 justify-center'>
          <div
            :key='i'
            v-for='(day, i) in [0, 1, 2, 3, 4, 5, 6]'
          >
            <input
              :id='"day"+i'
              type='checkbox'
              class='hidden'
              :value='day'
              v-model='routine._dayOfWeek'
            />
            <label
              :for='"day"+i'
              class='p-2 border rounded-lg cursor-pointer w-8 h-8 flex justify-center items-center'
              :class='{
                "bg-lime-500 text-white": routine._dayOfWeek.includes(day),
                "bg-gray-200 text-black": !routine._dayOfWeek.includes(day)

              }'
            >
              {{ getDayLabel(day) }}
            </label>
          </div>
        </div>
      </div>
      <div class='p-4 bg-white border rounded-lg'>
        알람
      </div>
      <div class='p-4 bg-white border rounded-lg flex flex-col gap-4'>
        <a class='flex justify-between cursor-pointer' @click='() => isGroupOpen = !isGroupOpen'>
          <div>
            그룹
          </div>
          <div class='flex flex-col items-end'>
            <div :class='{ "hidden": !isGroupOpen}'>{{ routine.group.name ?? '그룹 없음' }} 🔽</div>
            <div :class='{ "hidden": isGroupOpen}'>{{ routine.group.name ?? '그룹 없음' }} 🔼</div>
          </div>
        </a>
        <div :class='{ "hidden": !isGroupOpen }'>
          <div class='flex flex-wrap gap-4'>
            <div
              :key='i'
              v-for='(group, i) in groups'
            >
              <input
                :id='"group"+i'
                type='radio'
                class='hidden'
                :value='group'
                v-model='routine.group'
              />
              <label
                :for='"group"+i'
                class='p-2 border rounded-lg cursor-pointer'
                :style='`style="background-color: ${colors[group?.color] ? colors[group?.color][500] : "unset" }`'
                :class='{
                  "bg-lime-500 text-white": routine.group?.id === group?.id,
                  "bg-gray-200 text-black": !routine.group?.id === group?.id
                }'
              >
                {{ group?.name }}
              </label>
            </div>
            <div class='relational'>
              <a
                class='p-2 border rounded-lg cursor-pointer bg-gray-200 text-black'
                @click='openNewGroup'
              >+ 새그룹</a>
            </div>
            <SimpleModal
              ref='addGroupModalRef'
              title='새 그룹 추가'
              label='추가'
              @exec='addGroup'
            >
              <div class='flex flex-col p-6 gap-4'>
                <input
                  type='text'
                  class='bg-gray-200 w-full p-2 rounded-lg'
                  v-model='newGroup.name'
                  maxlength='100'
                  placeholder='그룹명을 입력해주세요.'
                />
                <div class='flex flex-col p-2 gap-4'>
                  <div class='flex flex-wrap justify-evenly'>
                    <GroupColorRadio
                      v-for='(color, i) in ["slate", "red", "orange", "emerald", "sky", "indigo", "rose", "lime", "amber", "purple"]'
                      :key='i'
                      :color='color'
                      :group='newGroup'
                      @update:group='(value) => { this.newGroup = value  }'
                    />
                  </div>
                </div>
              </div>
            </SimpleModal>
          </div>
        </div>
      </div>
    </section>
    <section class='flex flex-col gap-2'>
      <!--
      <div>
        추가설정
      </div>
      <div class='p-4 bg-white border rounded-lg'>
        기간 설정
      </div>
      <div class='p-4 bg-white border rounded-lg flex justify-between'>
        <div>
          친구 공개 설정
        </div>
        <CucuryToggle
          v-model='routine.isPublic'
          label='공개'
          @input='(value) => { routine.isPublic = value }'
        />
      </div>
      -->
      <CucuryButton
        label='저장'
        @click='async() => {
          await this.routineServer.post("/routine", this.routine)
          this.$emit("updated:saved")
        }'>
        저장
      </CucuryButton>
    </section>
  </main>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import { Routine, RoutineGroup } from '@/models/Routine'
import { getDayLabel, routineServerInstance } from '@/service'
import SimpleModal from '@/components/modal/SimpleModal.vue'
import GroupColorRadio from '@/components/routine/edit/GroupColorRadio.vue'
import colors from 'tailwindcss/colors'
import CucuryToggle from '@/components/toggle/CucuryToggle.vue'
import CucuryButton from '@/components/button/CucuryButton.vue'

export default defineComponent({
  name: 'RoutineEdit',
  components: { CucuryButton, CucuryToggle, GroupColorRadio, SimpleModal },
  setup() {
    const routineServer = routineServerInstance()
    const defaultGroup = new RoutineGroup({
      id: -1, name: '그룹 없음', color: '#000'
    })
    const addGroupModalRef = null
    return {
      Routine,
      RoutineGroup,
      getDayLabel,
      defaultGroup,
      SimpleModal,
      addGroupModalRef,
      colors,
      routineServer
    }
  },
  props: {
    id: {
      type: Number,
      default: () => {
        return -1
      }
    }
  },
  data() {
    return {
      routine: new Routine({
        dayOfWeek: [1,2,3,4,5],
        group: this.defaultGroup
      }),
      groups: [
        this.defaultGroup
      ],
      newGroup: new RoutineGroup({
        id: null,
        name: '',
        color: '#000'
      }),
      isGroupOpen: false,
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    selectedNewGroupColorCode() {
      return this.newGroup.color
    },
    dayOfWeek: {
      get() {
        return this.routine._dayOfWeek.split(",")
      },
      set(value) {
        this.routine._dayOfWeek = value.join(",")
      }
    }
  },
  methods: {
    getTempSaveGroup() {
      return this.groups.find((el) => el.id === null)
    },
    async init() {
      // routine group
      const res = await this.routineServer.get("/routine-group")
      this.groups = res.data.map((el: any) => {
        return new RoutineGroup({
          id: el.id,
          name: el.name,
          color: el.color
        })
      })
      this.groups = [this.defaultGroup, ...this.groups]
    },
    openNewGroup() {
      const tempSaveGroup = this.getTempSaveGroup()
      if (tempSaveGroup) {
        // 기존에 임시저장된 그룹이 있으면 그룹을 불러옴
        this.newGroup = tempSaveGroup
      } else {
        // 임시저장된 그룹이 없으면 새로운 그룹을 생성
        this.newGroup = new RoutineGroup({
          id: null,
          name: '',
          color: '#000'
        })
      }
      this.$refs.addGroupModalRef.isShow = true
    },
    async addGroup(newGroup: RoutineGroup) {
      const tempSaveGroup = this.getTempSaveGroup()
      if (tempSaveGroup) {
        this.groups.pop()
      }
      this.groups.push(this.newGroup)
      this.routine.group = this.newGroup
      this.$refs.addGroupModalRef.isShow = false
    }
  }
})

</script>