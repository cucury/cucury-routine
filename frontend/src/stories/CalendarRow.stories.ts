import type { Meta, StoryObj } from '@storybook/vue3';
import CalendarRow from '@/components/diary/calendar/CalendarRow.vue'
import useCalendarStore from '@/stores/calendar'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/diary/calendar/CalendarRow',
  component: CalendarRow,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  },
} satisfies Meta<typeof CalendarRow>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '기본',
  args: {
    dates: [1, 2, 3, 4, 5, 6, 7],
    currentDate: new Date(),
  },
  render() {
    const calendar = useCalendarStore()
    return {
      setup() {
        return { calendar }
      },
      components: { CalendarRow },
      template: `
    <CalendarRow :dates="[1,2,3,4,5,6,7]" :current-date="calendar.getDate()" />
  `,
    }
  }
}
