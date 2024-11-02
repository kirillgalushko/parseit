import { useResize } from 'gui'
import { ref } from 'vue'

export const useSize = () => {
  const elementRef = ref()
  const width = ref()
  const height = ref()

  const handleChangeSize = () => {
    if (elementRef.value) {
      width.value = elementRef.value.clientWidth
      height.value = elementRef.value.clientHeight
    }
  }

  useResize(elementRef, handleChangeSize)
  return { elementRef, width, height }
}
