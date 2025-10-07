import { defineComponent } from "vue";
import support1 from '@/assets/svg/support1.svg';
import support2 from '@/assets/svg/support2.svg';
import support3 from '@/assets/svg/support3.svg';
import support4 from '@/assets/svg/support4.svg';
import support5 from '@/assets/svg/support5.svg';
import support6 from '@/assets/svg/support6.svg';
import support7 from '@/assets/svg/support7.svg';
import support8 from '@/assets/svg/support8.svg';
export default defineComponent({
    name: 'BlockHeaderAboutInfo',
    setup() {
        const groupItemSupport = [
            {
                title: "Постановка задачи по Email",
                description: "Удобная и привычная модель постановки задач, при которой задачи фиксируются и никогда не теряются.",
                image: support1,
            },
            {
                title: "Система Helpdesk – отчетность, прозрачность",
                description: "Возможность посмотреть все заявки в работе и отработанные часы в личном кабинете через браузер.",
                image: support2,
            },
            {
                title: "Расширенная техническая поддержка",
                description: "Возможность организации расширенной техподдержки с 6:00 до 22:00 без выходных.",
                image: support3,
            },
            {
                title: "Персональный менеджер проекта",
                description: "Ваш менеджер проекта всегда в курсе текущего состояния проекта и в любой момент готов ответить на любые вопросы.",
                image: support4,
            },
            {
                title: "Удобные способы оплаты",
                description: "Безналичный расчет по договору или электронные деньги: WebMoney, Яндекс.Деньги, Paypal.",
                image: support5,
            },
            {
                title: "Работаем с SLA и NDA",
                description: "Работа в рамках соглашений о конфиденциальности и об уровне качества работ.",
                image: support6,
            },
            {
                title: "Штатные специалисты",
                description: "Надежные штатные специалисты, никаких фрилансеров.",
                image: support7,
            },
            {
                title: "Удобные каналы связи",
                description: "Консультации по телефону, скайпу, в месенджерах.",
                image: support8,
            },
        ];
        return {
            groupItemSupport
        };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['container-support']} */ ;
/** @type {__VLS_StyleScopedClasses['container-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['numbering']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-image']} */ ;
/** @type {__VLS_StyleScopedClasses['group-item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['container-support']} */ ;
/** @type {__VLS_StyleScopedClasses['container-support']} */ ;
/** @type {__VLS_StyleScopedClasses['container-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['text-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-title']} */ ;
/** @type {__VLS_StyleScopedClasses['item-info']} */ ;
/** @type {__VLS_StyleScopedClasses['item-image']} */ ;
/** @type {__VLS_StyleScopedClasses['numbering']} */ ;
/** @type {__VLS_StyleScopedClasses['container-support']} */ ;
/** @type {__VLS_StyleScopedClasses['container-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-title']} */ ;
/** @type {__VLS_StyleScopedClasses['item-info']} */ ;
/** @type {__VLS_StyleScopedClasses['numbering']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container-support" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "group-item-support" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.groupItemSupport))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "item-support" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "numbering" },
    });
    ('0' + (index + 1));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-support" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "item-title" },
    });
    (item.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "item-info" },
    });
    (item.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        ...{ class: "item-image" },
        src: (item.image),
        alt: ('support-svg-' + index),
    });
}
/** @type {__VLS_StyleScopedClasses['container-support']} */ ;
/** @type {__VLS_StyleScopedClasses['group-item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-support']} */ ;
/** @type {__VLS_StyleScopedClasses['numbering']} */ ;
/** @type {__VLS_StyleScopedClasses['text-support']} */ ;
/** @type {__VLS_StyleScopedClasses['item-title']} */ ;
/** @type {__VLS_StyleScopedClasses['item-info']} */ ;
/** @type {__VLS_StyleScopedClasses['item-image']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=BlockHeaderAboutInfo.vue.js.map