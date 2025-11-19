import { defineComponent } from "vue";
export default defineComponent({
    name: "BlockAboutInfo",
    setup() {
        const groupItemLaptop = [
            {
                description: "Только системный подход – контроль версий, резервирование и тестирование!",
            },
            {
                description: "Только Drupal сайты, не берем на поддержку сайты на других CMS!",
            },
            {
                description: "Участвуем в разработке ядра Drupal и модулей на Drupal.org, разрабатываем",
                link: "/modules",
                prefix: "свои модули Drupal",
            },
            {
                description: "Поддерживаем сайты на Drupal 5, 6, 7 и 8",
            },
        ];
        return {
            groupItemLaptop,
        };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['svg-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['content-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['content-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['container-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['group-item']} */ ;
/** @type {__VLS_StyleScopedClasses['content-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['content-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['container-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['content-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['content-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['container-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['content-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['group-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['vertical-line']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container-laptop" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "svg-overlay" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "../../assets/svg/image-element-0.svg",
    alt: "svg-overlay",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "svg-laptop" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "../../assets/img/laptop.png",
    alt: "laptop",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "content-laptop" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "group-item" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.groupItemLaptop))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "vertical-line" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (item.description);
    if (item.link) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
            ...{ style: {} },
            href: (item.link),
        });
        (item.prefix);
    }
}
/** @type {__VLS_StyleScopedClasses['container-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['content-laptop']} */ ;
/** @type {__VLS_StyleScopedClasses['group-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['vertical-line']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=BlockAboutInfo.vue.js.map