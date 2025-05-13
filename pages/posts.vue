<template>
  <!-- <div>
    <h1 class="">Posts</h1>
    <button @click="fetchPosts">Load Posts</button>

    <div v-if="loading">Loading...</div>
    <div v-if="error">❌ Error: {{ error.message }}</div>

    <ul v-if="!loading">
      <li
        v-for="post in posts"
        :key="post.id"
      >
        <strong>{{ post.title }}</strong>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div> -->
</template>

<script setup>
// const { posts, fetchPosts, loading, error } = usePostsStore()
useHead({
  title: 'رسا سامانه | پست ها',
  meta: [{ name: 'description', content: 'My amazing site.' }],
})
</script>
