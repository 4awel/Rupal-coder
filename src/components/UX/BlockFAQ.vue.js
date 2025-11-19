import { defineComponent, ref } from "vue";
export default defineComponent({
    name: "BlockFAQ",
    setup() {
        const activeIndex = ref(null);
        const toggleAccordion = (index) => {
            activeIndex.value = activeIndex.value === index ? null : index;
        };
        const dropdownContentFAQ = [
            {
                title: "Кто непосредственно занимается поддержкой?",
                description: [
                    {
                        text: "FAQ (Frequently Asked Questions) - это раздел с часто задаваемыми вопросами и ответами на них",
                    },
                    { text: "Помогает пользователям быстро найти решение их проблем" },
                    { text: "Сокращает нагрузку на службу поддержки" },
                ],
            },
            {
                title: "Как организована работа?",
                description: [
                    { text: "Оставьте заявку на сайте через форму обратной связи" },
                    { text: "Наш менеджер свяжется с вами в течение 15 минут" },
                    {
                        text: "Обсудите детали проекта и получите коммерческое предложение",
                    },
                ],
            },
            {
                title: "Что происходит, когда отработаны все предоплаченные часы за месяц?",
                description: [
                    { text: "Сроки зависят от сложности и объема работы" },
                    { text: "Стандартные проекты: 3-5 рабочих дней" },
                    { text: "Сложные проекты: 7-14 рабочих дней" },
                    { text: "Срочные заказы обсуждаются индивидуально" },
                ],
            },
            {
                title: "Что происходит, когда не отработаны все предоплаченные часы за месяц?",
                description: [
                    { text: "Гарантия на выполненные работы - 12 месяцев" },
                    {
                        text: "Бесплатная техническая поддержка в течение гарантийного периода",
                    },
                    { text: "Возможность доработок по требованию заказчика" },
                ],
            },
            {
                title: "Как происходит оценка и согласование планируемого времени на выполнение заявок?",
                description: [
                    { text: "Работаем по предоплате 50% от суммы заказа" },
                    { text: "Окончательный расчет после приемки работы" },
                    { text: "Принимаем банковские переводы, электронные платежи" },
                ],
            },
            {
                title: "Сколько программистов выделяется на проект?",
                description: [
                    {
                        text: "Да, мы предусматриваем 3 бесплатных правки на этапе разработки",
                    },
                    { text: "Дополнительные изменения обсуждаются отдельно" },
                    { text: "Все правки фиксируются в техническом задании" },
                ],
            },
            {
                title: "Как подать заявку на внесение изменений на сайте?",
                description: [
                    { text: "Предоставляем полную документацию к проекту" },
                    { text: "Проводим обучение работе с системой" },
                    { text: "Оказываем поддержку после запуска" },
                ],
            },
            {
                title: "Как подать заявку на добавление пользователя, изменение настроек веб-сервера и других задач по администрированию?",
                description: [
                    {
                        text: "Да, работаем как с физическими, так и с юридическими лицами",
                    },
                    { text: "Предоставляем все необходимые закрывающие документы" },
                    { text: "Возможна работа по договору с поэтапной оплатой" },
                ],
            },
            {
                title: "В течение какого времени начинается работа по заявке?",
                description: [
                    { text: "Современные фреймворки: Vue.js, React, Angular" },
                    { text: "Серверные технологии: Node.js, Python, PHP" },
                    { text: "Базы данных: PostgreSQL, MySQL, MongoDB" },
                ],
            },
            {
                title: "В какое время работает поддержка?",
                description: [
                    { text: "Да, первая консультация всегда бесплатна" },
                    { text: "Помогаем с техническим заданием и выбором технологий" },
                    { text: "Консультируем на всех этапах сотрудничества" },
                ],
            },
            {
                title: "Подходят ли услуги поддержки, если необходимо произвести обновление ядра Drupal или модулей?",
                description: [
                    { text: "Предоставляем полную документацию к проекту" },
                    { text: "Проводим обучение работе с системой" },
                    { text: "Оказываем поддержку после запуска" },
                ],
            },
            {
                title: "Можно ли пообщаться со специалистом голосом или в мессенджере?",
                description: [
                    { text: "Предоставляем полную документацию к проекту" },
                    { text: "Проводим обучение работе с системой" },
                    { text: "Оказываем поддержку после запуска" },
                ],
            },
        ];
        return {
            dropdownContentFAQ,
            activeIndex,
            toggleAccordion,
        };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['faq-item']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-item']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-header']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-header']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['accordion-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-content']} */ ;
/** @type {__VLS_StyleScopedClasses['description-item']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['description-item']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['description-item']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['description-item']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['description-item']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['description-item']} */ ;
/** @type {__VLS_StyleScopedClasses['container-faq']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-header']} */ ;
/** @type {__VLS_StyleScopedClasses['index-title']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-description']} */ ;
/** @type {__VLS_StyleScopedClasses['description-text']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-header']} */ ;
/** @type {__VLS_StyleScopedClasses['index-title']} */ ;
/** @type {__VLS_StyleScopedClasses['description-item']} */ ;
/** @type {__VLS_StyleScopedClasses['bullet']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-item']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container-faq" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "faq-group" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.dropdownContentFAQ))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "faq-item" },
        ...{ class: ({ active: __VLS_ctx.activeIndex === index }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.toggleAccordion(index);
            } },
        ...{ class: "faq-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "index-title" },
    });
    (index + 1);
    (item.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "accordion-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
        width: "16",
        height: "16",
        viewBox: "0 0 16 16",
        fill: "none",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
        d: "M4 6L8 10L12 6",
        stroke: "currentColor",
        'stroke-width': "2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "faq-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "faq-description" },
    });
    for (const [el, descIndex] of __VLS_getVForSourceType((item.description))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (descIndex),
            ...{ class: "description-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "bullet" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "description-text" },
        });
        (el.text);
    }
}
/** @type {__VLS_StyleScopedClasses['container-faq']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-group']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-header']} */ ;
/** @type {__VLS_StyleScopedClasses['index-title']} */ ;
/** @type {__VLS_StyleScopedClasses['accordion-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-content']} */ ;
/** @type {__VLS_StyleScopedClasses['faq-description']} */ ;
/** @type {__VLS_StyleScopedClasses['description-item']} */ ;
/** @type {__VLS_StyleScopedClasses['bullet']} */ ;
/** @type {__VLS_StyleScopedClasses['description-text']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=BlockFAQ.vue.js.map