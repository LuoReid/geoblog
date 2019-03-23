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
        <i class="material-icons">my_location</i>
      </a>
      <a v-on:click="logout">
        <i class="material-icons">power_settings_new</i>
      </a>
    </div>
  </div>
</template> 
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  // computed: mapGetters(["user", "userPicture"]),
  // methods: mapActions([{ centerOnUser: "login", logout: "logout" }])
  computed:{
    user(){ return this.$store.state.user },
    userPicture() { return null }
  },
  methods:{
    centerOnUser(){    },
    logout(){}
  }
};
</script>
