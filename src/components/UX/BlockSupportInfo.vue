<template>
  <div class="support-container">
    <!-- Видео на заднем плане -->
    <video class="video-background" autoplay muted loop>
      <source src="../../assets/img/video.mp4" type="video/mp4" />
      Ваш браузер не поддерживает видео.
    </video>

    <!-- SVG элемент (если нужен) -->
    <div class="svg-overlay">
      <img src="../../assets/svg/image-element-0.svg" alt="" />
    </div>

    <!-- Контент поверх видео -->
    <div class="content-overlay">
      <div class="block-header">
        <h1>Поддержка сайтов на Drupal</h1>
        <span
          >Сопровождение и поддержка сайтов на CMS Drupal любых версий и
          запущенности</span
        >
        <ButtonTypeOpasyti>Тарифы</ButtonTypeOpasyti>
      </div>
      <div class="block-group">
        <div v-for="(item, index) in groupItem" :key="index" class="item">
          <div class="line"></div>
          <div class="group-info">
            <h3 :style="{ 'font-size': item.size + 'px' }">
              {{ item.title }}
              <img :style="{'height': item.size + 'px', 'width': 'auto'}" v-if="item.img" :src="getImageUrl(item.img)" alt="cup" />
            </h3>
            <span>{{ item.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import cupImg from "@/assets/img/cup.png";

interface GroupItemType {
  title: string;
  size: number;
  img?: string;
  description: string;
}

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
    ] as GroupItemType[];

    const getImageUrl = (imageName: string) => {
      const imageMap: { [key: string]: any } = {
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
</script>

<style scoped>
.support-container {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.video-background {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 0;
  object-fit: cover;
}

/* Затемнение видео для лучшей читаемости текста */
.support-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(1, 2, 7, 0.778); /* Темный оверлей */
  z-index: 1;
}

.svg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.content-overlay {
  position: relative;
  display: flex;
  justify-content: space-around;
  gap: 10%;
  align-items: center;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  padding: 80px 20px;
}

.block-header {
  text-align: start;
  margin-bottom: 60px;
}

.block-header h1 {
  font-size: 48px;
  color: #ffffff;
  margin-bottom: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.block-header span {
  font-size: 20px;
  color: #b3b3b3;
  display: block;
  margin-bottom: 30px;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.block-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 столбца */
  grid-template-rows: repeat(2, auto); /* 2 строки */
  gap: 40px;
  width: 100%;
  max-width: 1000px;
}

.item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.line {
  width: 3px;
  height: 100%;
  background: #f14d34;
  border-radius: 2px;
  flex-shrink: 0;
}

.group-info h3 {
  color: #ffffff;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.group-info h3 img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.group-info span {
  color: #b3b3b3;
  font-size: 14px;
  line-height: 1.5;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* Адаптивность */
@media (max-width: 768px) {
  .content-overlay {
    padding: 40px 20px;
    flex-direction: column;
  }

  .support-container {
    height: 85vh;
  }

  .block-header {
    text-align: center;
  }

  .block-header h1 {
    font-size: 32px;

  }

  .block-header span {
    font-size: 16px;
  }

  .block-group {
    grid-template-columns: 1fr;

    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 столбца */
    grid-template-rows: repeat(2, auto); /* 2 строки */
    gap: 40px;
    width: 100%;
    max-width: 1000px;
    gap: 30px;
  }

  .item {
    gap: 15px;
  }

  .line {
    height: 50px;
  }
}

/* Оптимизация для мобильных устройств */
@media (max-width: 480px) {
  .video-background {
    display: none; /* Скрываем видео на очень маленьких экранах */
  }

  .support-container::before {
    background: #050c33; /* Сплошной цвет вместо видео */
  }
}
</style>
