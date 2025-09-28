<template>
  <div class="container-faq">
    <h2>Часто задаваемые вопросы</h2>
    <div class="faq-group">
      <div
        v-for="(item, index) in dropdownContentFAQ"
        :key="index"
        class="faq-item"
        :class="{ active: activeIndex === index }"
      >
        <div class="faq-header" @click="toggleAccordion(index)">
          <span class="index-title"> {{ index + 1 }}. {{ item.title }} </span>
          <span class="accordion-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
        <div class="faq-content">
          <div class="faq-description">
            <div
              v-for="(el, descIndex) in item.description"
              :key="descIndex"
              class="description-item"
            >
              <span class="bullet">•</span>
              <span class="description-text">{{ el.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface DescriptionFAQType {
  text: string;
}

interface ContentFAQType {
  title: string;
  description: DescriptionFAQType[];
}

export default defineComponent({
  name: "BlockFAQ",
  setup() {
    const activeIndex = ref<number | null>(null);

    const toggleAccordion = (index: number) => {
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
        title:
          "Что происходит, когда отработаны все предоплаченные часы за месяц?",
        description: [
          { text: "Сроки зависят от сложности и объема работы" },
          { text: "Стандартные проекты: 3-5 рабочих дней" },
          { text: "Сложные проекты: 7-14 рабочих дней" },
          { text: "Срочные заказы обсуждаются индивидуально" },
        ],
      },
      {
        title:
          "Что происходит, когда не отработаны все предоплаченные часы за месяц?",
        description: [
          { text: "Гарантия на выполненные работы - 12 месяцев" },
          {
            text: "Бесплатная техническая поддержка в течение гарантийного периода",
          },
          { text: "Возможность доработок по требованию заказчика" },
        ],
      },
      {
        title:
          "Как происходит оценка и согласование планируемого времени на выполнение заявок?",
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
        title:
          "Как подать заявку на добавление пользователя, изменение настроек веб-сервера и других задач по администрированию?",
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
        title:
          "Подходят ли услуги поддержки, если необходимо произвести обновление ядра Drupal или модулей?",
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
    ] as ContentFAQType[];

    return {
      dropdownContentFAQ,
      activeIndex,
      toggleAccordion,
    };
  },
});
</script>

<style scoped>
.container-faq {
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px;
}

h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 50px;
  font-weight: 700;
}

.faq-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  overflow: hidden;
}

.faq-item:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  border-color: #cbd5e0;
}

.faq-item.active {
  border-color: #f14d34;
  box-shadow: 0 4px 25px rgba(66, 153, 225, 0.15);
}

.faq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
}

.faq-header:hover {
  background-color: #f7fafc;
}

.faq-item.active .faq-header {
  background-color: #fad0c9;
}

.index-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.4;
  flex: 1;
  margin-right: 15px;
}

.accordion-icon {
  transition: transform 0.3s ease;
  color: #f14d34;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
}

.faq-item.active .accordion-icon {
  transform: rotate(180deg);
  color: #f14d34;
}

.faq-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s ease;
}

.faq-item.active .faq-content {
  max-height: 500px;
}

.faq-description {
  padding: 0 25px 25px;
}

.description-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  line-height: 1.5;
}

.description-item:last-child {
  margin-bottom: 0;
}

.bullet {
  color: #f14d34;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.4;
  min-width: 15px;
}

.description-text {
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.5;
  flex: 1;
}

/* Анимация появления текста */
.faq-item.active .description-item {
  animation: fadeInUp 0.5s ease forwards;
}

.faq-item.active .description-item:nth-child(1) {
  animation-delay: 0.1s;
}
.faq-item.active .description-item:nth-child(2) {
  animation-delay: 0.2s;
}
.faq-item.active .description-item:nth-child(3) {
  animation-delay: 0.3s;
}
.faq-item.active .description-item:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .container-faq {
    padding: 40px 15px;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 30px;
  }

  .faq-header {
    padding: 15px 20px;
  }

  .index-title {
    font-size: 1rem;
  }

  .faq-description {
    padding: 0 20px 20px;
  }

  .description-text {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 1.75rem;
  }

  .faq-header {
    padding: 12px 15px;
  }

  .index-title {
    font-size: 0.95rem;
  }

  .description-item {
    flex-direction: column;
    gap: 5px;
  }

  .bullet {
    align-self: flex-start;
  }
}

/* Плавная прокрутка при открытии */
.faq-item {
  scroll-margin-top: 20px;
}
</style>
