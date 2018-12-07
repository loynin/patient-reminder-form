<template>
  <div class="home" v-if="isSubmitted">
    <div class="description">
      <h3>Hi {{fullname}}</h3>
      <p>Thanks for signing up for a reminder for {{medicine}}.
      We'll send it to {{email}} on {{dayorder}}, to give you a little notice.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThankYou',
  props: ['fullname', 'email', 'medicine', 'dayorder', 'isSubmitted'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
    text-align: left;
    width: 500px;
}
@media only screen and (max-width: $mobile-screen) {
.home {
    text-align: left;
    width: 100%;
}
.description {
  padding: 0 20px;
}
}

</style>
