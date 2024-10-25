<script setup lang="ts">
import Editor from '@toast-ui/editor';
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
    events: {
      change: () => emit('update:modelValue', editorInstance.value?.getMarkdown()),
    },
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
