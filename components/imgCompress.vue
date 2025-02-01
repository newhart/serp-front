<template>
  <nuxt-img quality="80" format="webp" :class="classImg" :src="url" alt="" />
</template>
<script>
export default {
  props: ["classImg", "url"],
};
</script>
