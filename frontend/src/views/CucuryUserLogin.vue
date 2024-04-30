<script lang="ts">
import { defineComponent } from 'vue'
import { authServerInstance } from '@/service'
import router from '@/router'

export default defineComponent({
  name: 'CucuryLogin',
  methods: {
    router() {
      return router
    }
  },
  setup() {
    const authServer = authServerInstance()
    return {
      authServer,
      window,
    }
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
})
</script>

<template>
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
        <img
          class="w-8 h-8 mr-2"
          src="https://static.h-9.info/images/961c5913-4712-4c41-a2d7-fb5e23dd3273.png"
          alt="logo"
        />
        CUCURY
      </a>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            로그인
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                >Your email</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                placeholder="name@company.com"
                v-model="email"
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                v-model="password"
              />
            </div>
            <button
              type="button"
              @click="async() => {
                if(!email) {
                  window.alert('이메일을 입력해주세요.')
                  return
                }
                if(!password) {
                  window.alert('비밀번호를 입력해주세요.')
                  return
                }
                const { data } = await authServer.post('/login', {
                  email,
                  password
                })
                const { accessToken, refreshToken } = data
                window.localStorage.setItem('accessToken', accessToken)
                window.localStorage.setItem('refreshToken', refreshToken)
                await router().push('/')
              }"
              class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              로그인
            </button>
            <p class="text-sm font-light text-gray-500">
              아직 계정이 없으신가요?
              <router-link to="/register">
                <a href="#" class="font-medium text-indigo-600 hover:underline">Sign up</a>
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
