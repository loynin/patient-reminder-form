<template>
  <div class="home">
    <img class="reminder-image" src="../assets/rx_reminder.png" />
    <div>
      <h1>Welcome to Honeybee Health</h1>
      <h2>Sign-up for reminder emails!</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
.home {
    text-align: center;
}
.reminder-image {
    float: right;
    padding-top: 50px;
}
h1 {
  font-size: 2em;
}
@media only screen and (min-width: 600px) and (max-width: 800px) {
  .reminder-image {
    float:initial;
    padding-top: 50px;
    width: 120px;
  }
  h1 {
    font-size: 1.7em;
  }
  h2 {
    font-size: 1.5em;
  }
}
@media only screen and (max-width: $mobile-screen) {
  .reminder-image {
    float:initial;
    padding-top: 50px;
    width: 100px;
  }
  h1 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 1.3em;
  }
}
</style>
