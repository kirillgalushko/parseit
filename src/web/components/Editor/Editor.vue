<script setup lang="ts">
import Editor from '@toast-ui/editor';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import '@toast-ui/editor/dist/toastui-editor.css';
import { onMounted, ref, watch } from 'vue';
import TurndownService from 'turndown';

interface EditorProps {
  modelValue?: string
}

const turndownService = new TurndownService({ headingStyle: 'atx' });
const props = defineProps<EditorProps>();
const emit = defineEmits(['update:modelValue']);

const editorRef = ref();
const editorInstance = ref<Editor | null>(null);

const createEditor = () => {
  const markdown = turndownService.turndown(props.modelValue);
  editorInstance.value = new Editor({
    el: editorRef.value,
    height: 'auto',
    previewStyle: 'vertical',
    initialEditType: "wysiwyg",
    hideModeSwitch: true,
    linkAttributes: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
    initialValue: markdown,
    usageStatistics: false,
    theme: 'dark',
    events: {
      change: () => emit('update:modelValue', editorInstance.value?.getMarkdown()),
    },
    plugins: [codeSyntaxHighlight],
  });
}

onMounted(() => {
  createEditor()
});

watch(() => props.modelValue, () => {
  createEditor();
});
</script>

<template>
  <div>
    <div ref="editorRef"></div>
  </div>
</template>

<style>
.toastui-editor-defaultUI {
  border: 0;
  font-family: inherit;
  border-radius: 0;
}

.toastui-editor-toolbar {}

.toastui-editor-defaultUI-toolbar {
  border-radius: 0;
  background-color: hsl(var(--background));
  border-color: hsl(var(--border));
}

.toastui-editor-defaultUI-toolbar button {
  border-color: hsl(var(--border));
  color: hsl(var(--foreground));
}

.toastui-editor-toolbar-icons {
  /* filter: invert(); */
}

.toastui-editor-toolbar-divider {
  background-color: hsl(var(--border));
}

.toastui-editor-main-container {
  color: hsl(var(--foreground));
}

.toastui-editor-ww-container {
  background-color: hsl(var(--background));
}

.toastui-editor-contents {
  font-family: inherit;
}

.ProseMirror {
  color: hsl(var(--foreground));
}

.toastui-editor-contents h2 {
  border-color: hsl(var(--border));
}

.toastui-editor-contents h1,
.toastui-editor-contents h2,
.toastui-editor-contents h3,
.toastui-editor-contents h4,
.toastui-editor-contents h5,
.toastui-editor-contents h6 {
  color: hsl(var(--foreground));
}

.toastui-editor-contents p {
  color: hsl(var(--foreground));
}

.toastui-editor-contents code {
  background-color: hsl(var(--secondary));
  border-radius: 4px;
}

.toastui-editor-contents pre {
  background-color: hsl(var(--secondary));
  border-radius: 8px;
}

.toastui-editor-contents .toastui-editor-ww-code-block:after {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-radius: 6px;
}

.toastui-editor-contents a {
  cursor: pointer;
}

.toastui-editor-ww-code-block-language {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-radius: 6px;
}

.toastui-editor-ww-code-block-language input {
  color: hsl(var(--primary-foreground));
}

.toastui-editor-main-container img {
  border-radius: 8px;
}

.toastui-editor-contents del {
  color: hsl(var(--muted-foreground));
}

.toastui-editor-contents blockquote p {
  color: hsl(var(--foreground));
}

.toastui-editor-contents table {
  border-color: hsl(var(--border));
  border-radius: 8px;
  color: hsl(var(--foreground));
}

.toastui-editor-contents table th {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.toastui-editor-contents th p {
  color: hsl(var(--secondary-foreground));
}

.toastui-editor-contents table th,
.toastui-editor-contents table td {
  border-color: hsl(var(--border));
}

.toastui-editor-dropdown-toolbar {
  border-color: hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
}

code[class*="language-"],
pre[class*="language-"] {
  text-shadow: none;
}
</style>
