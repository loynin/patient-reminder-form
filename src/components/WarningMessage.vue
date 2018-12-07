<template>
  <div class="home" v-if="isSubmitted">
    <p class="description">As a service, here are the possible
        drug reactions you should contact your doctor if you're experiencing:
        <ul>
          <li v-for="(reaction, index) in reactions" :key="index">{{reaction.reactionmeddrapt}}</li>
        </ul>
    </p>
  </div>
</template>

<script>
export default {
  name: 'WarningMessage',
  props: ['isSubmitted', 'reactions'],
};
</script>

<style scoped lang="scss">
.home {
    text-align: left;
    width: 500px;
}
.description {
  padding: 20px;
  color: red;
}
@media only screen and (max-width: $mobile-screen) {
.home {
    text-align: left;
    width: 100%;
}
}
</style>
