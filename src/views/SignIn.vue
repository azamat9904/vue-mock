<template>
  <div class="g-auth py-4">
    <b-form @submit="onSubmit">
      <p class="lead text-center fw-lighter">
        <strong>Форма авторизации</strong>
      </p>

      <b-form-input
        v-model="$v.form.email.$model"
        :state="
          $v.form.email.$dirty && $v.form.email.$error ? false : undefined
        "
        class="mb-3"
        placeholder="Введите email"
        size="md"
        type="email"
      />

      <b-form-input
        v-model="$v.form.password.$model"
        :state="
          $v.form.password.$dirty && $v.form.password.$error ? false : undefined
        "
        class="mb-3"
        placeholder="Введите пароль"
        size="md"
        type="password"
      />

      <b-button
        :disabled="$v.form.$invalid"
        class="w-100 mb-3"
        size="md"
        type="submit"
        variant="primary"
      >
        <template v-if="signInLoading">
          <b-spinner small></b-spinner>
          Loading...
        </template>
        <template v-else> Авторизоваться</template>
      </b-button>
      <span class="d-block text-center"
        >Еще не зарегистрированы ? <br />
        <router-link to="/sign-up"> Зарегистрироваться</router-link></span
      >
    </b-form>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import { signIn } from "@/api/Authoriation";
import axios from "@/api/index";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      signInLoading: false,
    };
  },
  validations: {
    form: {
      email: { required, email },
      password: { required },
    },
  },
  methods: {
    ...mapActions({
      setUserInfo: "setUserInfo",
    }),
    async onSubmit(event) {
      try {
        event.preventDefault();
        this.signInLoading = true;
        const { data } = await signIn(this.form);
        const token = data.token;
        localStorage.setItem("token", token);
        axios.defaults.headers.Authorization = "Bearer " + token;
        this.setUserInfo();
        this.$router.push("/main");
      } catch (error) {
        console.error(error);
        this.$bvToast.toast("Неправильный логин или пароль", {
          title: "Ошибка!",
          variant: "danger",
        });
      } finally {
        this.signInLoading = false;
      }
    },
  },
};
</script>
