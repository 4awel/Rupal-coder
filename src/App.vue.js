import { defineComponent, onMounted } from "vue";
import HeaderApp from "./components/HeaderApp.vue";
import FooterApp from "./components/FooterApp.vue";
import { RouterLink, RouterView } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
    components: {
        HeaderApp,
        RouterView,
        RouterLink,
        FooterApp,
    },
    setup() {
        const store = useStore();
        const loadForms = async () => {
            try {
                console.log("Начинаем загрузку форм...");
                await store.dispatch("getFormsData");
                console.log("Формы успешно загружены:", store.getters.forms);
            }
            catch (error) {
                console.error("Ошибка загрузки форм:", error);
            }
        };
        onMounted(() => {
            loadForms();
        });
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
const __VLS_componentsOption = {
    HeaderApp,
    RouterView,
    RouterLink,
    FooterApp,
};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "app",
});
const __VLS_0 = {}.HeaderApp;
/** @type {[typeof __VLS_components.HeaderApp, typeof __VLS_components.headerApp, typeof __VLS_components.HeaderApp, typeof __VLS_components.headerApp, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_4 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({}));
const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalElement(__VLS_intrinsicElements.hr)({});
const __VLS_8 = {}.FooterApp;
/** @type {[typeof __VLS_components.FooterApp, typeof __VLS_components.footerApp, typeof __VLS_components.FooterApp, typeof __VLS_components.footerApp, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=App.vue.js.map