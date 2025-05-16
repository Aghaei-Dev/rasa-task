<template>
  <div class="py-4 px-2 fixed-width overflow-auto">
    <section class="flex-col gap-2 flex sm:flex-row items-center justify-between mb-2">
      <InputField
        type="text"
        placeholder="جستجو..."
        v-model="search"
        class="w-full sm:max-w-[400px]"
      />
      <div class="flex gap-2 w-full sm:max-w-[350px]">
        <SelectField
          :array="eachPage"
          v-model="itemsPerPage"
        />
        <Button
          @click="exportJSON"
          full
          >دانلود JSON</Button
        >
        <Button
          @click="exportExcel"
          class="bg-green-500 hover:bg-green-600"
          full
        >
          دانلود Excel
        </Button>
      </div>
    </section>

    <div class="overflow-auto rounded-md">
      <table class="w-full table-fixed min-w-[700px]">
        <thead class="border-b border-gray-200">
          <tr class="bg-gray-50">
            <th class="p-2 w-[30px] border-l border-gray-200">
              <input
                type="checkbox"
                @change="toggleAll"
                :checked="isAllSelected"
              />
            </th>
            <th class="p-2 min-w-[60px] w-[60px] border-l border-gray-200">ردیف</th>
            <th
              v-for="col in columns"
              :key="col.key"
              class="p-2 cursor-pointer select-none resize-x overflow-hidden border-l border-gray-200"
              :class="[col.key === 'title' ? 'w-[275px]' : 'w-[350px]']"
            >
              <section class="flex gap-5">
                <div
                  class="flex justify-between items-center gap-2"
                  @click="toggleSort(col.key)"
                >
                  <span>{{ col.label }}</span>
                  <span v-if="sortKey === col.key">
                    <Ascend v-if="sortOrder === 'asc'" />
                    <Descend v-else />
                  </span>
                </div>
                <InputField
                  v-model="filters[col.key]"
                  class="w-full text-sm"
                  placeholder="فیلتر"
                />
              </section>
            </th>
            <th class="p-2 w-40">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in paginatedData"
            :key="row.id"
            class="hover:bg-gray-50 border-b border-gray-200 last:border-none"
          >
            <td class="p-2 text-center">
              <input
                type="checkbox"
                :value="row.id"
                v-model="selected"
              />
            </td>
            <td class="p-2 text-center">
              {{ toPersianNumber(getRowIndex(index)) }}
            </td>
            <td
              v-for="col in columns"
              :key="col.key"
              class="p-2 break-words"
            >
              {{ col.key === 'title' ? truncateText(row[col.key], 30) : truncateText(row[col.key]) }}
            </td>
            <td class="p-2">
              <div class="flex justify-center items-center gap-1 h-full">
                <CircleButton
                  :icon="Edit"
                  :iconClass="'stroke-green-700 hover:stroke-green-800'"
                  @click="$emit('edit', row)"
                  class="shadow bg-green-100 hover:bg-green-200"
                />
                <CircleButton
                  :icon="Delete"
                  :iconClass="'stroke-red-700 hover:stroke-red-800'"
                  @click="$emit('delete', row)"
                  class="shadow bg-red-100 hover:bg-red-200"
                />
                <CircleButton
                  :icon="More"
                  :iconClass="'stroke-blue-700 hover:stroke-blue-800'"
                  @click="$emit('view', row)"
                  class="shadow bg-blue-100 hover:bg-blue-200"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center items-center gap-2 mt-4">
      <CircleButton
        :icon="ChevronRight"
        :iconClass="'stroke-blue-700 hover:stroke-blue-800'"
        @click="prevPage"
        class="shadow bg-blue-100 hover:bg-blue-200"
        :class="[currentPage === 1 && 'hidden']"
      />
      <CircleButton
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-100']"
      >
        {{ toPersianNumber(page) }}
      </CircleButton>
      <CircleButton
        :class="[currentPage === totalPages && 'hidden']"
        :icon="ChevronLeft"
        :iconClass="'stroke-blue-700 hover:stroke-blue-800'"
        @click="nextPage"
        class="shadow bg-blue-100 hover:bg-blue-200"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useDownload } from '@/composables/useDownload'
import Button from './UI/Button.vue'
import InputField from './UI/InputField.vue'
import CircleButton from './UI/CircleButton.vue'
import ChevronRight from '~/assets/icons/ChevronRight.vue'
import ChevronLeft from '~/assets/icons/ChevronLeft.vue'
import Ascend from '~/assets/icons/Ascend.vue'
import Descend from '~/assets/icons/Descend.vue'
import Edit from '~/assets/icons/Edit.vue'
import Delete from '~/assets/icons/Delete.vue'
import More from '~/assets/icons/More.vue'
import SelectField from './UI/SelectField'
import { eachPage } from '../assets/constants'
const props = defineProps({
  columns: Array,
  data: Array,
})

const toast = useGlobalStore()

const search = ref('')
const sortKey = ref('')
const sortOrder = ref('asc')
const filters = ref({})
const selected = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)

const isAllSelected = computed(() => {
  return paginatedData.value.length && selected.value.length === paginatedData.value.length
})

const toggleAll = () => {
  selected.value = isAllSelected.value ? [] : paginatedData.value.map((r) => r.id)
}

const toggleSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const filteredAndSortedData = computed(() => {
  let filtered = props.data ?? []
  const s = search.value.toLowerCase()

  if (s) {
    filtered = filtered.filter((row) => Object.values(row).some((v) => String(v).toLowerCase().includes(s)))
  }

  Object.entries(filters.value).forEach(([key, value]) => {
    if (value) {
      filtered = filtered.filter((row) => String(row[key]).toLowerCase().includes(value.toLowerCase()))
    }
  })

  if (sortKey.value) {
    filtered = [...filtered].sort((a, b) => {
      const valA = String(a[sortKey.value])
      const valB = String(b[sortKey.value])
      return sortOrder.value === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
    })
  }

  return filtered
})

watch(
  () => [props.data, search.value],
  () => {
    currentPage.value = 1
  }
)
watch(itemsPerPage, () => {
  currentPage.value = 1
})
const totalPages = computed(() => {
  const perPage = Number(itemsPerPage.value) || 10
  return Math.ceil(filteredAndSortedData.value.length / perPage)
})

const paginatedData = computed(() => {
  const perPage = Number(itemsPerPage.value) || 10
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return filteredAndSortedData.value.slice(start, end)
})

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const { downloadJSON, downloadExcel } = useDownload()
const exportJSON = () => {
  toast.showToast('دریافت فایل با موفقیت انجام شد.', 'success')
  downloadJSON(filteredAndSortedData.value)
}
const exportExcel = () => {
  toast.showToast('دریافت فایل با موفقیت انجام شد.', 'success')
  downloadExcel(filteredAndSortedData.value)
}

const getRowIndex = (index) => {
  return index + 1 + (currentPage.value - 1) * itemsPerPage.value
}
</script>

<style scoped>
th {
  resize: horizontal;
  overflow: hidden;
}
</style>
