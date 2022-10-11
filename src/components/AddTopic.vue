<template>
  <b-modal id="topic-modal" centered title="Добавление тематики">
    <template #default>
      <b-form-input
        v-model="$v.topic.nameKz.$model"
        :state="
          $v.topic.nameKz.$dirty && $v.topic.nameKz.$error ? false : undefined
        "
        class="mb-3"
        placeholder="Введите название темы на казахском"
        size="md"
        type="text"
      />
      <b-form-input
        v-model="$v.topic.nameRu.$model"
        :state="
          $v.topic.nameRu.$dirty && $v.topic.nameRu.$error ? false : undefined
        "
        class="mb-3"
        placeholder="Введите название темы на русском"
        size="md"
        type="text"
      />
      <b-form-input
        v-model="$v.topic.nameEn.$model"
        :state="
          $v.topic.nameEn.$dirty && $v.topic.nameEn.$error ? false : undefined
        "
        class="mb-3"
        placeholder="Введите название темы на английском"
        size="md"
        type="text"
      />

      <b-form-textarea
        id="textarea"
        v-model="$v.topic.goals.$model"
        :state="
          $v.topic.goals.$dirty && $v.topic.goals.$error ? false : undefined
        "
        class="mb-3"
        max-rows="6"
        placeholder="Введите цели..."
        rows="3"
      ></b-form-textarea>

      <b-form-textarea
        id="textarea"
        v-model="$v.topic.tasks.$model"
        :state="
          $v.topic.tasks.$dirty && $v.topic.tasks.$error ? false : undefined
        "
        max-rows="6"
        placeholder="Введите задачи..."
        rows="3"
      ></b-form-textarea>
    </template>
    <template #modal-footer>
      <b-button
        :disabled="$v.topic.$invalid"
        size="sm"
        variant="outline-primary"
        @click="addTopic"
      >
        <template v-if="addTopicLoading">
          <b-spinner small></b-spinner>
          Loading...
        </template>
        <template v-else> Добавить тему</template>
      </b-button>
    </template>
  </b-modal>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { addTopic } from "@/api/Topic";

export default {
  data() {
    return {
      addTopicLoading: false,
      topic: {
        nameKz: null,
        nameRu: null,
        nameEn: null,
        goals: null,
        tasks: null,
      },
    };
  },
  validations: {
    topic: {
      nameKz: { required },
      nameRu: { required },
      nameEn: { required },
      goals: { required },
      tasks: { required },
    },
  },
  methods: {
    async addTopic() {
      try {
        const topic = this.topic;
        this.addTopicLoading = true;
        const { data } = await addTopic({ topic });
        this.$bvToast.toast("Темтика успешно добавлена", {
          title: "Успех!",
          variant: "success",
        });
        this.$store.commit("ADD_TOPIC", topic);
        this.topic = {
          nameKz: null,
          nameRu: null,
          nameEn: null,
          goals: null,
          tasks: null,
        };
        this.$nextTick(() => {
          this.$bvModal.hide("topic-modal");
        });
      } catch (error) {
        console.error(error);
        this.$bvToast.toast("Не удалось добавить тему, попробуйте позже", {
          title: "Ошибка!",
          variant: "danger",
        });
      } finally {
        this.addTopicLoading = false;
      }
    },
  },
};
</script>
