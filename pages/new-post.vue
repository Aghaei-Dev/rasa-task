<template>
  <main class="grid place-items-center py-10">
    <div class="w-full max-w-[300px] bg-white rounded-lg shadow-md hover:shadow-xl transition p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">ثبت پست جدید</h2>

      <form
        class="flex flex-col gap-4"
        @submit.prevent="submit"
      >
        <InputField
          type="text"
          placeholder="عنوان"
          v-model="title"
          :error="hasError"
        />
        <InputField
          type="text"
          placeholder="شناسه"
          v-model="id"
        />
        <TextField
          placeholder="متن"
          v-model="body"
        />
        <Button
          type="submit"
          class="w-full rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          :disabled="hasError"
        >
          {{ postsStore.isLoading ? 'در حال ارسال...' : 'ارسال پست' }}
        </Button>
      </form>
    </div>
  </main>
</template>

<script setup>
import Button from '~/components/UI/Button.vue'
import InputField from '~/components/UI/InputField.vue'
import TextField from '~/components/UI/TextField.vue'
import { usePostStore } from '~/stores/posts'
import { useGlobalStore } from '~/stores/global'

const toast = useGlobalStore()

const postsStore = usePostStore()
const hasPersian = (text) => /[\u0600-\u06FF]/.test(text)
const hasError = computed(() => hasPersian(title.value))

const title = ref('')
const id = ref('')
const body = ref('')

async function submit() {
  if (!title.value || !id.value || !body.value) {
    toast.showToast('لطفاً فیلدها را کامل کنید.', 'error')
    return
  }

  const result = await postsStore.submitPost({
    title: title.value,
    id: Number(id.value),
    body: body.value,
    userId: 1,
  })

  if (result) {
    title.value = ''
    id.value = ''
    body.value = ''
  }
}
useHead({
  title: 'رسا سامانه | پست جدید',
  meta: [{ name: 'description', content: 'My amazing site.' }],
})
</script>
