import type { Meta, StoryObj } from '@storybook/vue3'
import SlidingModal from '@/components/modal/SlidingModal.vue'
import { DayType } from '@/consts'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/modal/SlidingModal',
  component: SlidingModal,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  }
} satisfies Meta<typeof SlidingModal>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '기본',
  args: {
    label: ''
  },
  render() {
    return {
      components: { SlidingModal },
      data() {
        return {
          isShow: false,
          modal: null
        }
      },
      methods: {
        getLabel() {
          const date = new Date()
          const day = date.getDay() == 0 ? 7 : date.getDay()
          return `${date.getMonth() + 1}. ${date.getDate()} ${DayType[day]}요일`
        }
      },
      template: `
      <button type="button" @click="() => $refs.modal.isShow = !$refs.modal.isShow">표시</button>  
      <SlidingModal ref="modal" :label="getLabel()" >
        <div class="bg-indigo-500">자식</div>
      </SlidingModal>
  `
    }
  }
}
