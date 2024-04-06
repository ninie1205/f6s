<script setup lang="ts">
defineProps(['messageEntry'])
</script>
<template>
  <div class="message-wrapper">
    <div class="thumbnail-wrapper">
      <div class="thumbnail">
        <img :src="messageEntry.from.thumbnail" alt="" >
      </div>
      <h3 class="name">{{ messageEntry.from.firstName }} {{ messageEntry.from.lastName }}</h3>
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

}
.thumbnail-wrapper {
  position: relative;
  &:hover {
    .name {
      opacity: 1;
    }
  }
  .name {
    opacity: 0;
    position: absolute;
    white-space: nowrap;
    left: 4px;
    bottom: 100%;
    transform: translateY(-20%);
    font-weight: 700;
    font-size: 0.75rem;
    background-color: white;
    padding: 0.25rem;
    border-radius: 4px;
    box-shadow: 1px 2px 6px rgba(0,0,0,0.12);
    .is-mine & {
      right: 4px;
      left: auto;
    }
  }
}
.thumbnail {
  width: 48px;
  height: 48px;
  border-radius: 100%;
  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 0;
  position: relative;

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
