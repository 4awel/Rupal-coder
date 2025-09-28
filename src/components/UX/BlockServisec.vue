<template>
  <div class="container-services">
    <div class="services-header">
      <h2>13 лет совершенствуем компетенции в Друпал поддержке!</h2>
      <span
        >Разрабатываем и оптимизируем модули, расширяем функциональность сайтов,
        обновляем дизайн</span
      >
    </div>
    <div class="services-group">
      <div
        v-for="(item, index) in GroupServices"
        :key="index"
        class="services-item"
      >
        <div class="svg-container">
          <img
            src="../../assets/svg/overlay-drupal.svg"
            alt="overlay"
            class="svg-overlay"
          />
          <img class="item-image" :src="item.img" :alt="item.alt" />
        </div>
        <span class="item-info">{{ item.description }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import competency1 from "@/assets/svg/competency-1.svg";
import competency2 from "@/assets/svg/competency-2.svg";
import competency3 from "@/assets/svg/competency-3.svg";
import competency4 from "@/assets/svg/competency-4.svg";
import competency5 from "@/assets/svg/competency-5.svg";
import competency6 from "@/assets/svg/competency-6.svg";
import competency7 from "@/assets/svg/competency-7.svg";
import competency8 from "@/assets/svg/competency-8.svg";

interface GroupServicesType {
  img: string;
  description: string;
  alt: string;
}

export default defineComponent({
  name: "BlockServisec",
  setup() {
    const GroupServices: GroupServicesType[] = [
      {
        img: competency1,
        description: "Добавление информации на сайт, создание новых разделов",
        alt: "add-information",
      },
      {
        img: competency2,
        description: "Разработка и оптимизация модулей сайта",
        alt: "develop",
      },
      {
        img: competency3,
        description:
          "Интеграция с CRM, 1C, платежными системами, любыми веб-сервисами",
        alt: "CRM",
      },
      {
        img: competency4,
        description: "Любые доработки функционала и дизайна",
        alt: "function",
      },
      {
        img: competency5,
        description: "Аудит и мониторинг безопасности Drupal сайтов",
        alt: "audit",
      },
      {
        img: competency6,
        description: "Миграция, импорт контента и апгрейд Drupal",
        alt: "migration",
      },
      {
        img: competency7,
        description: "Оптимизация и ускорение Drupal-сайтов",
        alt: "Optimization",
      },
      {
        img: competency8,
        description: "Веб-маркетинг, консультации и работы по SEO",
        alt: "web-marketing",
      },
    ];

    return {
      GroupServices,
    };
  },
});
</script>

<style scoped>
.container-services {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.services-header {
  width: 100%;
  margin-bottom: 60px;
}

.services-header h2 {
  font-size: 48px;
  margin-bottom: 20px;
  width: 50%;
  color: #333;
  line-height: 1.2;
}

.services-header span {
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  max-width: 40%;
  text-align: left;
  display: inline-block;
}

.services-group {
  display: grid;
  grid-template-columns: repeat(4, 20%);
  gap: 20px;
  justify-items: start;
}

.services-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  text-align: left;
  max-width: 200px;
}

.svg-container {
  position: relative;
  width: 90px;
  height: 90px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
}

.svg-overlay {
  position: absolute;
  top: 15px;
  left: -45px;
  width: 90%;
  height: 90%;
  object-fit: contain;
}

.item-image {
  position: relative;
  z-index: 2;
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.item-info {
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  font-weight: 500;
  margin-left: 28px;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .services-group {
    grid-template-columns: repeat(2, 25%);
    justify-content: space-around;
  }

  .services-header h2 {
    font-size: 36px;
  }

  .services-header span {
    width: 100%;
    display: inline;
  }
}

@media (max-width: 768px) {
  .services-group {
    grid-template-columns: repeat(2, 50%);
    justify-content: center;
  }

  .services-header h2 {
    font-size: 28px;
    width: 100%;
  }

  .services-header span {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .services-header h2 {
    font-size: 24px;
    grid-template-columns: 30%;
    justify-content: space-around;
  }

  .svg-container {
    width: 80px;
    height: 80px;
  }

  .item-image {
    width: 50px;
    height: 50px;
  }
}
</style>
