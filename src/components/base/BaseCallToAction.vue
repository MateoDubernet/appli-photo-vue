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
    @click.prevent="$emit('onClick', cmpItem.action), resetForm()"/>
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
        default: () => {}
      },
      formvalue: {
          type: Object,
          required: false,
          default: () => {}
        }
    },

  /* 
    [VUE] Computed
    Used to have version of property value
  */
    computed: {
      cmpItem: function(){ return this.item },
      cmpFormvalue: function(){ return this.formvalue }
    },

    methods: {
      resetForm(){
        this.cmpFormvalue.fieldsets.forEach(form => {
          form.value = null;
        });
      }
    }
}
</script>