import Vue from 'vue'

Vue.directive('format', {
  bind (el, binding) {},
  update (el, binding) {
    // console.log(el, binding)
    if (!binding.value) return
    const reg = new RegExp(/\\n/, 'g')
    el.innerHTML = binding.value.replace(reg, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
  }
})
