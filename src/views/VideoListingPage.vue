<template>
  <div class="main-listing-container">
    <the-header :favorites="favoriteVideoIds"></the-header>

    <div class="video-listing-container">
      <listed-video-card
          v-for="video in videos" :key="video.id"
          :video="video"
          @addFavorite="collectFavoriteVideoIds"
      ></listed-video-card>
    </div>
  </div>
</template>

<script>
import VideosAPI from "../services/VideosAPI";
import ListedVideoCard from "../components/MainVideoCard";
import TheHeader from "../components/TheHeader";

export default {
  name: "VideoListPage",
  components: {
    ListedVideoCard,
    TheHeader
  },
  data() {
    return {
      videos: [],
      favoriteVideoIds: []
    }
  },
  methods: {
    collectFavoriteVideoIds(videoId) {
      const isVideoIn = this.favoriteVideoIds.some(id => id === videoId);
      if (isVideoIn) {
        this.favoriteVideoIds.splice(this.favoriteVideoIds.indexOf(videoId), 1);
      } else {
        this.favoriteVideoIds.push(videoId);
      }
    }
  },
  async mounted() {
    this.videos = await VideosAPI.getVideoList();
  }
}
</script>

<style scoped>
.main-listing-container {
  display: flex;
  width: 1540px;
  flex-direction: column;
}

.video-listing-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

</style>