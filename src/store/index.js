import Vue from "vue";
import Vuex from "vuex";
import jwt_decode from "jwt-decode";
import {
  getRemainTopics,
  getTopics,
  isTopicChosen,
  takeTopic,
} from "@/api/Topic";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    topics: [],
    fetchTopicsLoading: false,
    remainTopics: [],
    fetchRemainTopicsLoading: false,
    isTopicChosen: false,
    chooseTopicLoading: false,
  },
  getters: {
    isTeacher(state) {
      return state.userInfo?.role === "teacher";
    },
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    ADD_TOPIC(state, topic) {
      state.topics.push(topic);
    },
    DELETE_TOPIC(state, deleteTopic) {
      const findIndex = state.remainTopics.findIndex(
        (topic) => topic._id === deleteTopic._id
      );
      state.remainTopics.splice(findIndex, 1);
    },
    SET_TOPICS(state, topics) {
      state.topics = topics;
    },
    SET_FETCH_TOPICS_LOADING(state, loading) {
      state.fetchTopicsLoading = loading;
    },
    SET_REMAIN_TOPICS(state, remainTopics) {
      state.remainTopics = remainTopics;
    },
    SET_REMAIN_TOPICS_LOADING(state, loading) {
      state.fetchRemainTopicsLoading = loading;
    },
    SET_IS_TOPIC_CHOSEN(state, topicChosen) {
      state.isTopicChosen = topicChosen;
    },
    SET_CHOOSE_TOPIC_LOADING(state, chooseTopicLoading) {
      state.chooseTopicLoading = chooseTopicLoading;
    },
  },
  actions: {
    setUserInfo({ commit }) {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedUserInfo = jwt_decode(token);
        commit("SET_USER_INFO", decodedUserInfo.payload);
      } else {
        commit("SET_USER_INFO", null);
      }
    },
    async fetchTopics({ commit }) {
      try {
        commit("SET_FETCH_TOPICS_LOADING", true);
        const { data } = await getTopics();
        commit("SET_TOPICS", data.topics);
      } catch (error) {
        console.error(error);
        commit("SET_TOPICS", []);
      } finally {
        commit("SET_FETCH_TOPICS_LOADING", false);
      }
    },

    async fetchRemainTopics({ commit }) {
      try {
        commit("SET_REMAIN_TOPICS_LOADING", true);
        const { data } = await getRemainTopics();
        commit("SET_REMAIN_TOPICS", data.topics);
      } catch (error) {
        console.error(error);
        commit("SET_REMAIN_TOPICS", []);
      } finally {
        commit("SET_REMAIN_TOPICS_LOADING", false);
      }
    },

    async isTopicChosen({ commit }) {
      try {
        const { data } = await isTopicChosen();
        commit("SET_IS_TOPIC_CHOSEN", data.isTopicChosen);
      } catch (error) {
        console.error(error);
        commit("SET_IS_TOPIC_CHOSEN", false);
      } finally {
        commit("SET_REMAIN_TOPICS_LOADING", false);
      }
    },

    async chooseTopic({ commit }, postId) {
      try {
        commit("SET_CHOOSE_TOPIC_LOADING", true);
        await takeTopic(postId);
      } catch (error) {
        console.error(error);
      } finally {
        commit("SET_CHOOSE_TOPIC_LOADING", false);
      }
    },
  },
  modules: {},
});
