import { defineComponent } from "vue";
import competency20 from "@/assets/svg/competency-20.svg";
import competency21 from "@/assets/svg/competency-21.svg";
import competency22 from "@/assets/svg/competency-22.svg";
import persone1 from "@/assets/img/IMG_2472_0.jpg";
import persone2 from "@/assets/img/IMG_2474_1.jpg";
import persone3 from "@/assets/img/IMG_2522_0.jpg";
import persone4 from "@/assets/img/IMG_2539_0.jpg";
import persone5 from "@/assets/img/IMG_9971_16.jpg";
export default defineComponent({
    name: "BlockPersone",
    setup() {
        const personeInfoGroup = [
            {
                title: "Аналитик",
                description: "Собирает требования к сайту, составляет ТЗ для разработки, оптимизирует работы по разработке",
                image: competency20,
            },
            {
                title: "Дизайнер",
                description: "Проектирует структуру сайта, разрабатывает интерфейсы и готовит макеты для разработки",
                image: competency21,
            },
            {
                title: "Разработчик",
                description: "Верстает, программирует и тестирует сайт, интегрирует с системами и CMS",
                image: competency22,
            },
        ];
        const personeTeamGroup = [
            {
                name: "Алексей Воробьев",
                description: "Руководитель отдела веб-разработки",
                image: persone1,
            },
            {
                name: "Мария Иванова",
                description: "Старший разработчик Drupal",
                image: persone2,
            },
            {
                name: "Дмитрий Петров",
                description: "Frontend разработчик",
                image: persone3,
            },
            {
                name: "Елена Сидорова",
                description: "UX/UI дизайнер",
                image: persone4,
            },
            {
                name: "Сергей Козлов",
                description: "Системный администратор",
                image: persone5,
            },
        ];
        return {
            personeInfoGroup,
            personeTeamGroup
        };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['container-our-persone']} */ ;
/** @type {__VLS_StyleScopedClasses['persone-info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['svg']} */ ;
/** @type {__VLS_StyleScopedClasses['info']} */ ;
/** @type {__VLS_StyleScopedClasses['container-team']} */ ;
/** @type {__VLS_StyleScopedClasses['team-card']} */ ;
/** @type {__VLS_StyleScopedClasses['team-card']} */ ;
/** @type {__VLS_StyleScopedClasses['photo']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-team']} */ ;
/** @type {__VLS_StyleScopedClasses['container-persone']} */ ;
/** @type {__VLS_StyleScopedClasses['container-our-persone']} */ ;
/** @type {__VLS_StyleScopedClasses['container-team']} */ ;
/** @type {__VLS_StyleScopedClasses['persone-info-group']} */ ;
/** @type {__VLS_StyleScopedClasses['persone-info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['team']} */ ;
/** @type {__VLS_StyleScopedClasses['photo']} */ ;
/** @type {__VLS_StyleScopedClasses['container-persone']} */ ;
/** @type {__VLS_StyleScopedClasses['container-our-persone']} */ ;
/** @type {__VLS_StyleScopedClasses['container-team']} */ ;
/** @type {__VLS_StyleScopedClasses['persone-info-group']} */ ;
/** @type {__VLS_StyleScopedClasses['team']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-team']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container-persone" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container-our-persone" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "persone-info-group" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.personeInfoGroup))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "persone-info-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "svg" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "svg-overlay" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: "../../assets/svg/overlay-drupal.svg",
        alt: "overlay-drupal",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (item.image),
        alt: "svg",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (item.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (item.description);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container-team" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "team" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.personeTeamGroup))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "team-card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "photo" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (item.image),
        alt: "photo",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "description" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
    (item.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (item.description);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "btn-team" },
});
/** @type {__VLS_StyleScopedClasses['container-persone']} */ ;
/** @type {__VLS_StyleScopedClasses['container-our-persone']} */ ;
/** @type {__VLS_StyleScopedClasses['persone-info-group']} */ ;
/** @type {__VLS_StyleScopedClasses['persone-info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['svg']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['info']} */ ;
/** @type {__VLS_StyleScopedClasses['container-team']} */ ;
/** @type {__VLS_StyleScopedClasses['team']} */ ;
/** @type {__VLS_StyleScopedClasses['team-card']} */ ;
/** @type {__VLS_StyleScopedClasses['photo']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-team']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=BlockPersone.vue.js.map