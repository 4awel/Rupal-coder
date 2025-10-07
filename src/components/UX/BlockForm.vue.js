import { defineComponent, reactive, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
    name: "BlockForm",
    setup() {
        const store = useStore();
        const formData = reactive({
            name: "",
            phone: "",
            email: "",
            comment: "",
            agree: false,
        });
        // Геттеры из Vuex
        const isLoading = computed(() => store.getters.isFormLoading);
        const success = computed(() => store.getters.formSuccess);
        const error = computed(() => store.getters.formError);
        const isFormValid = computed(() => {
            return (formData.name.trim() !== "" &&
                formData.phone.trim() !== "" &&
                formData.email.trim() !== "" &&
                formData.agree !== false &&
                isValidEmail(formData.email));
        });
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
        // Обработчики
        const handleSubmit = async () => {
            if (!isFormValid.value)
                return;
            try {
                await store.dispatch("submitForm", formData);
                // Очистка формы после успешной отправки
                Object.assign(formData, {
                    name: "",
                    phone: "",
                    email: "",
                    comment: "",
                });
            }
            catch (error) {
                console.error("Ошибка отправки формы:", error);
            }
        };
        const resetForm = () => {
            store.dispatch("resetForm");
        };
        const clearError = () => {
            store.commit("SET_ERROR", null);
        };
        // Классы для анимаций
        const formClasses = computed(() => ({
            "form-loading": isLoading.value,
            "form-success": success.value,
            "form-error": error.value,
        }));
        return {
            formData,
            isLoading,
            resetForm,
            clearError,
            handleSubmit,
            success,
            error,
            formClasses,
            isFormValid
        };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['overlay-300']} */ ;
/** @type {__VLS_StyleScopedClasses['deg-15']} */ ;
/** @type {__VLS_StyleScopedClasses['block-top']} */ ;
/** @type {__VLS_StyleScopedClasses['email']} */ ;
/** @type {__VLS_StyleScopedClasses['contact-form']} */ ;
/** @type {__VLS_StyleScopedClasses['contact-form']} */ ;
/** @type {__VLS_StyleScopedClasses['contact-form']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
/** @type {__VLS_StyleScopedClasses['reset-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['form-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-input']} */ ;
/** @type {__VLS_StyleScopedClasses['checkmark']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-input']} */ ;
/** @type {__VLS_StyleScopedClasses['checkmark']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-input']} */ ;
/** @type {__VLS_StyleScopedClasses['privacy-link']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['checkmark']} */ ;
/** @type {__VLS_StyleScopedClasses['container-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-info']} */ ;
/** @type {__VLS_StyleScopedClasses['block-top']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay-300']} */ ;
/** @type {__VLS_StyleScopedClasses['deg-15']} */ ;
/** @type {__VLS_StyleScopedClasses['container-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-info']} */ ;
/** @type {__VLS_StyleScopedClasses['block-top']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['phone']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay-300']} */ ;
/** @type {__VLS_StyleScopedClasses['deg-15']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
/** @type {__VLS_StyleScopedClasses['container-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-info']} */ ;
/** @type {__VLS_StyleScopedClasses['block-top']} */ ;
/** @type {__VLS_StyleScopedClasses['block-bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay-300']} */ ;
/** @type {__VLS_StyleScopedClasses['deg-15']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container-form" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "overlay-300 deg-15" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "../../assets/svg/D-fly.svg",
    alt: "d-overlay",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block-top" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "description" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block-bottom" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "phone" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "info@drupal-coder.com",
    ...{ class: "email" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    ...{ class: "contact-form" },
    ...{ class: (__VLS_ctx.formClasses) },
});
if (__VLS_ctx.isLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-overlay" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "loading-text" },
    });
}
if (__VLS_ctx.success) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.resetForm) },
        type: "button",
        ...{ class: "reset-btn" },
    });
}
if (!__VLS_ctx.success) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "input-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        value: (__VLS_ctx.formData.name),
        type: "text",
        placeholder: "Ваше имя",
        ...{ class: "form-input" },
        disabled: (__VLS_ctx.isLoading),
        required: true,
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "input-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "tel",
        placeholder: "Телефон",
        ...{ class: "form-input" },
        disabled: (__VLS_ctx.isLoading),
        required: true,
    });
    (__VLS_ctx.formData.phone);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "input-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "email",
        placeholder: "E-mail",
        ...{ class: "form-input" },
        disabled: (__VLS_ctx.isLoading),
        required: true,
    });
    (__VLS_ctx.formData.email);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "input-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
        value: (__VLS_ctx.formData.comment),
        placeholder: "Ваш комментарий",
        id: "comment",
        ...{ class: "form-textarea" },
        disabled: (__VLS_ctx.isLoading),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "checkbox-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "checkbox-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "checkbox",
        ...{ class: "checkbox-input" },
        disabled: (__VLS_ctx.isLoading),
        required: true,
    });
    (__VLS_ctx.formData.agree);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "checkmark" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "checkbox-text" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: "#",
        ...{ class: "privacy-link" },
    });
    if (__VLS_ctx.error) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.error);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.clearError) },
            type: "button",
            ...{ class: "error-close" },
        });
    }
    const __VLS_0 = {}.ButtonTypeBould;
    /** @type {[typeof __VLS_components.ButtonTypeBould, typeof __VLS_components.ButtonTypeBould, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ style: {} },
        ...{ class: "submit-btn" },
        ...{ class: ({ loading: __VLS_ctx.isLoading }) },
        disabled: (!__VLS_ctx.isFormValid || __VLS_ctx.isLoading),
    }));
    const __VLS_2 = __VLS_1({
        ...{ style: {} },
        ...{ class: "submit-btn" },
        ...{ class: ({ loading: __VLS_ctx.isLoading }) },
        disabled: (!__VLS_ctx.isFormValid || __VLS_ctx.isLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    if (!__VLS_ctx.isLoading) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    var __VLS_3;
}
/** @type {__VLS_StyleScopedClasses['container-form']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay-300']} */ ;
/** @type {__VLS_StyleScopedClasses['deg-15']} */ ;
/** @type {__VLS_StyleScopedClasses['form-info']} */ ;
/** @type {__VLS_StyleScopedClasses['block-top']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['block-bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['phone']} */ ;
/** @type {__VLS_StyleScopedClasses['email']} */ ;
/** @type {__VLS_StyleScopedClasses['form']} */ ;
/** @type {__VLS_StyleScopedClasses['contact-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-text']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
/** @type {__VLS_StyleScopedClasses['success-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['reset-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['form-content']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-group']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-input']} */ ;
/** @type {__VLS_StyleScopedClasses['checkmark']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-text']} */ ;
/** @type {__VLS_StyleScopedClasses['privacy-link']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['error-close']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['loading']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=BlockForm.vue.js.map