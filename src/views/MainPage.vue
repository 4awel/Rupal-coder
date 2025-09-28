<template>
  <main class="main-container">
    <BlockSupportInfo />
    <div class="dividing-overlay-block">
      <BlockServisec />
      <div class="header-about-wrapper">
        <BlockHeaderAboutInfo />
      </div>
    </div>
    <div class="about-info-wrapper">
      <BlockAboutInfo />
      <BlockTarif />
      <BlockPersone />
      <BlockLastCase />
      <BlockCommentCorusel />
      <BlockCorporate />
      <BlockFAQ />
      <BlockForm />
    </div>
    
    <!-- Кнопка "Наверх" -->
    <button 
      class="scroll-to-top-btn" 
      :class="{ 'visible': isScrollButtonVisible }"
      @click="scrollToTop"
      aria-label="Вернуться наверх"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 20V4M12 4L5 11M12 4L19 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

export default defineComponent({
  name: "MainPage",
  setup() {
    const isScrollButtonVisible = ref(false);

    const checkScrollPosition = () => {
      // Показываем кнопку когда прокрутка больше 300px
      isScrollButtonVisible.value = window.scrollY > 300;
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const handleScroll = () => {
      checkScrollPosition();
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      checkScrollPosition(); // Проверяем при загрузке
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      isScrollButtonVisible,
      scrollToTop
    };
  },
});
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.dividing-overlay-block {
  padding: 10% 20%;
  display: flex;
  flex-direction: column;
  gap: 160px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
  position: relative;
  z-index: 2;
}

.header-about-wrapper {
  position: relative;
  z-index: 4;
  margin-bottom: -300px;
}

.about-info-wrapper {
  position: relative;
  z-index: 1;
  margin-top: -40px;
  background: transparent;
}

/* Кнопка "Наверх" */
.scroll-to-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(105deg, #f9d76e 0%, #fe4a2f 100%);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-to-top-btn.visible {
  opacity: 1;
  visibility: visible;
}

.scroll-to-top-btn:hover {
  transform: translateY(-3px);
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #f14d34 0%, #ffd65a 100%);
}

.scroll-to-top-btn:active {
  transform: translateY(0);
}

/* Анимация появления */
.scroll-to-top-btn {
  animation: fadeInUp 0.5s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптивность для кнопки */
@media (max-width: 768px) {
  .scroll-to-top-btn {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .scroll-to-top-btn {
    bottom: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
  }
  
  .scroll-to-top-btn svg {
    width: 18px;
    height: 18px;
  }
}

/* Убираем конфликты z-index */
:deep(.container-tarif) {
  position: relative;
  z-index: 1 !important;
}

:deep(.svg-overlay) {
  z-index: 1 !important;
}

/* Адаптивность основного контента */
@media (max-width: 1250px) {
  .dividing-overlay-block {
    padding: 10% 15%;
  }
  
  .header-about-wrapper {
    margin-bottom: -200px;
  }

  .about-info-wrapper {
    margin-top: -20px;
  }
}

@media (max-width: 768px) {
  .dividing-overlay-block {
    padding: 15% 10%;
    gap: 100px;
  }

  .header-about-wrapper {
    margin-bottom: -100px;
  }

  .about-info-wrapper {
    margin-top: 0;
    z-index: 1;
  }
}

@media (max-width: 480px) {
  .dividing-overlay-block {
    padding: 20% 5%;
    gap: 80px;
  }

  .header-about-wrapper {
    margin-bottom: -60px;
  }

  .about-info-wrapper {
    margin-top: 0;
  }
}
</style>