<template>
  <div class="container-partners">
    <div class="partners-header">
      <h2>С нами работают</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi rerum
        dolor quidem. Repudiandae culpa sint tenetur laborum quas, officia vel
        dolorum doloremque, suscipit necessitatibus nostrum quos rerum ipsum.
        Necessitatibus, ratione?
      </p>
    </div>
    <div class="group-scroll-partners">
      <!-- Верхний блок - прокручивается вправо -->
      <div class="scroll-container scroll-right">
        <div class="scroll-content">
          <div
            v-for="(item, index) in partnerGroupRight"
            :key="`right-${index}`"
            class="element"
          >
            <a :href="item.link">
              <img :src="item.image" alt="partner" />
            </a>
          </div>
          <!-- Дублируем контент для бесшовной анимации -->
          <div
            v-for="(item, index) in partnerGroupRight"
            :key="`right-duplicate-${index}`"
            class="element"
          >
            <a :href="item.link">
              <img :src="item.image" alt="partner" />
            </a>
          </div>
        </div>
      </div>

      <!-- Нижний блок - прокручивается влево -->
      <div class="scroll-container scroll-left">
        <div class="scroll-content">
          <div
            v-for="(item, index) in partnerGroupLeft"
            :key="`left-${index}`"
            class="element"
          >
            <a :href="item.link">
                <img :src="item.image" alt="partner" />
            </a>
          </div>
          <!-- Дублируем контент для бесшовной анимации -->
          <div
            v-for="(item, index) in partnerGroupLeft"
            :key="`left-duplicate-${index}`"
            class="element"
          > 
            <a :href="item.link">
                <img :src="item.image" alt="partner" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";

import partner1 from "@/assets/img/partners-0.png";
import partner2 from "@/assets/img/partners-1.png";
import partner3 from "@/assets/img/partners-2.png";
import partner4 from "@/assets/img/partners-3.png";

interface PartnersType {
  image: string;
  link?: string;
}

export default defineComponent({
  name: "BlockCorporate",
  setup() {
    const partnerGroupRight = [
      { image: partner1, link: "https://kubsu.ru" },
      { image: partner2, link: "https://kubsu.ru" },
      { image: partner3, link: "https://kubsu.ru" },
      { image: partner4, link: "https://kubsu.ru" },
      { image: partner1, link: "https://kubsu.ru" },
      { image: partner2, link: "https://kubsu.ru" },
    ] as PartnersType[];

    const partnerGroupLeft = [
      { image: partner3, link: "https://kubsu.ru" },
      { image: partner4, link: "https://kubsu.ru" },
      { image: partner1, link: "https://kubsu.ru" },
      { image: partner2, link: "https://kubsu.ru" },
      { image: partner3, link: "https://kubsu.ru" },
      { image: partner4, link: "https://kubsu.ru" },
    ] as PartnersType[];

    // Обработчик скролла для изменения направления
    let scrollDirection = 1; // 1 - вниз, -1 - вверх
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Скролл вниз
        scrollDirection = 1;
      } else {
        // Скролл вверх
        scrollDirection = -1;
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      partnerGroupRight,
      partnerGroupLeft,
    };
  },
});
</script>

<style scoped>
.container-partners {
  margin: 0 auto;
  padding: 80px 20px;
  /* max-width: 600px; */
  width: 70%;
  margin-top: 150px;
  overflow: hidden;
}

.partners-header {
  text-align: center;
  margin-bottom: 60px;
}

.partners-header h2 {
  font-size: 36px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 20px;
}

.partners-header p {
  font-size: 18px;
  color: #718096;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.group-scroll-partners {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.scroll-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 20px 0;
}

.scroll-content {
  display: flex;
  gap: 40px;
  animation: scroll 30s linear infinite;
  width: max-content;
}

.scroll-right .scroll-content {
  animation-direction: normal;
}

.scroll-left .scroll-content {
  animation-direction: reverse;
}

.element {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.element:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.element img {
  max-width: 120px;
  max-height: 60px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.element:hover img {
  filter: grayscale(0%);
  opacity: 1;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Градиентные маски для плавного скрытия краев */
.scroll-container::before,
.scroll-container::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 2;
  pointer-events: none;
}

.scroll-container::before {
  left: 0;
  background: linear-gradient(to right, white, transparent);
}

.scroll-container::after {
  right: 0;
  background: linear-gradient(to left, white, transparent);
}

/* Адаптивность */
@media (max-width: 768px) {
  .container-partners {
    padding: 40px 15px;
  }

  .partners-header h2 {
    font-size: 28px;
  }

  .partners-header p {
    font-size: 16px;
  }

  .element {
    padding: 15px 20px;
  }

  .element img {
    max-width: 100px;
    max-height: 50px;
  }

  .scroll-content {
    gap: 20px;
    animation-duration: 20s;
  }

  .scroll-container::before,
  .scroll-container::after {
    width: 50px;
  }
}

@media (max-width: 480px) {
  .partners-header h2 {
    font-size: 24px;
  }

  .element {
    padding: 10px 15px;
  }

  .element img {
    max-width: 80px;
    max-height: 40px;
  }

  .scroll-content {
    gap: 15px;
    animation-duration: 15s;
  }
}

/* Пауза анимации при наведении */
.scroll-container:hover .scroll-content {
  animation-play-state: paused;
}
</style>
