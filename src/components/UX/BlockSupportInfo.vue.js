import { defineComponent } from "vue";
import cupImg from "@/assets/img/cup.png";
export default defineComponent({
    name: "BlockSupportInfo",
    setup() {
        const groupItem = [
            {
                title: "#1",
                size: 42,
                img: "cup.png",
                description: "Drupal-разработчик в России по версии рейтинга Рунета",
            },
            {
                title: "3+",
                size: 26,
                description: "лет на рынке веб-разработки",
            },
            {
                title: "14",
                size: 26,
                description: "сертифицированных специалистов",
            },
            {
                title: "99%",
                size: 26,
                description: "клиентов рекомендуют нас",
            },
            {
                title: "500+",
                size: 26,
                description: "успешных проектов",
            },
            {
                title: "24/7",
                size: 26,
                description: "техническая поддержка",
            },
        ];
        const getImageUrl = (imageName) => {
            const imageMap = {
                "cup.png": cupImg,
            };
            return imageMap[imageName] || "";
        };
        return {
            groupItem,
            getImageUrl,
        };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['support-container']} */ ;
/** @type {__VLS_StyleScopedClasses['block-header']} */ ;
/** @type {__VLS_StyleScopedClasses['block-header']} */ ;
/** @type {__VLS_StyleScopedClasses['group-info']} */ ;
/** @type {__VLS_StyleScopedClasses['group-info']} */ ;
/** @type {__VLS_StyleScopedClasses['content-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['support-container']} */ ;
/** @type {__VLS_StyleScopedClasses['block-header']} */ ;
/** @type {__VLS_StyleScopedClasses['block-header']} */ ;
/** @type {__VLS_StyleScopedClasses['block-header']} */ ;
/** @type {__VLS_StyleScopedClasses['block-group']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['line']} */ ;
/** @type {__VLS_StyleScopedClasses['video-background']} */ ;
/** @type {__VLS_StyleScopedClasses['support-container']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "support-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.video, __VLS_intrinsicElements.video)({
    ...{ class: "video-background" },
    autoplay: true,
    muted: true,
    loop: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.source)({
    src: "../../assets/img/video.mp4",
    type: "video/mp4",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "svg-overlay" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "../../assets/svg/image-element-0.svg",
    alt: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "content-overlay" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
const __VLS_0 = {}.ButtonTypeOpasyti;
/** @type {[typeof __VLS_components.ButtonTypeOpasyti, typeof __VLS_components.ButtonTypeOpasyti, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block-group" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.groupItem))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "line" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "group-info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ style: ({ 'font-size': item.size + 'px' }) },
    });
    (item.title);
    if (item.img) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            ...{ style: ({ 'height': item.size + 'px', 'width': 'auto' }) },
            src: (__VLS_ctx.getImageUrl(item.img)),
            alt: "cup",
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (item.description);
}
/** @type {__VLS_StyleScopedClasses['support-container']} */ ;
/** @type {__VLS_StyleScopedClasses['video-background']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['content-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['block-header']} */ ;
/** @type {__VLS_StyleScopedClasses['block-group']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['line']} */ ;
/** @type {__VLS_StyleScopedClasses['group-info']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=BlockSupportInfo.vue.js.map