<script setup lang="ts">
import { Loader } from '@gui/components'
import Editor from '@toast-ui/editor'
import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/ru-ru'
import { useArticleStore } from 'src/web/stores/articleStore'
import { Article } from 'src/web/types/Article'
import { debounce } from 'src/web/utils/debounce'
import { onMounted, ref, watch } from 'vue'
import './styles.css'

interface EditorProps {
  article: Article
}

const props = defineProps<EditorProps>()
const articleStore = useArticleStore()
const editorRef = ref()
const isSaving = ref()
const editorInstance = ref<Editor | null>(null)

const debounceUpdateArticle = debounce(async (newMarkdown: string) => {
  await articleStore.updateArticle({
    ...props.article,
    markdown: newMarkdown
  })
  isSaving.value = false
}, 200)

const handleChange = async (newMarkdown: string) => {
  isSaving.value = true
  await debounceUpdateArticle(newMarkdown)
}

const createEditor = () => {
  editorInstance.value = new Editor({
    el: editorRef.value,
    height: '100%',
    previewStyle: 'vertical',
    initialEditType: 'wysiwyg',
    hideModeSwitch: true,
    linkAttributes: {
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    language: 'ru-RU',
    frontMatter: true,
    initialValue: props.article.markdown,
    usageStatistics: false,
    theme: 'dark',
    events: {
      change: () => {
        handleChange(editorInstance.value?.getMarkdown())
      }
    },
    plugins: [codeSyntaxHighlight]
  })
}

onMounted(() => {
  createEditor()
})

watch(
  () => props.article.markdown,
  () => {
    const hasChanges = editorInstance.value?.getMarkdown() !== props.article.markdown
    if (hasChanges && !isSaving.value) {
      createEditor()
    }
  }
)
</script>

<template>
  <div ref="editorRef"></div>
  <div v-if="isSaving" class="editor-status">
    <Loader />
    Сохранение
  </div>
</template>

<style scoped>
.editor-status {
  font-size: 12px;
  color: hsl(var(--foreground));
  position: fixed;
  background-color: hsl(var(--background));
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 1px solid hsl(var(--border));
  padding: 0 4px;
  bottom: 0;
  right: 10px;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 2px;
  pointer-events: none;
  cursor: default;
}
</style>
