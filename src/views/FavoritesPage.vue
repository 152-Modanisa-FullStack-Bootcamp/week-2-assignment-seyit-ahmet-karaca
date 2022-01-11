<template>
  <div class="filtered-video-container">
    <the-header :favorites="videoIds"></the-header>
    <filtered-video-card
        v-for="video in videos" :key="video.id"
        :filteredVideo="video"
    ></filtered-video-card>
  </div>
</template>

<script>
import FilteredVideoCard from "../components/FavoriteVideoCard";
import VideosAPI from "../services/VideosAPI";
import TheHeader from "../components/TheHeader";

export default {
  name: "FavoritesPage",
  components: {
    FilteredVideoCard,
    TheHeader
  },
  data() {
    return {
      videos: [],
    }
  },
  computed: {
    videoIds() {
      if (this.videos.length !== 0) {
        return this.videos.map(video => video.id)
      }
      return [];
    }
  },
  async mounted() {
    this.videos = await VideosAPI.getVideoList();

    if (this.$route.query.fav) {
      const favIds = this.$route.query.fav;
      console.log(this.videos);

      let queriedIds = [];
      if ((typeof favIds) !== "number") {
        queriedIds = favIds.split(",").map(s => Number(s));
      } else {
        queriedIds.push(favIds)
      }
      this.videos = this.videos.filter(video => queriedIds.includes(video.id));
    } else {
      this.videos = [];
    }
  }
}
</script>

<style scoped>

.filtered-video-container {
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 1540px;
  margin-bottom: 20px;
}
</style>