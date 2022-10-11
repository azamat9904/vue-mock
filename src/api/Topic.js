import axios from "./index";

const ADD_TOPIC = "/topic/add";
const GET_TOPICS = "/topic";
const GET_REMAIN_TOPICS = "topic/remains";
const TOPIC_CHOSEN = "topic/taken";
const TAKE_TOPIC = "topic/choose";

export const addTopic = (payload) => axios.post(ADD_TOPIC, payload);
export const getTopics = (payload) => axios.post(GET_TOPICS, payload);
export const getRemainTopics = (payload) =>
  axios.post(GET_REMAIN_TOPICS, payload);

export const isTopicChosen = (payload) => axios.post(TOPIC_CHOSEN, payload);
export const takeTopic = (payload) => axios.post(TAKE_TOPIC, payload);
