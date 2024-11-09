<script setup lang="ts">
import { Button, Dropdown, DropdownList, DropdownItem } from '@gui/components'
import {
  IconCalendarMinusOutline,
  IconCalendarPlusOutline,
  IconSortAZOutline,
  IconSortZAOutline,
  IconSortDescendingOutline
} from '@gui/icons'
import { useSearchStore, Sorting } from 'src/web/stores/searchStore'

const searchStore = useSearchStore()
const sortingMap = {
  [Sorting.Newest]: {
    title: 'Сначала новые',
    icon: IconCalendarPlusOutline
  },
  [Sorting.Oldest]: {
    title: 'Сначала старые',
    icon: IconCalendarMinusOutline
  },
  [Sorting.Atoz]: {
    title: 'От А до Я',
    icon: IconSortAZOutline
  },
  [Sorting.Ztoa]: {
    title: 'От Я до А',
    icon: IconSortZAOutline
  }
} as const

const handleChangeSortType = (sort: Sorting) => {
  searchStore.setSorting(sort)
}
</script>

<template>
  <Dropdown placement="bottom-end" :popperHideTriggers="(triggers) => [...triggers, 'click']">
    <Button squared mode="default">
      <IconSortDescendingOutline />
    </Button>
    <template #popper>
      <DropdownList>
        <DropdownItem
          v-for="[sortKey, sortValue] of Object.entries(sortingMap)"
          @click="() => handleChangeSortType(sortKey as Sorting)"
        >
          <component :is="sortValue.icon" />
          {{ sortValue.title }}
        </DropdownItem>
      </DropdownList>
    </template>
  </Dropdown>
</template>

<style scoped></style>
