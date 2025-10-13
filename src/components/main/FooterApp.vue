<template>
  <footer class="footer-app-component">
    <h1 class="appli-title-footer">
      Footer-app-component
    </h1>
  </footer>
</template>

<script>
export default {
  name: 'FooterApp',
};
</script>

<style scoped>
.footer-app-component {
  height: 60px;           /* taille fixe */
  flex-shrink: 0;         /* ne rétrécit jamais */
  background-color: #fff;
  text-align: center;
  box-shadow: 0 -2px 6px rgba(0,0,0,0.05);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex-shrink: 0;
}

.appli-title-footer {
  font-weight: 600;
  font-size: 1rem;
  color: #555;
}
</style>
