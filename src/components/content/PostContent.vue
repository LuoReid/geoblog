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
      <div class="comments">
        <Comment
          v-for="(comment,index) of details.comments"
          v-bind:key="index"
          v-bind:comment="comment"
        />
      </div>
      <div class="actions">
        <button class="icon-button secondary" type="button" v-on:click="unselectPost">
          <i class="material-icons">close</i>
        </button>
        <!-- todo -->
        <input
          v-model="commentContent"
          placeholder="Type a comment"
          v-on:keyup.enter="submitComment"
        >
        <button
          type="button"
          class="icon-button"
          v-on:click="submitComment"
          v-bind:disabled="!commentFormValid"
        >
          <i class="material-icons">send</i>
        </button>
      </div>
    </template>
    <div class="loading-animation" v-else>
      <div></div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import Comment from "./Comment.vue";
const {
  mapGetters: postsGetters,
  mapActions: postsActions
} = createNamespacedHelpers("posts");
export default {
  components: { Comment },
  data() {
    return {
      commentContent: ""
    };
  },
  computed: {
    ...postsGetters({ details: "selectedPostDetails" }),
    commentFormValid() {
      return this.commentContent;
    }
  },
  methods: {
    ...postsActions(["unselectPost", "sendComment"]),
    async submitComment() {
      if (this.commentFormValid) {
        this.sendComment({
          post: this.details,
          comment: { content: this.commentContent }
        });
        this.commentContent = "";
      }
    }
  }
};
</script>

