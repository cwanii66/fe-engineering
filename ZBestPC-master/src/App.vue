<template>
  <div id="app">
    {{ message }}
  </div>
</template>

<script setup>
  import { ref } from '@vue/reactivity';

  const message = ref('');

  message.value = 'Hello World!';
</script>

<style>

</style>