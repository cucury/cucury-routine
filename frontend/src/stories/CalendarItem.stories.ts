import type { Meta, StoryObj } from '@storybook/vue3';
import CalendarItem, { DiaryMode } from '@/components/diary/calendar/CalendarItem.vue'
import useNavigation, { Navigations } from '@/stores/navi'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/diary/calendar/CalendarItem',
  component: CalendarItem,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  },
} satisfies Meta<typeof CalendarItem>

export default meta
type Story = StoryObj<typeof meta>

export const 기본_오늘: Story = {
  render() {
    const mode = DiaryMode.Good
    return {
      setup() {
        const navi = useNavigation()
        return { navi, Navigations, mode }
      },
      components: { CalendarItem },
      template: `
    <CalendarItem date="23" mode="" :is-today="true"  />
  `,
    }
  }
}
export const 좋음: Story = {
  render() {
    const mode = DiaryMode.Good
    return {
      setup() {
        const navi = useNavigation()
        return { navi, Navigations, mode }
      },
      components: { CalendarItem },
      template: `
        <CalendarItem date="1" :mode="mode" :is-today="false"  />
      `,
    }
  }
}
