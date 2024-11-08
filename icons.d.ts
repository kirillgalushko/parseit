declare module '@gui/icons/*' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{
    class?: string
    style?: string
    [key: string]: any
  }>
  export default component
}
