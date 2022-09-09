import { shallowMount } from '@vue/test-utils'
import Overlay from '@/components/Overlay.vue'

describe('Overlay.vue', () => {
  it('renders overlay loading text when passed', () => {
    const loadingText = 'Loading...'
    const wrapper = shallowMount(Overlay, {
      props: { loadingText }
    })
    expect(wrapper.text()).toMatch(loadingText)
  })
})
