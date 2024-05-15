import type { Meta, StoryObj } from '@storybook/vue3'
import HomeView from '@/views/HomeView.vue'
import useNavigation, { Navigations } from '@/stores/navi'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Views/HomeView',
  component: HomeView,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  }
} satisfies as Meta<typeof HomeView>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Home: Story = {
  name: '홈',
  render() {
    return {
      setup() {
        const navi = useNavigation()
        navi.setTab(Navigations.Home)
        return { navi, Navigations }
      },
      components: { HomeView },
      template: `
  <div class="flex justify-center w-full">
    <HomeView class="w-[375px]" />
  </div>
  `
    }
  }
}
export const Routine: Story = {
  name: '루틴',
  render() {
    return {
      setup() {
        const navi = useNavigation()
        navi.setTab(Navigations.Routine)
        return { navi, Navigations }
      },
      components: { HomeView },
      template: `
        <div class="flex justify-center w-full">
          <HomeView class="w-[375px]" />
        </div>
      `
    }
  }
}
export const Diary: Story = {
  name: '일기',
  render() {
    return {
      setup() {
        const navi = useNavigation()
        navi.setTab(Navigations.Diary)
        return { navi, Navigations }
      },
      components: { HomeView },
      template: `
        <div class="flex justify-center w-full">
          <HomeView class="w-[375px]" />
        </div>
      `
    }
  }
}
export const DDay: Story = {
  name: '디데이',
  render() {
    return {
      setup() {
        const navi = useNavigation()
        navi.setTab(Navigations.DDay)
        return { navi, Navigations }
      },
      components: { HomeView },
      template: `
        <div class="flex justify-center w-full">
          <HomeView class="w-[375px]" />
        </div>
      `
    }
  }
}
