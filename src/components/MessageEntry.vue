<script setup lang="ts">
defineProps(['messageEntry'])
</script>
<template>
  <div class="message-wrapper">
    <h3 class="name">{{ messageEntry.from.firstName }} {{ messageEntry.from.lastName }}</h3>
    <div class="thumbnail">
      <img :src="messageEntry.from.thumbnail" alt="" >
    </div>
    <div class="message-bubble">
      <p v-html="messageEntry.message"></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-wrapper {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  .is-mine & {
    flex-direction: row-reverse;
  }
  .name {
    display: none;
    position: absolute;
    right: 0;
    bottom: 100%;
    transform: translateY(-50%);
    font-weight: 700;
    font-size: 1rem;
    background-color: white;
    padding: 0.25rem;
    border-radius: 4px;
  }
}
.thumbnail {
  width: 48px;
  height: 48px;
  border-radius: 100%;
  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 0;
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

}
.message-bubble {
  background-color: #f4f4f4;
  padding: 0.5rem;
  border-radius: 8px;
  max-width: calc(60% - 48px);
  .is-mine & {
    background-color: #ddefff;
  }

}
</style>
