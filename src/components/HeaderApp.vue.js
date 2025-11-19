import { defineComponent, ref } from "vue";
export default defineComponent({
    name: "AppHeader",
    setup() {
        const isMobileMenuOpen = ref(false);
        const activeDropdown = ref(null);
        const NavLinks = [
            {
                link: "/",
                title: "Поддержка DRUPAL",
            },
            {
                title: "Администрирование",
                dropdown: [
                    {
                        title: "Миграция сайтов",
                        link: "/migration",
                    },
                    {
                        title: "Безопасность",
                        link: "/security",
                    },
                    {
                        title: "Оптимизация",
                        link: "/optimization",
                    },
                ],
            },
            {
                title: "ПРОДВИЖЕНИЕ",
                link: "/seo",
            },
            {
                title: "РЕКЛАМА",
                link: "/ads",
            },
            {
                title: "О НАС",
                dropdown: [
                    {
                        title: "Команда",
                        link: "/team",
                    },
                    {
                        title: "Отзывы",
                        link: "/reviews",
                    },
                    {
                        title: "Сертификаты",
                        link: "/certificates",
                    },
                ],
            },
            {
                title: "ПРОЕКТЫ",
                link: "/projects",
            },
            {
                title: "КОНТАКТЫ",
                link: "/contacts",
            },
        ];
        const toggleMobileMenu = () => {
            isMobileMenuOpen.value = !isMobileMenuOpen.value;
            // Закрываем dropdown при открытии/закрытии бургер-меню
            if (!isMobileMenuOpen.value) {
                activeDropdown.value = null;
            }
        };
        const closeMobileMenu = () => {
            isMobileMenuOpen.value = false;
            activeDropdown.value = null;
        };
        const toggleDropdown = (index) => {
            // На десктопе dropdown работает по hover, на мобильных по клику
            const isMobile = window.innerWidth <= 1200;
            if (!isMobile)
                return; // На десктопе не обрабатываем клики
            if (activeDropdown.value === index) {
                activeDropdown.value = null;
            }
            else {
                activeDropdown.value = index;
            }
        };
        // Закрываем dropdown при клике вне меню
        const handleClickOutside = (event) => {
            const target = event.target;
            if (!target.closest('.nav') && !target.closest('.burger-menu')) {
                activeDropdown.value = null;
            }
        };
        // Добавляем обработчик клика вне меню
        if (typeof window !== 'undefined') {
            document.addEventListener('click', handleClickOutside);
        }
        return {
            NavLinks,
            isMobileMenuOpen,
            activeDropdown,
            toggleMobileMenu,
            closeMobileMenu,
            toggleDropdown
        };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['has-dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['has-dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['has-dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-link']} */ ;
/** @type {__VLS_StyleScopedClasses['burger-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['burger-menu-active']} */ ;
/** @type {__VLS_StyleScopedClasses['burger-menu-active']} */ ;
/** @type {__VLS_StyleScopedClasses['burger-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-list']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-list']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-link']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-link']} */ ;
/** @type {__VLS_StyleScopedClasses['has-dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['has-dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['nav']} */ ;
/** @type {__VLS_StyleScopedClasses['burger-menu']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "logo" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "../assets/img/drupal-coder.svg",
    alt: "Drupal Coder",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "nav" },
    ...{ class: ({ 'nav-active': __VLS_ctx.isMobileMenuOpen }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "nav-list" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.NavLinks))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (index),
        ...{ class: "nav-item" },
        ...{ class: ({
                'has-dropdown': item.dropdown,
                'dropdown-active': __VLS_ctx.activeDropdown === index
            }) },
    });
    if (item.link) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
            ...{ onClick: (__VLS_ctx.closeMobileMenu) },
            href: (item.link),
            ...{ class: "nav-link" },
        });
        (item.title);
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ onClick: (...[$event]) => {
                    if (!!(item.link))
                        return;
                    __VLS_ctx.toggleDropdown(index);
                } },
            ...{ class: "nav-link" },
        });
        (item.title);
    }
    if (item.dropdown) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "dropdown" },
            ...{ class: ({ 'dropdown-active': __VLS_ctx.activeDropdown === index }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
            ...{ class: "dropdown-list" },
        });
        for (const [opt, optIndex] of __VLS_getVForSourceType((item.dropdown))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                key: (optIndex),
                ...{ class: "dropdown-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                ...{ onClick: (__VLS_ctx.closeMobileMenu) },
                href: (opt.link),
                ...{ class: "dropdown-link" },
            });
            (opt.title);
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.toggleMobileMenu) },
    ...{ class: "burger-menu" },
    ...{ class: ({ 'burger-menu-active': __VLS_ctx.isMobileMenuOpen }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-container']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['nav']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-list']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['has-dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-active']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-list']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-link']} */ ;
/** @type {__VLS_StyleScopedClasses['burger-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['burger-menu-active']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=HeaderApp.vue.js.map