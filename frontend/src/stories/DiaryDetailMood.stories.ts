import type { Meta, StoryObj } from '@storybook/vue3'
import DiaryDetailMood from '@/components/diary/detail/DiaryDetailMood.vue'
import { DiaryMode } from '@/consts'
import useNavigation, { Navigations } from '@/stores/navi'
import { dummyWeeks } from '@/consts'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/diary/detail/DiaryDetailMood',
  component: DiaryDetailMood,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  }
} satisfies Meta<typeof DiaryDetailMood>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '기본',
  args: {},
  render() {
    const mode = DiaryMode.Good
    return {
      setup() {
        const navi = useNavigation()
        return { navi, Navigations, mode, dummyWeeks }
      },
      components: { DiaryDetailMood },
      template: `
    <DiaryDetailMood />
  `
    }
  }
}
