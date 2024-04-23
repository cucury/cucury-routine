import type { Meta, StoryObj } from '@storybook/vue3';
import DiaryHeader from '@/components/diary/DiaryHeader.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/diary/calendar/DiaryHeader',
  component: DiaryHeader,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  },
} satisfies Meta<typeof DiaryHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '기본',
  render() {
    return {
      components: { DiaryHeader },
      template: `
    <DiaryHeader />
  `,
    }
  }
}
