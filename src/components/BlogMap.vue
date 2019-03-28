<template>
  <div class="blog-map">
    <GmapMap
      v-bind:center="center"
      v-bind:zoom="zoom"
      v-bind:options="mapOptions"
      v-on:update:center="setCenter"
      v-on:update:zoom="setZoom"
      v-on:click="onMapClick"
      v-on:idle="onIdle"
    />
    <googlemaps-marker
      v-for="post of posts"
      v-bind:key="post._id"
      v-bind:label="{color:post === currentPost?'where':'black',
    fontFamily:'Material Icons',
    fontSize:'20px',
    text:'face',}"
    v-bind:position="post.position"
    v-bind:z-index="5"
    v-on:click="selectPost(post._id)"
    />
      <!--
      <googlemap-user-position
      v-on:update:position="setUserPosition"
    />-->
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
    ...postsActions(["setDraftLocation","selectPost"]),
    onMapClick(event) {
      this.setDraftLocation({
        position: event.latLng,
        placeId: event.placeId
      });
    },
    onIdle() {
      this.setBounds(this.$refs.map.getBounds());
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

