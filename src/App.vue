<script setup lang="ts">
import { Button } from 'gui'
import { onMounted, ref } from 'vue'
import Text from './components/Text.vue'
import Stack from './components/Stack.vue'
import Card from './components/Card.vue'
import Sidebar from './components/Sidebar.vue';
import Row from './components/Row.vue';

import parseWebpage from './api/parseWebpage';

const onClick = (event: MouseEvent) => {
  console.log(event)
}

const content = ref<string>('')

const fetchPage = async () => {
  const page = await parseWebpage('https://vuejs.org/guide/essentials/lifecycle.html')
  content.value = page?.content || ''
}

onMounted(() => {
  fetchPage()
})
</script>

<template>
  <Row fullHeight>
    <Sidebar>
      <Stack :gap="2" direction="column">
        <Card interactive :onClick="onClick">
          <Text typography="title-4-semibold">Title</Text>
          <Text typography="subtitle-2-semibold">Subtitle</Text>
          <Text typography="paragraph-3-regular">paragraph-1-regular</Text>
        </Card>

        <Card>
          <Text typography="title-4-semibold">Title</Text>
          <Text typography="subtitle-2-semibold">Subtitle</Text>
          <Text typography="paragraph-3-regular">paragraph-1-regular</Text>
        </Card>

        <Card background="secondary">
          <Text typography="title-4-semibold">Title</Text>
          <Text typography="subtitle-2-semibold">Subtitle</Text>
          <Text typography="paragraph-3-regular">paragraph-1-regular</Text>
        </Card>
      </Stack>
    </Sidebar>
    <div>
      {{ content }}
    </div>
  </Row>
</template>
