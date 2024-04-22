import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import RoutineHome from '../CucuryRoutineHome.vue'

describe('Home', () => {
  it('renders properly', () => {
    const vw = mount(RoutineHome)
    expect(vw.text()).toContain('Home')
  })
})
