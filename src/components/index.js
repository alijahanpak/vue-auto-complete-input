import Vue from "vue";
import vueAutoCompleteInput from "./autoCompleteInput.vue";

const Components = {
    vueAutoCompleteInput,
};

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

export default Components;
