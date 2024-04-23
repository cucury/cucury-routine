import type { Meta, StoryObj } from '@storybook/vue3';
import DiaryTimeline from '@/components/diary/DiaryTimeline.vue'
import type { DiaryProps } from '@/props'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/diary/DiaryTimeline',
  component: DiaryTimeline,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  },
} satisfies Meta<typeof DiaryTimeline>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '기본',
  args: {
    diaries: [{
      id: 1,
      time: 1711942194833,
      mode: '행복',
      content: '오늘은 새로운 친구를 만났다.',
      createdAt: 1711942194833,
    }]
  },
  render() {
    return {
      components: { DiaryTimeline },
      data() {
        return {
          diaries: [{
            id: 1,
            time: 1711942194833,
            mode: '행복',
            content: '오늘은 새로운 친구를 만났다.',
            createdAt: 1711942194833,
          }]
        }
      },
      template: `
    <DiaryTimeline :diaries="diaries" />
  `,
    }
  }
}
export const nothingDiaries: Story = {
  name: '0건일 경우',
  args: {
    diaries: []
  },
  render() {
    return {
      components: { DiaryTimeline },
      data() {
        return {
          diaries: []
        }
      },
      template: `
    <DiaryTimeline :diaries="diaries" />
  `,
    }
  }
}
