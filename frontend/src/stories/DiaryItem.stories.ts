import type { Meta, StoryObj } from '@storybook/vue3'
import CalendarItem from '@/components/diary/DiaryItem.vue'
import { DiaryMode } from '@/consts'
import useNavigation, { Navigations } from '@/stores/navi'
import { dummyWeeks } from '@/consts'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/diary/DiaryItem',
  component: CalendarItem,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  }
} satisfies Meta<typeof CalendarItem>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '기본',
  args: {
    day: new Date(dummyWeeks[3][0].time).getDate().toString(),
    mode: '',
    isToday: true
  },
  render() {
    const mode = DiaryMode.Good
    return {
      setup() {
        const navi = useNavigation()
        return { navi, Navigations, mode, dummyWeeks }
      },
      components: { CalendarItem },
      template: `
    <CalendarItem :day="new Date(dummyWeeks[3][0].time).getDate().toString()" mode="" :is-today="true"  />
  `
    }
  }
}
export const AllCase: Story = {
  name: '기분적용',
  args: {
    day: '1',
    mode: DiaryMode.Good,
    isToday: false
  },
  render() {
    return {
      setup() {
        const navi = useNavigation()
        return { navi, Navigations, DiaryMode }
      },
      components: { CalendarItem },
      template: `
        <CalendarItem :key="i" v-for="(mode,i) in DiaryMode" :day="mode" :mode="mode" :is-today="false"  />
      `
    }
  }
}