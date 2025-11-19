import { defineComponent } from "vue";
export default defineComponent({
    name: "BlockTarif",
    setup() {
        const tarifComponents = [
            {
                title: "Стартовый",
                content: [
                    { text: "До 5 проектов" },
                    { text: "Базовая техническая поддержка" },
                    { text: "Обновления 1 раз в месяц" },
                    { text: "Email поддержка" },
                ],
                isMain: false,
            },
            {
                title: "Бизнес",
                content: [
                    { text: "До 20 проектов" },
                    { text: "Приоритетная техническая поддержка" },
                    { text: "Еженедельные обновления" },
                    { text: "Поддержка 24/7" },
                    { text: "До 100 GB хранилища" },
                ],
                isMain: true,
            },
            {
                title: "VIP",
                content: [
                    { text: "Неограниченное количество проектов" },
                    { text: "Персональный менеджер" },
                    { text: "Ежедневные обновления" },
                    { text: "Поддержка высшего приоритета" },
                    { text: "Неограниченное хранилище" },
                ],
                isMain: false,
            },
        ];
        return {
            tarifComponents
        };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['svg-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-item']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-item--main']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-item']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-link']} */ ;
/** @type {__VLS_StyleScopedClasses['container-tarif']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['tarifs']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-item']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-item--main']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-item']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-item--main']} */ ;
/** @type {__VLS_StyleScopedClasses['price']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-info']} */ ;
/** @type {__VLS_StyleScopedClasses['info-text']} */ ;
/** @type {__VLS_StyleScopedClasses['info-link']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-item']} */ ;
/** @type {__VLS_StyleScopedClasses['price']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-text']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container-tarif" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "svg-overlay" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "../../assets/img/image.png",
    alt: "overlay-drupal",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tarifs" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.tarifComponents))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: ({
                'tarif-item': true,
                'tarif-item--main': item.isMain,
                'tarif-item--secondary': !item.isMain
            }) },
    });
    if (item.isMain) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "tarif-badge" },
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (item.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.hr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tarif-features" },
    });
    for (const [comp, featureIndex] of __VLS_getVForSourceType((item.content))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (featureIndex),
            ...{ class: "feature-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "feature-icon" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "feature-text" },
        });
        (comp.text);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tarif-button" },
    });
    if (item.isMain) {
        const __VLS_0 = {}.ButtonTypeBould;
        /** @type {[typeof __VLS_components.ButtonTypeBould, typeof __VLS_components.ButtonTypeBould, ]} */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            ...{ style: {} },
        }));
        const __VLS_2 = __VLS_1({
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        __VLS_3.slots.default;
        var __VLS_3;
    }
    else {
        const __VLS_4 = {}.ButtonTypeOpasyti;
        /** @type {[typeof __VLS_components.ButtonTypeOpasyti, typeof __VLS_components.ButtonTypeOpasyti, ]} */ ;
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
            ...{ style: {} },
        }));
        const __VLS_6 = __VLS_5({
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_5));
        __VLS_7.slots.default;
        var __VLS_7;
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tarif-info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-text" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
    ...{ class: "info-link" },
});
/** @type {__VLS_StyleScopedClasses['container-tarif']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['tarifs']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-item']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-item--main']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-item--secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-features']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-item']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-text']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-button']} */ ;
/** @type {__VLS_StyleScopedClasses['tarif-info']} */ ;
/** @type {__VLS_StyleScopedClasses['info-text']} */ ;
/** @type {__VLS_StyleScopedClasses['info-link']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=BlockTarif.vue.js.map