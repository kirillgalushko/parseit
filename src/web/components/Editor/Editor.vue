<script setup lang="ts">
import Editor from '@toast-ui/editor'
import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/ru-ru'
import { useArticleStore } from 'src/web/stores/articleStore'
import { Article } from 'src/web/types/Article'
import { onMounted, ref, watch } from 'vue'
import './styles.css'

interface EditorProps {
  article: Article
}

const props = defineProps<EditorProps>()
const articleStore = useArticleStore()
const editorRef = ref()
const editorInstance = ref<Editor | null>(null)

const handleChange = (newMarkdown: string) => {
  articleStore.updateArticle({
    ...props.article,
    markdown: newMarkdown
  })
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
    createEditor()
  }
)
</script>

<template>
  <div ref="editorRef"></div>
</template>
