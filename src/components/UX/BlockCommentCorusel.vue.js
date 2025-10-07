import { defineComponent, ref, computed } from "vue";
import logo1 from "@/assets/img/logo_0.png";
import logo2 from "@/assets/img/logo_1.png";
import logo3 from "@/assets/img/logo_2.png";
import logo4 from "@/assets/img/logo_3.jpg";
import logo5 from "@/assets/img/logo_4.png";
import logo6 from "@/assets/img/logo_5.png";
import logo7 from "@/assets/img/logo_6.jpg";
import logo8 from "@/assets/img/logo_7.png";
export default defineComponent({
    name: "BlockCommentCorusel",
    setup() {
        const elementComment = [
            {
                logo: logo1,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis.",
                phrase: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, repellat?",
                link: "https://ciel.parfum.ru",
            },
            {
                logo: logo2,
                description: "Второй отзыв: Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis.",
                phrase: "Второй urtconsequuntur  Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. ",
                link: "https://ciel.parfum.ru",
            },
            {
                logo: logo3,
                description: "Третий отзыв: Lorem ipsumLorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis.  dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae!",
                phrase: "Отличное качество продукции",
                link: "https://ciel.parfum.ru",
            },
            {
                logo: logo4,
                description: "Четвертый отзыв: Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. ipsum dolor sit amet consectetur adipisicing elit.",
                phrase: "Быстрая доставка и вежливый персонал",
                link: "https://ciel.parfum.ru",
            },
            {
                logo: logo5,
                description: "Пятый отзыв: Minus, adipisciLorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis.  vitae! Molestias harum repudiandae illum molestiae.",
                phrase: "Рекомендую всем друзьям",
                link: "https://ciel.parfum.ru",
            },
            {
                logo: logo6,
                description: "Шестой отзыв: Dignissimos Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. facere error recusandae molestiae saepe reprehenderit.",
                phrase: "Лучшее соотношение цены и качества",
                link: "https://ciel.parfum.ru",
            },
            {
                logo: logo7,
                description: "Седьмой отзыв: ImpeditLorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis.  temporibus, voluptates eos accusantium architecto delectus.",
                phrase: "Профессиональный подход к работе",
                link: "https://ciel.parfum.ru",
            },
            {
                logo: logo8,
                description: "Восьмой отзыв: Totam, Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. asperiores qui. Qui eaque, aut officia cupiditate repudiandae.",
                phrase: "Будем сотрудничать снова",
                link: "https://ciel.parfum.ru",
            },
        ];
        const currentSlide = ref(0);
        const totalSlides = elementComment.length;
        const currentComment = computed(() => elementComment[currentSlide.value]);
        const formattedCurrentSlide = computed(() => {
            return (currentSlide.value + 1).toString().padStart(2, "0");
        });
        const nextSlide = () => {
            currentSlide.value = (currentSlide.value + 1) % totalSlides;
        };
        const prevSlide = () => {
            currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides;
        };
        // Автопереключение слайдов каждые 5 секунд
        setInterval(nextSlide, 5000);
        return {
            elementComment,
            currentComment,
            formattedCurrentSlide,
            totalSlides,
            nextSlide,
            prevSlide,
        };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
/** @type {__VLS_StyleScopedClasses['link-site-company']} */ ;
/** @type {__VLS_StyleScopedClasses['element-content']} */ ;
/** @type {__VLS_StyleScopedClasses['container-comment']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-toggler']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container-comment" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "overlay" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "../../assets/svg/sign.svg",
    alt: "overlay",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "../../assets/svg/sign.svg",
    alt: "overlay",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "elements-comments" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "element" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "element-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    ...{ class: "logo" },
    src: (__VLS_ctx.currentComment.logo),
    alt: (__VLS_ctx.currentComment.phrase),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "description" },
});
(__VLS_ctx.currentComment.description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "phrase-company" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "phrase" },
});
(__VLS_ctx.currentComment.phrase);
if (__VLS_ctx.currentComment.link) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        ...{ class: "link-site-company" },
        href: (__VLS_ctx.currentComment.link),
        target: "_blank",
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.hr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "menu-toggler" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ onClick: (__VLS_ctx.prevSlide) },
    id: "back",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "current-slide" },
});
(__VLS_ctx.formattedCurrentSlide);
(__VLS_ctx.totalSlides);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ onClick: (__VLS_ctx.nextSlide) },
    id: "next",
});
/** @type {__VLS_StyleScopedClasses['container-comment']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['elements-comments']} */ ;
/** @type {__VLS_StyleScopedClasses['element']} */ ;
/** @type {__VLS_StyleScopedClasses['element-content']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['phrase-company']} */ ;
/** @type {__VLS_StyleScopedClasses['phrase']} */ ;
/** @type {__VLS_StyleScopedClasses['link-site-company']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-toggler']} */ ;
/** @type {__VLS_StyleScopedClasses['current-slide']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=BlockCommentCorusel.vue.js.map