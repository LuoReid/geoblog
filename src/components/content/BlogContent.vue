<script>
import LocationInfo from "./LocationInfo.vue";
import CreatePost from "./CreatePost.vue";
import NoContent from "./NoContent.vue";
import PostContent from "./PostContent.vue";
import { createNamespacedHelpers } from "vuex";
const {
  mapGetters: postsGetters,
  mapActions: postsActions
} = createNamespacedHelpers("posts");
export default {
  computed: {
    ...postsGetters(["draft", "currentPost"]),
    cssClass() {
      return ["blog-content", { "has-content": this.currentPost }];
    }
  },
  render(h) {
    let Content;
    if (!this.currentPost) {
      Content = NoContent;
    } else {
      Content = PostContent;
    }
    return (
      <div class={this.cssClass}>
        <LocationInfo /> <Content />
      </div>
    );
  }
};
</script>
