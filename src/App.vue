<template>
  <router-view />
</template>
<script>
import { mapActions } from "vuex";

export default {
  created() {
    this.setUserInfo();
  },

  methods: {
    ...mapActions({
      setUserInfo: "setUserInfo",
    }),
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.g-auth {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  width: 100%;
  margin: auto;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.1);
}
</style>
