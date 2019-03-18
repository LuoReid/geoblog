<template>
  <div class="app-menu">
    <div class="header">
      <i class="material-icons">place</i>
      GeoBlog
    </div>

    <div class="user">
      <div class="info" v-if="user">
        <span class="picture" v-if="userPicture">
          <img v-bind:src="userPicture" alt>
        </span>
        <span class="username">{{user.profile.displayName}}</span>
      </div>
      <a v-on:click="centerOnUser">
        <i class="material-icons">power_settings_new</i>
      </a>
    </div>
  </div>
</template> 
<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
    userPicture() {
      return null; //todo
    }
  },
  methods: {
    centerOnUser() {
      //todo
    },
    logout() {
      //todo
    },
  }
};
</script>
