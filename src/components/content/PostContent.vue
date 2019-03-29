<template>
  <div class="post-content">
    <template v-if="details">
      <div class="title">
        <img v-bind:src="details.author.profile.photos[0].value" alt>
        <span>
          <span>{{details.title}}</span>
          <span class="info">
            <span class="name">{{details.author.profile.displayName}}</span>
            <span class="date">{{details.date | date}}</span>
          </span>
        </span>
      </div>
      <div class="content">{{details.content}}</div>
      <!-- todo content -->
      <div class="actions">
        <button class="icon-button secondary" type="button" v-on:click="unselectPost">
          <i class="material-icons">close</i>
        </button>
        <!-- todo -->
      </div>
    </template>
    <div class="loading-animation" v-else>
      <div></div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapGetters: postsGetters,
  mapActions: postsActions
} = createNamespacedHelpers("posts");
export default {
  computed: {
    ...postsGetters({ details: "selectedPostDetails" })
  },
  methods: {
    ...postsActions(["unselectPost"])
  }
};
</script>

