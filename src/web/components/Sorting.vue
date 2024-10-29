<script setup lang="ts">
import { Button, Icon, Dropdown, DropdownList, DropdownItem } from 'gui'
import { useSearchStore, Sorting } from '../stores/searchStore';

const searchStore = useSearchStore();
const sortingMap = {
  [Sorting.Newest]: {
    title: 'Сначала новые',
    icon: 'calendar-plus',
  },
  [Sorting.Oldest]: {
    title: 'Сначала старые',
    icon: 'calendar-minus',
  },
  [Sorting.Atoz]: {
    title: 'От А до Я',
    icon: 'sort-a-z',
  },
  [Sorting.Ztoa]: {
    title: 'От Я до А',
    icon: 'sort-z-a',
  },
} as const

const handleChangeSortType = (sort: Sorting) => {
  searchStore.setSorting(sort);
}
</script>

<template>
  <Dropdown placement="bottom-end" :popperHideTriggers="triggers => [...triggers, 'click']">
    <Button squared mode="default">
      <Icon name="sort-descending" />
    </Button>
    <template #popper>
      <DropdownList>
        <DropdownItem v-for="[sortKey, sortValue] of Object.entries(sortingMap)"
          @click="() => handleChangeSortType(sortKey as Sorting)">
          <Icon :name="sortValue.icon" />
          {{ sortValue.title }}
        </DropdownItem>
      </DropdownList>
    </template>
  </Dropdown>
</template>

<style scoped></style>