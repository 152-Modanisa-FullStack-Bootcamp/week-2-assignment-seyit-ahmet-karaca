<template>
  <div class="header-container">
    <button class="favorite-button" @click="navigateFavorites">Favorites</button>
  </div>
</template>

<script>
export default {
  props: {
    favorites: {
      type: Array,
    }
  },
  data() {
    return {
      userId: "bootcamp",
    }
  },
  methods: {
    navigateFavorites() {
      const route = {name: "favorites", params: {"userid": this.userId}};
      if (this.favorites !== undefined && this.favorites.length !== 0) {
        const favIds = this.favorites.reduce((prev, current) => prev + "," + current);
        route.query = {fav: favIds}
      }
      this.$router.push(route);
    }
  }
}
</script>

<style scoped>
.header-container {
  width: 1540px;
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
}

.favorite-button {
  height: 40px;
  width: 150px;
  font-size: 23px;
}
</style>