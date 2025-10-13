<template>
  <figure class="base-image-component">
    <figcaption class="mb-5">
      <h2 class="is-size-4">{{ cmpItem.title }}</h2>
      <p class="is-size-6">{{ cmpItem.caption }}</p>
    </figcaption>

    <BaseCallToActionVue
      :item="{
        type: 'button',
        content: 'Ouvrir',
        isfull: false,
        isprimary: false
      }"
      @onClick="$emit('onDisplaySnapshoot', cmpItem.id)"
    />
  </figure>
</template>

<script>
import BaseCallToActionVue from './BaseCallToAction.vue';

export default {
  name: 'BaseImage',

  /*
    [VUE] Components
    Used to inject child components
  */
  components: {
    BaseCallToActionVue,
  },

  /*
    [VUE] Props
    Data binding from parent component
  */
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  /*
    [VUE] Computed
    Used to have version of property value
  */
  computed: {
    cmpItem() {
      return this.item;
    },
  },
};
</script>

<style scoped>
.base-image-component {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.base-image-component figcaption h2 {
  margin-bottom: 0.25rem;
}

.base-image-component figcaption p {
  font-size: 0.875rem;
  color: #555;
}
</style>
