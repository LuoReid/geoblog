<template>
  <div class="blog-map">
    <GmapMap
      v-bind:center="center"
      v-bind:zoom="zoom"
      v-bind:options="mapOptions"
      v-on:update:center="setCenter"
      v-on:update:zoom="setZoom"
      v-on:click="onMapClick"
    />
    <!-- <googlemap-user-position v-on:update:position="setUserPosition"/> -->
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapGetters: mapsGetters,
  mapActions: mapsActions
} = createNamespacedHelpers("maps");
const {
  mapGetters: postsGetters,
  mapActions: postsActions
} = createNamespacedHelpers("posts");
export default {
  data() {
    return {
      // center: {
      //   lat: 48.8538302,
      //   lng: 2.2982161
      // },
      // zoom: 15
    };
  },
  computed: {
    ...mapsGetters(["center", "zoom"]),
    ...postsGetters(["draft"]),
    mapOptions() {
      return {
        fullscreenControl: false
      };
    }
  },
  methods: {
    ...mapsActions(["setCenter", "setZoom", "setUserPosition"]),
    ...postsActions(["setDraftLocation"]),
    onMapClick(event) {
      this.setDraftLocation({
        position: event.latLng,
        placeId: event.placeId
      });
    }
  }
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

