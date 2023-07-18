import TagsView from './TagsView'
export default {
    install(Vue) {
      Vue.component('TagsView', TagsView)
      Vue.use(Print)
    }
  }