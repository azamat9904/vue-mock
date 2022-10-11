<template>
  <div>
    <Header />
    <main>
      <b-container>
        <div v-if="isTeacher">
          <div class="d-flex justify-content-end mt-4">
            <b-button v-b-modal.topic-modal variant="primary"
              >Добавить тематику
            </b-button>
          </div>

          <b-table
            :busy="topicsLoading"
            :fields="fields"
            :items="topics"
            class="mt-5"
            hover
            outlined
            show-empty
          >
            <template #cell(chevron)="row">
              <b-icon
                :style="{
                  transform: row.detailsShowing
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)',
                }"
                aria-hidden="true"
                icon="chevron-down"
                style="transition: 0.3s all"
                @click="row.toggleDetails"
              ></b-icon>
            </template>
            <template #cell(takenBy)="row">
              {{ getFullname(row) }}
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong style="margin-left: 10px">Загрузка...</strong>
              </div>
            </template>
            <template #row-details="row">
              <div class="dropdown">
                <div class="dropdown__item">
                  <span class="dropdown__title"><strong>Цели:</strong></span>
                  <p class="dropdown__text">{{ row.item.goals }}</p>
                </div>
                <div class="dropdown__item">
                  <span class="dropdown__title"><strong>Задачи:</strong></span>
                  <p class="dropdown__text">{{ row.item.tasks }}</p>
                </div>
              </div>
            </template>
            <template #empty>
              <span>Нет данных</span>
            </template>
          </b-table>
        </div>
        <div v-else>
          <b-table
            :busy="remainTopicsLoading"
            :fields="studentFields"
            :items="remainTopics"
            class="mt-5"
            hover
            outlined
            show-empty
          >
            <template #cell(chevron)="row">
              <b-icon
                :style="{
                  transform: row.detailsShowing
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)',
                }"
                aria-hidden="true"
                icon="chevron-down"
                style="transition: 0.3s all"
                @click="row.toggleDetails"
              ></b-icon>
            </template>
            <template #cell(take)="row">
              <b-button
                :disabled="
                  $store.state.chooseTopicLoading || $store.state.isTopicChosen
                "
                variant="primary"
                @click="takeTopicHandler(row)"
                >Взять
              </b-button>
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong style="margin-left: 10px">Загрузка...</strong>
              </div>
            </template>
            <template #row-details="row">
              <div class="dropdown">
                <div class="dropdown__item">
                  <span class="dropdown__title"><strong>Цели:</strong></span>
                  <p class="dropdown__text">{{ row.item.goals }}</p>
                </div>
                <div class="dropdown__item">
                  <span class="dropdown__title"><strong>Задачи:</strong></span>
                  <p class="dropdown__text">{{ row.item.tasks }}</p>
                </div>
              </div>
            </template>
            <template #empty>
              <span class="d-flex justify-content-center">Нет данных</span>
            </template>
          </b-table>
        </div>
      </b-container>
      <AddTopic />
    </main>
  </div>
</template>
<script>
import Header from "@/components/Header";
import AddTopic from "@/components/AddTopic";

export default {
  components: { Header, AddTopic },
  created() {
    this.$store.dispatch("isTopicChosen");

    if (this.$store.getters.isTeacher) {
      this.$store.dispatch("fetchTopics");
    } else {
      this.$store.dispatch("fetchRemainTopics");
    }
  },
  data() {
    return {
      loading: false,
      fields: [
        {
          key: "chevron",
          label: "",
        },
        {
          key: "nameKz",
          label: "Тема(KZ)",
        },
        {
          key: "nameRu",
          label: "Тема(RU)",
        },
        {
          key: "nameEn",
          label: "Тема(EN)",
        },
        {
          key: "takenBy",
          label: "Взяли в работу",
        },
      ],
      studentFields: [
        {
          key: "chevron",
          label: "",
        },
        {
          key: "nameKz",
          label: "Тема(KZ)",
        },
        {
          key: "nameRu",
          label: "Тема(RU)",
        },
        {
          key: "nameEn",
          label: "Тема(EN)",
        },
        {
          key: "take",
          label: "Взять",
        },
      ],
    };
  },
  computed: {
    topics() {
      return this.$store.state.topics;
    },
    remainTopics() {
      return this.$store.state.remainTopics;
    },
    remainTopicsLoading() {
      return this.$store.state.fetchRemainTopicsLoading;
    },
    topicsLoading() {
      return this.$store.state.fetchTopicsLoading;
    },
    isTeacher() {
      return this.$store.getters.isTeacher;
    },
  },
  methods: {
    getFullname(row) {
      const takenBy = row.item.takenBy;
      const firstname = takenBy?.first_name;
      const lastname = takenBy?.last_name;
      const surname = takenBy?.surname;
      const result = [lastname, firstname, surname].reduce((res, item) => {
        return item ? res + " " + item : res;
      }, "");

      return result || "Нет";
    },
    takeTopicHandler(row) {
      this.$store
        .dispatch("chooseTopic", { topicId: row.item._id })
        .then(() => {
          this.$bvToast.toast("Вы выбрали тему", {
            title: "Успех!",
            variant: "success",
          });
          this.$store.commit("SET_IS_TOPIC_CHOSEN", true);
          this.$store.commit("DELETE_TOPIC", row.item);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.dropdown {
  padding: 10px;

  &__item {
    display: flex;
  }

  &__title {
    font-size: 14px;
    margin-right: 10px;
  }

  &__text {
    font-size: 14px;
  }
}
</style>
