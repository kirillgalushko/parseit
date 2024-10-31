<script setup lang="ts">
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ru-ru'
import { onMounted, ref, watch } from 'vue';
import { Article } from 'src/web/types/Article';
import './styles.css'

interface ViewerProps {
  article: Article
}

const props = defineProps<ViewerProps>();
const viewerRef = ref();
const viewerInstance = ref<Viewer | null>(null);

const createViewer = () => {
  viewerInstance.value = new Viewer({
    el: viewerRef.value,
    height: 'auto',
    previewStyle: 'vertical',
    hideModeSwitch: true,
    linkAttributes: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
    language: 'ru-RU',
    frontMatter: true,
    initialValue: props.article.markdown,
    usageStatistics: false,
    theme: 'dark',
    plugins: [codeSyntaxHighlight],
  });
}

onMounted(() => {
  createViewer()
});

watch(() => props.article.markdown, () => {
  createViewer();
});
</script>

<template>
  <div class="toastui-viewer" ref="viewerRef"></div>
</template>
