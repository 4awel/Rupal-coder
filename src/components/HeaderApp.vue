<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <img src="../assets/img/drupal-coder.svg" alt="Drupal Coder" />
      </div>

      <nav class="nav" :class="{ 'nav-active': isMobileMenuOpen }">
        <ul class="nav-list">
          <li
            v-for="(item, index) in filteredNavLinks"
            :key="index"
            class="nav-item"
            :class="{
              'has-dropdown': item.dropdown,
              'dropdown-active': activeDropdown === index,
              'auth-item': item.isAuth,
            }"
          >
            <span
              v-if="item.isAuth"
              class="nav-link auth-link"
              @click="handleAuthClick"
            >
              {{ item.title }}
            </span>
            <a
              v-else-if="item.link"
              :style="{ color: item.isLogin ? '#f47648' : '' }"
              :href="item.link"
              class="nav-link"
              @click="closeMobileMenu"
            >
              {{ item.title }}
            </a>
            <span v-else class="nav-link" @click="toggleDropdown(index)">
              {{ item.title }}
            </span>

            <div
              v-if="item.dropdown"
              class="dropdown"
              :class="{ 'dropdown-active': activeDropdown === index }"
            >
              <ul class="dropdown-list">
                <li
                  v-for="(opt, optIndex) in item.dropdown"
                  :key="optIndex"
                  class="dropdown-item"
                >
                  <a
                    :href="opt.link"
                    class="dropdown-link"
                    @click="closeMobileMenu"
                  >
                    {{ opt.title }}
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>

      <div
        class="burger-menu"
        :class="{ 'burger-menu-active': isMobileMenuOpen }"
        @click="toggleMobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div v-if="showUserMenu" class="user-dropdown" @click.stop>
      <div class="user-dropdown-content">
        <div class="user-info-dropdown">
          <div class="user-avatar">{{ getUserInitials }}</div>
          <div class="user-details">
            <div class="user-name-dropdown">{{ userName || userLogin }}</div>
            <div class="user-email-dropdown">{{ userEmail }}</div>
          </div>
        </div>
        <div class="dropdown-divider"></div>
        <button @click="handleLogout" class="logout-dropdown-btn">
          Выйти из аккаунта
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

interface DropdownType {
  title: string;
  link: string;
}

interface NavType {
  link?: string;
  title: string;
  dropdown?: DropdownType[];
  isLogin?: boolean;
  isAuth?: boolean;
}

export default defineComponent({
  name: "AppHeader",
  setup() {
    const store = useStore();
    const router = useRouter();

    const isMobileMenuOpen = ref(false);
    const activeDropdown = ref<number | null>(null);
    const showUserMenu = ref(false);

    const baseNavLinks: NavType[] = [
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

    const isAuthenticated = computed(
      () => store.getters["auth/isAuthenticated"],
    );
    const userLogin = computed(() => store.getters["auth/userLogin"]);
    const user = computed(() => store.getters["auth/user"]);

    const userName = computed(() => user.value?.name || "");
    const userEmail = computed(() => user.value?.email || "");

    const getUserInitials = computed(() => {
      if (userName.value) {
        return userName.value.charAt(0).toUpperCase();
      }
      if (userLogin.value) {
        return userLogin.value.charAt(0).toUpperCase();
      }
      return "U";
    });

    const filteredNavLinks = computed(() => {
      const links = [...baseNavLinks];

      if (isAuthenticated.value && userLogin.value) {
        links.push({
          title: userLogin.value,
          isAuth: true,
          link: "#",
        });
      }

      return links;
    });

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
      if (!isMobileMenuOpen.value) {
        activeDropdown.value = null;
      }
    };

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false;
      activeDropdown.value = null;
      showUserMenu.value = false;
    };

    const toggleDropdown = (index: number) => {
      const isMobile = window.innerWidth <= 1200;

      if (!isMobile) return;

      if (activeDropdown.value === index) {
        activeDropdown.value = null;
      } else {
        activeDropdown.value = index;
      }
    };

    const handleAuthClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (isAuthenticated.value) {
        // Если авторизован - показываем меню
        showUserMenu.value = !showUserMenu.value;
      } else {
        // Если не авторизован - переходим на страницу входа
        router.push("/login");
        closeMobileMenu();
      }
    };

    const handleLogout = async () => {
      try {
        await store.dispatch("auth/logout");
        showUserMenu.value = false;
        closeMobileMenu();
        router.push("/");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    // Закрываем меню при клике вне
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".nav") &&
        !target.closest(".burger-menu") &&
        !target.closest(".user-dropdown")
      ) {
        activeDropdown.value = null;
        showUserMenu.value = false;
      }
    };
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        showUserMenu.value = false;
        activeDropdown.value = null;
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    });

    return {
      filteredNavLinks,
      isMobileMenuOpen,
      activeDropdown,
      showUserMenu,
      isAuthenticated,
      userLogin,
      userName,
      userEmail,
      getUserInitials,
      toggleMobileMenu,
      closeMobileMenu,
      toggleDropdown,
      handleAuthClick,
      handleLogout,
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
  max-width: 1400px;
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

/* Стиль для пункта авторизации */
.auth-link {
  cursor: pointer;
  position: relative;
  padding-right: 20px;
}

.auth-link::after {
  content: "▼";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  opacity: 0.7;
  transition: transform 0.3s ease;
}

.nav-item::after {
  content: "";
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

/* Выпадающее меню пользователя */
.user-dropdown {
  position: absolute;
  top: 80px;
  right: 20px;
  width: 280px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  z-index: 2000;
  animation: slideDown 0.2s ease;
  overflow: hidden;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-dropdown-content {
  padding: 16px;
}

.user-info-dropdown {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f9d76e 0%, #fe4a2f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
}

.user-details {
  flex: 1;
}

.user-name-dropdown {
  font-weight: 600;
  color: #333;
  font-size: 14px;
  margin-bottom: 4px;
}

.user-email-dropdown {
  font-size: 12px;
  color: #666;
  word-break: break-all;
}

.dropdown-divider {
  height: 1px;
  background: #e0e0e0;
  margin: 12px 0;
}

.logout-dropdown-btn {
  width: 100%;
  padding: 10px;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #f14d34;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.logout-dropdown-btn:hover {
  background: #fee;
  transform: translateY(-1px);
}

.logout-icon {
  font-size: 16px;
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

  .user-dropdown {
    position: fixed;
    top: auto;
    bottom: 20px;
    left: 20px;
    right: 20px;
    width: auto;
  }

  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(2, 3, 11, 0.95);
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
    background: rgba(255, 255, 255, 0.1);
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

  .has-dropdown:hover .dropdown {
    opacity: 1;
    visibility: visible;
    transform: none;
  }
}

/* Десктопы */
@media (min-width: 1200px) {
  .nav {
    display: flex !important;
  }

  .burger-menu {
    display: none !important;
  }

  /* Ховер эффект для пункта авторизации */
  .auth-link:hover {
    color: #f47648;
  }
}
</style>
