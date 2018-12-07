<template>
  <div id="app">
    <main>
      <div class="wrapper">
        <Header/>
        <SubmitForm/>
      </div>
    </main>
  </div>
</template>

<script>

import SubmitForm from './components/SubmitForm.vue';
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    // eslint-disable-next-line
    SubmitForm,
    // eslint-disable-next-line
    Header,
  },
};
console.log(new Date());
</script>

<style lang="scss">
body {
  background-color: black;
  color: #6c727b;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: white;
  margin: 0;
}

main {
  margin: 0 auto;
  background-color: white;
  max-width: 800px;
  min-height: 400px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.wrapper {
  padding: 20px;
}
@media only screen and (max-width: $mobile-screen) {
  body {
    background: black;
    margin: 0;
  }
  #app {
    background: white;
    margin: 5px;
  }
  main {
    width: 100%;
    padding: 0;
  }
}

</style>
