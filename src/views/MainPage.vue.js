import { defineComponent, ref, onMounted, onUnmounted } from "vue";
export default defineComponent({
    name: "MainPage",
    setup() {
        const isScrollButtonVisible = ref(false);
        const checkScrollPosition = () => {
            // Показываем кнопку когда прокрутка больше 300px
            isScrollButtonVisible.value = window.scrollY > 300;
        };
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
        const handleScroll = () => {
            checkScrollPosition();
        };
        onMounted(() => {
            window.addEventListener('scroll', handleScroll);
            checkScrollPosition(); // Проверяем при загрузке
        });
        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });
        return {
            isScrollButtonVisible,
            scrollToTop
        };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['scroll-to-top-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-to-top-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-to-top-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-to-top-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-to-top-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-to-top-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-to-top-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['dividing-overlay-block']} */ ;
/** @type {__VLS_StyleScopedClasses['header-about-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['about-info-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['dividing-overlay-block']} */ ;
/** @type {__VLS_StyleScopedClasses['header-about-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['about-info-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['dividing-overlay-block']} */ ;
/** @type {__VLS_StyleScopedClasses['header-about-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['about-info-wrapper']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "main-container" },
});
const __VLS_0 = {}.BlockSupportInfo;
/** @type {[typeof __VLS_components.BlockSupportInfo, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dividing-overlay-block" },
});
const __VLS_4 = {}.BlockServisec;
/** @type {[typeof __VLS_components.BlockServisec, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({}));
const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-about-wrapper" },
});
const __VLS_8 = {}.BlockHeaderAboutInfo;
/** @type {[typeof __VLS_components.BlockHeaderAboutInfo, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "about-info-wrapper" },
});
const __VLS_12 = {}.BlockAboutInfo;
/** @type {[typeof __VLS_components.BlockAboutInfo, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const __VLS_16 = {}.BlockTarif;
/** @type {[typeof __VLS_components.BlockTarif, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const __VLS_20 = {}.BlockPersone;
/** @type {[typeof __VLS_components.BlockPersone, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.BlockLastCase;
/** @type {[typeof __VLS_components.BlockLastCase, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const __VLS_28 = {}.BlockCommentCorusel;
/** @type {[typeof __VLS_components.BlockCommentCorusel, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({}));
const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const __VLS_32 = {}.BlockCorporate;
/** @type {[typeof __VLS_components.BlockCorporate, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const __VLS_36 = {}.BlockFAQ;
/** @type {[typeof __VLS_components.BlockFAQ, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const __VLS_40 = {}.BlockForm;
/** @type {[typeof __VLS_components.BlockForm, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.scrollToTop) },
    ...{ class: "scroll-to-top-btn" },
    ...{ class: ({ 'visible': __VLS_ctx.isScrollButtonVisible }) },
    'aria-label': "Вернуться наверх",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M12 20V4M12 4L5 11M12 4L19 11",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
/** @type {__VLS_StyleScopedClasses['main-container']} */ ;
/** @type {__VLS_StyleScopedClasses['dividing-overlay-block']} */ ;
/** @type {__VLS_StyleScopedClasses['header-about-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['about-info-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-to-top-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['visible']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=MainPage.vue.js.map