import type { Meta, StoryObj } from '@storybook/vue3'
import CucuryButton from '@/components/button/CucuryButton.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/button/CucuryButton',
  component: CucuryButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  }
} satisfies Meta<typeof CucuryButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '기본',
  args: {},
  render() {
    return {
      components: { CucuryButton },
      template: `
        <CucuryButton class="text-2xl">
          저장
        </CucuryButton>
  `
    }
  }
}
