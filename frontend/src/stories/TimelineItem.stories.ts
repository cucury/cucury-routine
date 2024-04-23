import type { Meta, StoryObj } from '@storybook/vue3';
import TimelineItem from '@/components/diary/timeline/TimelineItem.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/diary/timeline/TimelineItem',
  component: TimelineItem,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  },
} satisfies Meta<typeof TimelineItem>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '기본',
  args: {
    diary: {
      id: 1,
      mode: '행복',
      content: 'content',
      time: 1713879732902,
      createdAt: 1713879732902,
    }
  },
  render() {
    return {
      components: { TimelineItem },
      template: `
    <TimelineItem :diary="{
      id: 1,
      mode: '행복',
      content: 'content',
      time: 1713879732902,
      createdAt: 1713879732902,
    }" />
  `,
    }
  }
}
