import { defineComponent, onMounted, onUnmounted } from "vue";
import partner1 from "@/assets/img/partners-0.png";
import partner2 from "@/assets/img/partners-1.png";
import partner3 from "@/assets/img/partners-2.png";
import partner4 from "@/assets/img/partners-3.png";
export default defineComponent({
    name: "BlockCorporate",
    setup() {
        const partnerGroupRight = [
            { image: partner1, link: "https://kubsu.ru" },
            { image: partner2, link: "https://kubsu.ru" },
            { image: partner3, link: "https://kubsu.ru" },
            { image: partner4, link: "https://kubsu.ru" },
            { image: partner1, link: "https://kubsu.ru" },
            { image: partner2, link: "https://kubsu.ru" },
        ];
        const partnerGroupLeft = [
            { image: partner3, link: "https://kubsu.ru" },
            { image: partner4, link: "https://kubsu.ru" },
            { image: partner1, link: "https://kubsu.ru" },
            { image: partner2, link: "https://kubsu.ru" },
            { image: partner3, link: "https://kubsu.ru" },
            { image: partner4, link: "https://kubsu.ru" },
        ];
        // Обработчик скролла для изменения направления
        let scrollDirection = 1; // 1 - вниз, -1 - вверх
        let lastScrollTop = 0;
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Скролл вниз
                scrollDirection = 1;
            }
            else {
                // Скролл вверх
                scrollDirection = -1;
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        };
        onMounted(() => {
            window.addEventListener("scroll", handleScroll);
        });
        onUnmounted(() => {
            window.removeEventListener("scroll", handleScroll);
        });
        return {
            partnerGroupRight,
            partnerGroupLeft,
        };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['partners-header']} */ ;
/** @type {__VLS_StyleScopedClasses['partners-header']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-content']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-content']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-container']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-container']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-container']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-container']} */ ;
/** @type {__VLS_StyleScopedClasses['container-partners']} */ ;
/** @type {__VLS_StyleScopedClasses['partners-header']} */ ;
/** @type {__VLS_StyleScopedClasses['partners-header']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-content']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-container']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-container']} */ ;
/** @type {__VLS_StyleScopedClasses['partners-header']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-content']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-container']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-content']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container-partners" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "partners-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "group-scroll-partners" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scroll-container scroll-right" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scroll-content" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.partnerGroupRight))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (`right-${index}`),
        ...{ class: "element" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: (item.link),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (item.image),
        alt: "partner",
    });
}
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.partnerGroupRight))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (`right-duplicate-${index}`),
        ...{ class: "element" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: (item.link),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (item.image),
        alt: "partner",
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scroll-container scroll-left" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scroll-content" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.partnerGroupLeft))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (`left-${index}`),
        ...{ class: "element" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: (item.link),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (item.image),
        alt: "partner",
    });
}
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.partnerGroupLeft))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (`left-duplicate-${index}`),
        ...{ class: "element" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: (item.link),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (item.image),
        alt: "partner",
    });
}
/** @type {__VLS_StyleScopedClasses['container-partners']} */ ;
/** @type {__VLS_StyleScopedClasses['partners-header']} */ ;
/** @type {__VLS_StyleScopedClasses['group-scroll-partners']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-container']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-right']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-content']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-container']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-left']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-content']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=BlockCorporate.vue.js.map