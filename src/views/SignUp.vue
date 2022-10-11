<template>
  <div class="g-auth">
    <b-form @submit="onSubmit">
      <p class="lead text-center fw-lighter">
        <strong>Форма регистрации</strong>
      </p>
      <b-form-select
        v-model="$v.form.role.$model"
        :options="staffOptions"
        :state="$v.form.role.$dirty && $v.form.role.$error ? false : undefined"
        class="mb-2"
        required
        size="sm"
      >
        <template #first>
          <b-form-select-option :value="null" disabled
            >Выберите роль
          </b-form-select-option>
        </template>
      </b-form-select>

      <b-form-input
        v-model="$v.form.email.$model"
        :state="
          $v.form.email.$dirty && $v.form.email.$error ? false : undefined
        "
        class="mb-2"
        placeholder="Введите email"
        size="sm"
        type="email"
      />

      <b-form-input
        v-model="$v.form.password.$model"
        :state="
          $v.form.password.$dirty && $v.form.password.$error ? false : undefined
        "
        class="mb-2"
        placeholder="Введите пароль"
        size="sm"
        type="password"
      />
      <b-form-input
        v-model="$v.form.repeatedPassword.$model"
        :state="
          $v.form.repeatedPassword.$dirty &&
          !$v.form.repeatedPassword.sameAsPassword
            ? false
            : undefined
        "
        class="mb-2"
        placeholder="Повторите пароль"
        size="sm"
        type="password"
      />

      <b-form-input
        v-model="$v.form.first_name.$model"
        :state="
          $v.form.first_name.$dirty && $v.form.first_name.$error
            ? false
            : undefined
        "
        class="mb-2"
        placeholder="Имя"
        size="sm"
        type="text"
      />

      <b-form-input
        v-model="$v.form.surname.$model"
        :state="
          $v.form.surname.$dirty && $v.form.surname.$error ? false : undefined
        "
        class="mb-2"
        placeholder="Фамилия"
        size="sm"
        type="text"
      />

      <b-form-input
        v-model="$v.form.last_name.$model"
        :state="
          $v.form.last_name.$dirty && $v.form.last_name.$error
            ? false
            : undefined
        "
        class="mb-2"
        placeholder="Отчество"
        size="sm"
        type="text"
      />

      <b-form-input
        v-if="isStudentRoleChosen"
        v-model="$v.additionalForm.educationFormKz.$model"
        :state="
          $v.additionalForm.educationFormKz.$dirty &&
          $v.additionalForm.educationFormKz.$error
            ? false
            : undefined
        "
        class="mb-2"
        placeholder="Образовательная программа (KZ)"
        size="sm"
        type="text"
      />

      <b-form-input
        v-if="isStudentRoleChosen"
        v-model="$v.additionalForm.educationFormRu.$model"
        :state="
          $v.additionalForm.educationFormRu.$dirty &&
          $v.additionalForm.educationFormRu.$error
            ? false
            : undefined
        "
        class="mb-2"
        placeholder="Образовательная программа (RU)"
        size="sm"
        type="text"
      />

      <b-form-input
        v-if="isStudentRoleChosen"
        v-model="$v.additionalForm.educationFormEn.$model"
        :state="
          $v.additionalForm.educationFormEn.$dirty &&
          $v.additionalForm.educationFormEn.$error
            ? false
            : undefined
        "
        class="mb-2"
        placeholder="Образовательная программа (EN)"
        size="sm"
        type="text"
      />

      <b-form-input
        v-if="isStudentRoleChosen"
        v-model="$v.additionalForm.educationCode.$model"
        :state="
          $v.additionalForm.educationCode.$dirty &&
          $v.additionalForm.educationCode.$error
            ? false
            : undefined
        "
        class="mb-2"
        placeholder="Образовательный код"
        size="sm"
        type="text"
      />

      <b-button
        :disabled="isFormInvalid || signUpLoading"
        class="w-100"
        type="submit"
        variant="primary"
      >
        <template v-if="signUpLoading">
          <b-spinner small></b-spinner>
          Loading...
        </template>
        <template v-else> Зарегистрироваться</template>
      </b-button>
      <router-link class="d-block text-center mt-2" to="/sign-in">
        Авторизоваться
      </router-link>
    </b-form>
  </div>
</template>
<script>
import { required, email, sameAs } from "vuelidate/lib/validators";
import { signUp } from "@/api/Authoriation";

export default {
  data() {
    return {
      signUpLoading: false,
      form: {
        role: "teacher",
        email: null,
        password: null,
        repeatedPassword: null,
        first_name: null,
        last_name: null,
        surname: null,
      },
      additionalForm: {
        educationFormKz: null,
        educationFormRu: null,
        educationFormEn: null,
        educationCode: null,
      },
      staffOptions: [
        {
          value: "teacher",
          text: "Преподователь",
        },
        {
          value: "student",
          text: "Студент",
        },
      ],
    };
  },

  computed: {
    isStudentRoleChosen() {
      return this.form.role === "student";
    },
    isFormInvalid() {
      if (this.form.role === "student")
        return this.$v.form.$invalid || this.$v.additionalForm.$invalid;

      return this.$v.form.$invalid;
    },
  },
  methods: {
    async onSubmit(event) {
      try {
        event.preventDefault();
        this.signUpLoading = true;
        await signUp(this.form);
        await this.$router.push({ path: "/sign-in" });
      } catch (error) {
        console.error(error);
        this.$bvToast.toast("Возможно такой email существует", {
          title: "Ошибка!",
          variant: "danger",
        });
      } finally {
        this.signUpLoading = false;
      }
    },
  },
  validations() {
    return {
      form: {
        role: { required },
        email: { required, email },
        password: { required },
        repeatedPassword: { required, sameAsPassword: sameAs("password") },
        first_name: { required },
        last_name: { required },
        surname: { required },
      },

      additionalForm: {
        educationFormKz: { required },
        educationFormRu: { required },
        educationFormEn: { required },
        educationCode: { required },
      },
    };
  },
};
</script>
<style lang="scss" scoped></style>
