import type { Meta, StoryObj } from '@storybook/vue3'
import CucuryUserLogin from '@/views/CucuryUserLogin.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Views/User/Login',
  component: CucuryUserLogin,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  }
} satisfies Meta<typeof CucuryUserLogin>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '기본',
  args: {},
  render() {
    return {
      components: { CucuryUserLogin },
      template: `
    <CucuryUserLogin />
  `
    }
  }
}
