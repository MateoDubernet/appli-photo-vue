<template>
  <section class="dashboard-view-component section">
    <article class="box">
      <h1 class="component-title">Albums</h1>
      <BasePushAlbum />
    </article>
  </section>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */

import BasePushAlbum from '../components/base/BasePushAlbum.vue';

export default {
  name: 'DashboardView',
  components: {
    BasePushAlbum,
  },
};
</script>

<style scoped>
.dashboard-view-component {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  flex: 1;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
}

.component-title {
  font-size: 30px;
  border-bottom: 1px solid black;
  padding-bottom: 15px;
  margin-bottom: 1rem;
}

.box {
  padding: 1.5rem;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}
</style>