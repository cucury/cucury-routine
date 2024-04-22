import { type Preview, setup} from '@storybook/vue3'
import { type App } from 'vue'
import '../src/assets/main.css'
import { createPinia } from 'pinia'

const pinia = createPinia()

setup(( app: App ) => {
  app.use(pinia)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
