<template>
  <div class="location-info" v-if="currentPost">
    <googlemaps-place-details
      v-if="currentPost.placeId"
      v-bind:request="{placeId:currentPost.placeId}"
    >
      <PlaceDetails
        slot-scope="props"
        v-if="props.results"
        v-bind:name="props.results.name"
        v-bind:address="props.results.formatted_address"
      />
    </googlemaps-place-details>
    <googlemaps-geocode v-else v-bind:request="{location:currentPost.position}">
      <placeDetails
        slot-scope="props"
        v-if="props.results"
        v-bind:name="props.results[1].placeDetails.name"
        v-bind:address="props.results[0].formatted_address"
      />
    </googlemaps-geocode>
  </div>
  <div v-else></div>
</template>
<script>
import PlaceDetails from "./PlaceDetails.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: postsGetters } = createNamespacedHelpers("posts");
export default {
  components: { PlaceDetails },
  computed: postsGetters(["currentPost"])
};
</script>
