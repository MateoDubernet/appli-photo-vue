<template>
  <button
    class="base-call-to-action-component button"
    :class="{
      'has-background-primary has-text-white': cmpItem.isprimary,
      'is-fullwidth': cmpItem.isfull,
      'is-small': !cmpItem.isfull,
    }"
    :type="cmpItem.type"
    v-text="cmpItem.content"
    @click.prevent="$emit('onClick', cmpItem.action), resetForm()"
  />
</template>

<script>
export default {
  name: 'BaseCallToAction',

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
    formvalue: {
      type: Object,
      required: false,
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
    cmpFormvalue() {
      return this.formvalue;
    },
  },

  /*
    [VUE] Methods
  */
  methods: {
    /*
      TODO: Basic security
      When a user submit a form, we must wait for response and disable form submit.
      - Find a way to clear form value at success
    */
    resetForm() {
      if (!this.cmpFormvalue?.fieldsets) return;
      this.cmpFormvalue.fieldsets.forEach((form) => {
        form.value = null;
      });
    },
  },
};
</script>

<style scoped>
.base-call-to-action-component {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.25rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: none;
}

.base-call-to-action-component.has-background-primary {
  background-color: #3273dc;
  color: #fff;
}

.base-call-to-action-component:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.base-call-to-action-component.is-small {
  padding: 0.35rem 0.75rem;
  font-size: 0.875rem;
}

.base-call-to-action-component.is-fullwidth {
  width: 100%;
}
</style>
