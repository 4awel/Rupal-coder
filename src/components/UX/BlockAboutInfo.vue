<template>
  <div class="container-laptop">
    <div class="svg-overlay">
      <img src="../../assets/svg/image-element-0.svg" alt="svg-overlay" />
    </div>
    <div class="svg-laptop">
      <img src="../../assets/img/laptop.png" alt="laptop" />
    </div>
    <div class="content-laptop">
      <h2>
        Экспертиза в Drupal,
        <br />
        опыт 14 лет!
      </h2>
      <div class="group-item">
        <div v-for="(item, index) in groupItemLaptop" :key="index" class="item">
          <div class="vertical-line"></div>
          <span>
            {{ item.description }}
            <a
              style="color: #f14d34; text-decoration: none"
              v-if="item.link"
              :href="item.link"
              >{{ item.prefix }}</a
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
interface GroupItemlaptopType {
  description: string;
  link?: string;
  prefix?: string;
}
export default defineComponent({
  name: "BlockAboutInfo",
  setup() {
    const groupItemLaptop = [
      {
        description:
          "Только системный подход – контроль версий, резервирование и тестирование!",
      },
      {
        description:
          "Только Drupal сайты, не берем на поддержку сайты на других CMS!",
      },
      {
        description:
          "Участвуем в разработке ядра Drupal и модулей на Drupal.org, разрабатываем",
        link: "/modules",
        prefix: "свои модули Drupal",
      },
      {
        description: "Поддерживаем сайты на Drupal 5, 6, 7 и 8",
      },
    ] as GroupItemlaptopType[];

    return {
      groupItemLaptop,
    };
  },
});
</script>

<style scoped>
.container-laptop {
  position: relative;
  background: linear-gradient(90deg, #020411, #040824, #040823, #060c35);
  display: flex;
  align-items: center;
  width: 100%;
  padding: 200px 0 0 0;
  justify-content: start;
  min-height: auto; /* изменено с 600px */
  overflow: visible; /* добавлено */
}

.svg-overlay {
  position: absolute;
  top: 35%;
  right: 0%;
  transform: translate(0%, -50%);
  z-index: 1;
  /* opacity: 0.05; */
  pointer-events: none; /* добавлено */
}

.svg-overlay img {
  width: 900px;
  height: 900px;
  /* position: absolute; */
  object-fit: contain;
}

.svg-laptop {
  position: relative;
  z-index: 3;
  flex: 0 0 45%;
  top: 100px;
  display: flex;
  justify-content: start;
}

.svg-laptop img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1));
}

.content-laptop {
  position: relative;
  /* z-index: 2; */
  flex: 0 0 50%;
}

.content-laptop h2 {
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  margin-bottom: 40px;
  position: relative;
}

.content-laptop h2::after {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 0;
  width: 80px;
  height: 4px;
  background: #f14d34;
  border-radius: 2px;
}

.group-item {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.vertical-line {
  flex-shrink: 0;
  width: 3px;
  height: 100%;
  min-height: 24px;
  background: #f14d34;
  border-radius: 2px;
  margin-top: 2px;
}

.item span {
  font-size: 16px;
  line-height: 1.6;
  color: #b2b2b2;
  font-weight: 500;
}

.item a {
  color: #f14d34 !important;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.item a:hover {
  text-decoration: underline;
  color: #d4442e !important;
}

/* Анимации */
.svg-laptop img {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

/* Убрал анимации появления, которые могут конфликтовать */
.item {
  opacity: 1;
  transform: translateX(0);
}

/* Адаптивность для планшетов */
@media (max-width: 1024px) {
  .container-laptop {
    flex-direction: column-reverse;
    text-align: left;
    align-items: start;
    /* padding: 60px 20px; */
    min-height: 60vh;
    gap: 40px;
  }

  .svg-laptop {
    flex: 0 0 auto;
    max-width: 600px;
    left: -15px;
    top: 400px;
    order: 1;
    z-index: 3;
  }

  .group-item {
    align-items: start;
  }

  .content-laptop {
    flex: 0 0 auto;
    width: 100%;
    max-width: 600px;
    order: 2;
    margin-left: 20%;
    position: absolute;
  }

  .content-laptop h2::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .item {
    justify-content: center;
    text-align: left;
  }
}

/* Адаптивность для мобильных */
@media (max-width: 768px) {
  .container-laptop {
    text-align: left;
    gap: 30px;
  }

  .content-laptop {
    margin-left: 20px;
  }

  .svg-laptop {
    max-width: 500px;
  }

  .content-laptop h2 {
    font-size: 32px;
    margin-bottom: 30px;
    text-align: center;
  }
  
  .svg-overlay img {
    width: 500px;
    height: 500px;
  }

  .svg-overlay {
      top: 25%;
  }

  .item {
    gap: 15px;
  }

  .item span {
    font-size: 15px;
  }
}

/* Адаптивность для маленьких мобильных */
@media (max-width: 480px) {
  .container-laptop {
    /* padding: 30px 15px; */
    gap: 20px;
  }

  .content-laptop h2 {
    font-size: 22px;
    text-align: center;
  }

  .group-item {
    gap: 20px;
  }

  .item {
    flex-direction: column;
    /* align-items: center; */
    /* text-align: center; */
    gap: 10px;
  }

  .vertical-line {
    width: 40px;
    height: 3px;
    min-height: 3px;
  }

  .item span {
    font-size: 12px;
  }
}
</style>
