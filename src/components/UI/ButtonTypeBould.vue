<template>
  <button class="btn">
      <slot>Кнопка</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ButtonTypeBould'
})
</script>

<style scoped>
.btn {
    font-size: 16px;
    color: #fff;
    background-color: #f14d34;
    border: 2px solid #f14d34;
    border-radius: 6px;
    padding: 16px 54px;
    cursor: pointer;
    transition: all 200ms ease;
}

.btn:hover {
    color: #f14d34;
    background-color: #fff;
}
</style>