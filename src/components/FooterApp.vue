<template>
  <footer>
    <div class="footer-content">
      <div class="container-wem-mesg">
        <a v-for="(item, index) in svgLinksGroup" :key="index" :href="item.link" class="social-link">
          <img :src="item.image" :alt="item.alt" />
        </a>
      </div>
      <div class="footer-text">
        <span
          >Проект ООО "Инитлаб", Краснодар, Россия. <br />
          Drupal является зарегестрированной торговой маркой Drives Buyteart.
        </span>
      </div>
    </div>
    <div class="overlay-drupal">
      <img src="../assets/svg/D-fly.svg" alt="Drupal overlay" />
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import facebook from '@/assets/svg/facebook.svg';
import telegram from '@/assets/svg/tg.svg';
import youtube from '@/assets/svg/yt.svg';
import vk from '@/assets/svg/vk.svg';

interface LinkType {
  image: string,
  link: string,
  alt: string
}

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
    ] as LinkType[];

    return { svgLinksGroup }
  },
});
</script>

<style scoped>
footer {
  position: relative;
  overflow: hidden;
}

.footer-content {
  height: 100%;
  color: #fff;
  padding: 60px 230px;
  background: linear-gradient(90deg, #0f111a 0%, #090924 100%);
  position: relative;
  z-index: 2;
}

.container-wem-mesg {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  z-index: 3;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f14d36;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
  /* filter: brightness(0) saturate(100%) invert(26%) sepia(89%) saturate(7500%) hue-rotate(358deg) brightness(95%) contrast(112%); */
}

.social-link:hover {
  transform: translateY(-3px);
  /* filter: brightness(0) saturate(100%) invert(26%) sepia(89%) saturate(7500%) hue-rotate(358deg) brightness(115%) contrast(112%); */
}

.social-link img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.footer-text span {
  opacity: 0.7;
  font-size: 14px;
  line-height: 1.5;
  z-index: 3;
}

.overlay-drupal {
  position: absolute;
  margin: 0 150px 0 0;
  z-index: 2;
}

.overlay-drupal img {
  width: 600px;
  height: 600px;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .footer-content {
    padding: 40px 100px;
  }
  
  .overlay-drupal {
    bottom: -40px;
    right: -40px;
  }
  
  .overlay-drupal img {
    width: 250px;
    height: 250px;
  }
}

@media (max-width: 768px) {
  .footer-content {
    padding: 30px 50px;
    text-align: left;
  }
  
  .container-wem-mesg {
    justify-content: start;
    gap: 15px;
  }
  
  .overlay-drupal {
    bottom: -30px;
    right: -30px;
  }
  
  .overlay-drupal img {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 468px) {
  .footer-content {
    padding: 40px 20px;
  }
  
  .container-wem-mesg {
    gap: 12px;
  }
  
  .social-link {
    width: 35px;
    height: 35px;
  }
  
  .social-link img {
    width: 20px;
    height: 20px;
  }
  
  .overlay-drupal {
    bottom: -65px;
    right: -10px;
    z-index: 2;
    opacity: 0.4;
  }
  
  .overlay-drupal img {
    width: 150px;
    height: 150px;
  }
}

/* Для очень больших экранов */
@media (min-width: 1920px) {
  .overlay-drupal {
    bottom: -100px;
    right: -100px;
  }
  
  .overlay-drupal img {
    width: 400px;
    height: 400px;
  }
}

.social-link img {
  /* filter: brightness(0) saturate(100%) invert(26%) sepia(89%) saturate(7500%) hue-rotate(358deg) brightness(95%) contrast(112%); */
}

.social-link:hover img {
  /* filter: brightness(0) saturate(100%) invert(26%) sepia(89%) saturate(7500%) hue-rotate(358deg) brightness(115%) contrast(112%); */
}
</style>