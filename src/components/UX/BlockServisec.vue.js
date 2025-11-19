import { defineComponent } from "vue";
import competency1 from "@/assets/svg/competency-1.svg";
import competency2 from "@/assets/svg/competency-2.svg";
import competency3 from "@/assets/svg/competency-3.svg";
import competency4 from "@/assets/svg/competency-4.svg";
import competency5 from "@/assets/svg/competency-5.svg";
import competency6 from "@/assets/svg/competency-6.svg";
import competency7 from "@/assets/svg/competency-7.svg";
import competency8 from "@/assets/svg/competency-8.svg";
export default defineComponent({
    name: "BlockServisec",
    setup() {
        const GroupServices = [
            {
                img: competency1,
                description: "Добавление информации на сайт, создание новых разделов",
                alt: "add-information",
            },
            {
                img: competency2,
                description: "Разработка и оптимизация модулей сайта",
                alt: "develop",
            },
            {
                img: competency3,
                description: "Интеграция с CRM, 1C, платежными системами, любыми веб-сервисами",
                alt: "CRM",
            },
            {
                img: competency4,
                description: "Любые доработки функционала и дизайна",
                alt: "function",
            },
            {
                img: competency5,
                description: "Аудит и мониторинг безопасности Drupal сайтов",
                alt: "audit",
            },
            {
                img: competency6,
                description: "Миграция, импорт контента и апгрейд Drupal",
                alt: "migration",
            },
            {
                img: competency7,
                description: "Оптимизация и ускорение Drupal-сайтов",
                alt: "Optimization",
            },
            {
                img: competency8,
                description: "Веб-маркетинг, консультации и работы по SEO",
                alt: "web-marketing",
            },
        ];
        return {
            GroupServices,
        };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['services-header']} */ ;
/** @type {__VLS_StyleScopedClasses['services-header']} */ ;
/** @type {__VLS_StyleScopedClasses['services-group']} */ ;
/** @type {__VLS_StyleScopedClasses['services-header']} */ ;
/** @type {__VLS_StyleScopedClasses['services-header']} */ ;
/** @type {__VLS_StyleScopedClasses['services-group']} */ ;
/** @type {__VLS_StyleScopedClasses['services-header']} */ ;
/** @type {__VLS_StyleScopedClasses['services-header']} */ ;
/** @type {__VLS_StyleScopedClasses['services-header']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-container']} */ ;
/** @type {__VLS_StyleScopedClasses['item-image']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container-services" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "services-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "services-group" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.GroupServices))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "services-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "svg-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: "../../assets/svg/overlay-drupal.svg",
        alt: "overlay",
        ...{ class: "svg-overlay" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        ...{ class: "item-image" },
        src: (item.img),
        alt: (item.alt),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "item-info" },
    });
    (item.description);
}
/** @type {__VLS_StyleScopedClasses['container-services']} */ ;
/** @type {__VLS_StyleScopedClasses['services-header']} */ ;
/** @type {__VLS_StyleScopedClasses['services-group']} */ ;
/** @type {__VLS_StyleScopedClasses['services-item']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-container']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['item-image']} */ ;
/** @type {__VLS_StyleScopedClasses['item-info']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=BlockServisec.vue.js.map