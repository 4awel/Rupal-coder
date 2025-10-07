import { defineComponent } from "vue";
import facebook from '@/assets/svg/facebook.svg';
import telegram from '@/assets/svg/tg.svg';
import youtube from '@/assets/svg/yt.svg';
import vk from '@/assets/svg/vk.svg';
export default defineComponent({
    name: "FooterApp",
    setup() {
        const svgLinksGroup = [
            {
                image: facebook,
                link: "https://facebook.com",
                alt: "facebook",
            },
            {
                image: telegram,
                link: "https://telegram.org",
                alt: "telegram",
            },
            {
                image: youtube,
                link: "https://youtube.com",
                alt: "youtube",
            },
            {
                image: vk,
                link: "https://vk.com",
                alt: "vkontakte",
            },
        ];
        return { svgLinksGroup };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['social-link']} */ ;
/** @type {__VLS_StyleScopedClasses['social-link']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay-drupal']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-content']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay-drupal']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay-drupal']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-content']} */ ;
/** @type {__VLS_StyleScopedClasses['container-wem-mesg']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay-drupal']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay-drupal']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-content']} */ ;
/** @type {__VLS_StyleScopedClasses['container-wem-mesg']} */ ;
/** @type {__VLS_StyleScopedClasses['social-link']} */ ;
/** @type {__VLS_StyleScopedClasses['social-link']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay-drupal']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay-drupal']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay-drupal']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay-drupal']} */ ;
/** @type {__VLS_StyleScopedClasses['social-link']} */ ;
/** @type {__VLS_StyleScopedClasses['social-link']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "footer-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container-wem-mesg" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.svgLinksGroup))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        key: (index),
        href: (item.link),
        ...{ class: "social-link" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (item.image),
        alt: (item.alt),
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "footer-text" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "overlay-drupal" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "../assets/svg/D-fly.svg",
    alt: "Drupal overlay",
});
/** @type {__VLS_StyleScopedClasses['footer-content']} */ ;
/** @type {__VLS_StyleScopedClasses['container-wem-mesg']} */ ;
/** @type {__VLS_StyleScopedClasses['social-link']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-text']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay-drupal']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=FooterApp.vue.js.map