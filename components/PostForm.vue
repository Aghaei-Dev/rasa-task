<template>
  <main class="grid place-items-center py-10">
    <div :class="['w-full  rounded-lg  transition p-6', props.isNewPost ? 'shadow-md hover:shadow-xl bg-white max-w-[300px] ' : '']">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">
        {{ props.isNewPost ? 'ثبت پست جدید' : 'ویرایش پست' }}
      </h2>

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
          :isReadOnly="isNewPost ? false : true"
          type="text"
          placeholder="شناسه"
          v-model="id"
        />
        <TextField
          placeholder="متن"
          v-model="body"
          :rows="props.isNewPost ? '5' : '8'"
        />
        <Button
          type="submit"
          class="w-full rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          :disabled="hasError"
        >
          {{ postsStore.isLoading ? `${isNewPost ? 'در حال ارسال ...' : 'در حال ویرایش ...'}` : isNewPost ? 'ارسال پست' : 'ویرایش پست' }}
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

const props = defineProps({
  isNewPost: {
    type: Boolean,
    required: true,
    default: false,
  },
  postData: {
    type: Object,
    default: () => ({ title: '', id: '', body: '' }),
  },
})

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
  if (!props.isNewPost) {
    postsStore.updatePost(postsStore.editPostData)
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
    toast.closeModal()
  }
}
onMounted(() => {
  if (!props.isNewPost) {
    title.value = props.postData.title || ''
    id.value = props.postData.id?.toString() || ''
    body.value = props.postData.body || ''
  }
})

watch(
  () => props.postData,
  (newPost) => {
    if (!props.isNewPost && newPost) {
      title.value = newPost.title || ''
      id.value = newPost.id?.toString() || ''
      body.value = newPost.body || ''
    }
  },
  { immediate: false, deep: true }
)
</script>
