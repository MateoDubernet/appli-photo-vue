<template>
  <!-- Bind 'submit' event to emit 'onSubmit' event -->
  <form
    class="base-form-component"
    @submit.prevent="onSubmit(cmpFormvalue.fieldsets)"
  >
    <h2 class="title is-size-4">{{ cmpFormvalue.title }}</h2>

    <!-- Display DOM loop: v-for -->
    <fieldset
      class="mb-4"
      v-for="(item, id) in cmpFormvalue.fieldsets"
      :key="`item-${id}`"
    >
      <label
        class="label"
        :for="`item-${item.name}-${id}`"
        v-text="item.label"
      />

      <input
        class="input"
        :type="item.type"
        :id="`item-${item.name}-${id}`"
        :name="item.name"
        :required="item.required"
        :min="item.min"
        v-model="item.value"
      />
    </fieldset>

    <BaseCallToAction
      :item="{
        type: 'submit',
        content: cmpFormvalue.submit,
        isfull: true,
        isprimary: true
      }"
      :formvalue="cmpFormvalue"
      @onClick="onSubmit(cmpFormvalue.fieldsets)"
    />
  </form>
</template>

<script>
/*
  [IMPORT] Modules/components
*/
import BaseCallToAction from './BaseCallToAction.vue';

/*
  [CTRL] App.vue
  Define component controller
*/
export default {
  name: 'BaseForm',

  /*
    [VUE] Props
    Data binding from parent component
  */
  props: {
    formvalue: {
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
    cmpFormvalue() {
      return this.formvalue;
    },
  },

  /*
    [VUE] Components
    Used to inject child components
  */
  components: {
    BaseCallToAction,
  },

  /*
    [VUE] Methods
    Used to add functionalities
  */
  methods: {
    onSubmit(fieldsets) {
      // Extract form value
      const returnedObject = {};

      // Get each form fieldset
      for (const item of fieldsets) {
        returnedObject[item.name] = item.value;
      }

      // Emit computed value to parent
      this.$emit('onSubmit', returnedObject);
    },
  },
};
</script>

<style scoped>
.base-form-component {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.base-form-component h2 {
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.base-form-component fieldset {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: none;
  padding: 0;
}

.base-form-component input.input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: all 0.2s;
}

.base-form-component input.input:focus {
  outline: none;
  border-color: #3273dc;
  box-shadow: 0 0 0 2px rgba(50,115,220,0.2);
}
</style>
