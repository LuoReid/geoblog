
<script>
import AppMenu from "./AppMenu.vue";
import BlogMap from "./BlogMap.vue";
import BlogContent from "./content/BlogContent.vue";
export default {
  // <template>
  //   <div class="geo-blog">
  //     <AppMenu/>
  //     <div class="panes">
  //       <BlogMap />
  //     </div>
  //   </div>
  // </template>
  // components: {
  //   AppMenu,BlogMap
  // }
  render(h) {
    return (
      <div class="geo-blog">
        <AppMenu />
        <div class="panes">
          <BlogMap />
          <BlogContent />
        </div>
      </div>
    );
  }
};
</script>

