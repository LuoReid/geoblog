<template>
  <div class="blog-map">
    <googlemaps-map
      v-bind:center="center"
      v-bind:zoom="zoom"
      v-bind:options="mapOptions"
      v-on:update:center="setCenter"
      v-on:update:zoom="setZoom"
    />
    <googlemap-user-position v-on:update:position="setUserPosition"/>
  </div>
</template>
<script>
import {createNamespacedHelpers} from vuex
const {mapGetters,mapActions} = createNamespacedHelpers ('maps')
export default {
  data() {
    return {
      center: {
        lat: 48.8538302,
        lng: 2.2982161
      },
      zoom: 15
    };
  },
  computed: {
    ...mapGetters(['center','zoom']),
    mapOptions() {
      return {
        fullscreenControl: false
      };
    }
  },
  methods:mapActions(['setCenter','setZoom','setUserPosition'])
  //  {
  //   setCenter(value) {
  //     this.center = value;
  //   },
  //   setZoom(value) {
  //     this.zoom = value;
  //   }
  // }
};
</script>

