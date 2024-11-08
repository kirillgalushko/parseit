<script setup lang="ts">
import { Button, Dropdown, DropdownList, DropdownItem } from '@gui/components'
import CalendarMinusIcon from '@gui/icons/outline/calendar-minus.js'
import CalendarPlusIcon from '@gui/icons/outline/calendar-plus.js'
import SortAZIcon from '@gui/icons/outline/sort-a-z.js'
import SortIcon from '@gui/icons/outline/sort-descending.js'
import SortZAIcon from '@gui/icons/outline/sort-z-a.js'
import { useSearchStore, Sorting } from 'src/web/stores/searchStore'

const searchStore = useSearchStore()
const sortingMap = {
  [Sorting.Newest]: {
    title: 'Сначала новые',
    icon: CalendarPlusIcon
  },
  [Sorting.Oldest]: {
    title: 'Сначала старые',
    icon: CalendarMinusIcon
  },
  [Sorting.Atoz]: {
    title: 'От А до Я',
    icon: SortAZIcon
  },
  [Sorting.Ztoa]: {
    title: 'От Я до А',
    icon: SortZAIcon
  }
} as const

const handleChangeSortType = (sort: Sorting) => {
  searchStore.setSorting(sort)
}
</script>

<template>
  <Dropdown placement="bottom-end" :popperHideTriggers="(triggers) => [...triggers, 'click']">
    <Button squared mode="default">
      <SortIcon />
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
