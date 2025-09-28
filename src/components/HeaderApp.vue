<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <img src="../assets/img/drupal-coder.svg" alt="Drupal Coder" />
      </div>

      <nav class="nav" :class="{ 'nav-active': isMobileMenuOpen }">
        <ul class="nav-list">
          <li
            v-for="(item, index) in NavLinks"
            :key="index"
            class="nav-item"
            :class="{ 
              'has-dropdown': item.dropdown,
              'dropdown-active': activeDropdown === index 
            }"
          >
            <a v-if="item.link" :href="item.link" class="nav-link" @click="closeMobileMenu">
              {{ item.title }}
            </a>
            <span v-else class="nav-link" @click="toggleDropdown(index)">
              {{ item.title }}
            </span>

            <div v-if="item.dropdown" class="dropdown" :class="{ 'dropdown-active': activeDropdown === index }">
              <ul class="dropdown-list">
                <li
                  v-for="(opt, optIndex) in item.dropdown"
                  :key="optIndex"
                  class="dropdown-item"
                >
                  <a :href="opt.link" class="dropdown-link" @click="closeMobileMenu">
                    {{ opt.title }}
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>

      <!-- Бургер-меню -->
      <div class="burger-menu" 
           :class="{ 'burger-menu-active': isMobileMenuOpen }" 
           @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface DropdownType {
  title: string;
  link: string;
}

interface NavType {
  link?: string;
  title: string;
  dropdown?: DropdownType[];
}

export default defineComponent({
  name: "AppHeader",
  setup() {
    const isMobileMenuOpen = ref(false);
    const activeDropdown = ref<number | null>(null);

    const NavLinks: NavType[] = [
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

    const toggleDropdown = (index: number) => {
      // На десктопе dropdown работает по hover, на мобильных по клику
      const isMobile = window.innerWidth <= 1200;
      
      if (!isMobile) return; // На десктопе не обрабатываем клики
      
      if (activeDropdown.value === index) {
        activeDropdown.value = null;
      } else {
        activeDropdown.value = index;
      }
    };

    // Закрываем dropdown при клике вне меню
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
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
</script>

<style scoped>
.header {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  position: relative;
}

.logo img {
  height: 28px;
  width: auto;
  z-index: 1001;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 30px;
}

.nav-item {
  position: relative;
}

.nav-link {
  text-decoration: none;
  font-weight: 500;
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 10px 0;
  transition: color 0.3s ease;
  cursor: pointer;
  display: block;
}

.nav-item::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background-color: #f14d34;
  transition: all 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

/* Dropdown Styles */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.has-dropdown:hover .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.has-dropdown .nav-link {
  position: relative;
  padding-right: 25px;
}

.has-dropdown .nav-link::after {
  content: "▼";
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  opacity: 0.7;
  transition: transform 0.3s ease;
}

.has-dropdown:hover .nav-link::after {
  transform: translateY(-50%) rotate(180deg);
}

.dropdown-list {
  list-style: none;
  margin: 0;
  padding: 10px 0;
  background: #f14d34;
  border-radius: 4px;
}

.dropdown-item {
  margin: 0;
}

.dropdown-link {
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: #fff;
  font-size: 14px;
  transition: all 0.3s ease;
}

.dropdown-link:hover {
  background: #d4442e;
}

/* Бургер-меню */
.burger-menu {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 5px;
  z-index: 1001;
  transition: transform 0.3s ease;
}

.burger-menu span {
  width: 25px;
  height: 3px;
  background: #fff;
  margin: 3px 0;
  transition: all 0.3s ease;
  border-radius: 2px;
  transform-origin: center;
}

/* Анимация бургер-меню в активном состоянии */
.burger-menu-active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.burger-menu-active span:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.burger-menu-active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile responsiveness */
@media (max-width: 1200px) {
  .burger-menu {
    display: flex;
  }

  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(2, 3, 11, 0.601);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 300ms ease;
    height: 0;
    overflow: hidden;
  }

  .nav-active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
    height: auto;
    min-height: 100vh;
  }

  .nav-list {
    flex-direction: column;
    gap: 0;
    padding: 20px;
  }

  .nav-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-item:last-child {
    border-bottom: none;
  }

  .nav-link {
    padding: 15px 0;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* Dropdown для мобильных */
  .dropdown {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    background: transparent;
    margin-left: 0;
    margin-top: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .dropdown-active {
    max-height: 200px;
  }

  .dropdown-list {
    background: transparent;
    box-shadow: none;
    padding: 0;
    margin-top: 10px;
  }

  .dropdown-item {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .dropdown-link {
    padding: 10px 0 10px 20px;
    font-size: 14px;
    opacity: 0.8;
    display: block;
  }

  .dropdown-link:hover {
    background: transparent;
    opacity: 1;
  }

  /* Стрелка для dropdown на мобильных */
  .has-dropdown .nav-link::after {
    content: "▶";
    transition: transform 0.3s ease;
    position: static;
    transform: none;
    opacity: 1;
  }

  .dropdown-active .nav-link::after {
    transform: rotate(90deg);
  }

  /* Отключаем hover эффекты на мобильных */
  .has-dropdown:hover .dropdown {
    opacity: 1;
    visibility: visible;
    transform: none;
  }
}

/* Дополнительные стили для активного состояния */
@media (min-width: 1200px) {
  .nav {
    display: flex !important;
  }
  
  .burger-menu {
    display: none !important;
  }
}
</style>