<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand
      >{{ isTeacher ? "Панель препродователя" : "Панель студента" }}
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" class="justify-content-end" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto justify-content-end">
        <b-nav-item-dropdown right>
          <template #button-content> Пользователь</template>
          <b-dropdown-item @click.prevent="signOut">Выйти</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  nama: "Header",
  data() {
    return {};
  },

  computed: {
    isTeacher() {
      return this.$store.getters.isTeacher;
    },
  },

  methods: {
    ...mapActions({
      setUserInfo: "setUserInfo",
    }),
    signOut() {
      localStorage.removeItem("token");
      this.setUserInfo();
      this.$router.push("/sign-in");
    },
  },
};
</script>
