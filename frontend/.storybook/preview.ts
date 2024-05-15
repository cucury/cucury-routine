import { type Preview, setup } from '@storybook/vue3'
import { type App } from 'vue'
import '../src/assets/main.css'
import { createPinia } from 'pinia'
import { authServerInstance } from '../src/service'

const pinia = createPinia()

setup(async(app: App) => {
  app.use(pinia)
  const authServer = authServerInstance()
  const { data } = await authServer.post('/login', {
    email: "admin1@gmail.com",
    password: "asdfasdf"
  })
  const { accessToken, refreshToken } = data
  window.localStorage.setItem('accessToken', accessToken)
  window.localStorage.setItem('refreshToken', refreshToken)
})

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
