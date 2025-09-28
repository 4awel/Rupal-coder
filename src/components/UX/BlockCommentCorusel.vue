<template>
  <div class="container-comment">
    <div class="overlay">
      <img src="../../assets/svg/sign.svg" alt="overlay" />
      <img src="../../assets/svg/sign.svg" alt="overlay" />
    </div>
    <h2>Отзывы</h2>
    <div class="elements-comments">
      <div class="element">
        <div class="element-content">
          <img
            class="logo"
            :src="currentComment.logo"
            :alt="currentComment.phrase"
          />
          <p class="description">{{ currentComment.description }}</p>
          <span class="phrase-company">
            <span class="phrase">{{ currentComment.phrase }}</span>
            <a
              v-if="currentComment.link"
              class="link-site-company"
              :href="currentComment.link"
              target="_blank"
            >
              Перейти на сайт
            </a>
          </span>
        </div>
        <hr />
        <div class="menu-toggler">
          <span id="back" @click="prevSlide">‹</span>
          <span class="current-slide"
            >{{ formattedCurrentSlide }}/0{{ totalSlides }}</span
          >
          <span id="next" @click="nextSlide">›</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import logo1 from "@/assets/img/logo_0.png";
import logo2 from "@/assets/img/logo_1.png";
import logo3 from "@/assets/img/logo_2.png";
import logo4 from "@/assets/img/logo_3.jpg";
import logo5 from "@/assets/img/logo_4.png";
import logo6 from "@/assets/img/logo_5.png";
import logo7 from "@/assets/img/logo_6.jpg";
import logo8 from "@/assets/img/logo_7.png";

interface CommentType {
  logo?: string;
  description: string;
  phrase: string;
  link?: string;
}

export default defineComponent({
  name: "BlockCommentCorusel",
  setup() {
    const elementComment = [
      {
        logo: logo1,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis.",
        phrase:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, repellat?",
        link: "https://ciel.parfum.ru",
      },
      {
        logo: logo2,
        description:
          "Второй отзыв: Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis.",
        phrase: "Второй urtconsequuntur  Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. ",
        link: "https://ciel.parfum.ru",
      },
      {
        logo: logo3,
        description:
          "Третий отзыв: Lorem ipsumLorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis.  dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae!",
        phrase: "Отличное качество продукции",
        link: "https://ciel.parfum.ru",
      },
      {
        logo: logo4,
        description:
          "Четвертый отзыв: Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. ipsum dolor sit amet consectetur adipisicing elit.",
        phrase: "Быстрая доставка и вежливый персонал",
        link: "https://ciel.parfum.ru",
      },
      {
        logo: logo5,
        description:
          "Пятый отзыв: Minus, adipisciLorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis.  vitae! Molestias harum repudiandae illum molestiae.",
        phrase: "Рекомендую всем друзьям",
        link: "https://ciel.parfum.ru",
      },
      {
        logo: logo6,
        description:
          "Шестой отзыв: Dignissimos Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. facere error recusandae molestiae saepe reprehenderit.",
        phrase: "Лучшее соотношение цены и качества",
        link: "https://ciel.parfum.ru",
      },
      {
        logo: logo7,
        description:
          "Седьмой отзыв: ImpeditLorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis.  temporibus, voluptates eos accusantium architecto delectus.",
        phrase: "Профессиональный подход к работе",
        link: "https://ciel.parfum.ru",
      },
      {
        logo: logo8,
        description:
          "Восьмой отзыв: Totam, Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, adipisci vitae! Molestias harum repudiandae illum molestiae suscipit perferendis architecto laboriosam explicabo dicta iure reprehenderit recusandae, nobis qui corrupti! Asperiores voluptas commodi quis doloribus, autem magnam numquam a expedita, repudiandae molestias consequuntur cumque, nemo libero? Dignissimos facere error recusandae molestiae saepe reprehenderit ab praesentium voluptatum ex vitae obcaecati quo voluptates quam aliquam nobis eaque voluptate sapiente asperiores illum, qui distinctio omnis! Totam, asperiores qui. Qui eaque, aut officia cupiditate repudiandae doloremque debitis. Impedit temporibus, voluptates eos accusantium architecto delectus recusandae optio consectetur repudiandae reprehenderit rerum, dignissimos cum voluptatem, harum libero corporis. asperiores qui. Qui eaque, aut officia cupiditate repudiandae.",
        phrase: "Будем сотрудничать снова",
        link: "https://ciel.parfum.ru",
      },
    ] as CommentType[];

    const currentSlide = ref(0);
    const totalSlides = elementComment.length;

    const currentComment = computed(() => elementComment[currentSlide.value]);

    const formattedCurrentSlide = computed(() => {
      return (currentSlide.value + 1).toString().padStart(2, "0");
    });

    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % totalSlides;
    };

    const prevSlide = () => {
      currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides;
    };

    // Автопереключение слайдов каждые 5 секунд
    setInterval(nextSlide, 5000);

    return {
      elementComment,
      currentComment,
      formattedCurrentSlide,
      totalSlides,
      nextSlide,
      prevSlide,
    };
  },
});
</script>

<style scoped>
.container-comment {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
}

h2 {
  margin-top: 100px;
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
}

.element {
  background: #fff;
  margin-top: 100px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 50px 80px;
  transition: transform 0.3s ease;
  display: flex;
}

/* Исправленный оверлей - слева сверху */
.overlay {
  position: absolute;
  top: 0; /* Сверху */
  left: 0; /* Слева */
  z-index: -1;
  display: flex;
  gap: 20px;
}

.overlay img {
  height: 300px; /* Уменьшил размер для лучшего размещения */
  opacity: 0.05;
  margin: 0; /* Убрал отступы */
}

.element:hover {
  transform: translateY(-5px);
}

.element-content {
  /* text-align: center; */
}

.logo {
  width: 100px;
  height: 40px;
  object-fit: contain;
  margin: 0 auto 20px;
  background: #f5f5f5;
  padding: 10px;
}

.description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1rem;
  height: 400px;
  overflow-y: auto;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 5px;
}

.phrase-company {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  margin-top: 20px;
}

.phrase {
  font-style: italic;
  color: #333;
  font-weight: 500;
}

.link-site-company {
  color: #f14d34;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.link-site-company:hover {
  color: #cf432e;
  text-decoration: underline;
}

hr {
  background: #b5b5b5;
  margin-left: 30px;
  margin-right: 60px;
}

.menu-toggler {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 1.2rem;
}

#back,
#next {
  cursor: pointer;
  user-select: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f0f0f0;
  transition: all 0.3s ease;
  font-weight: bold;
}

#back:hover,
#next:hover {
  background: #f14d34;
  color: white;
  transform: scale(1.1);
}

.current-slide {
  font-weight: 600;
  color: #333;
  min-width: 50px;
  text-align: center;
}

/* Анимация перехода слайдов */
.element-content {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
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
  .container-comment {
    padding: 20px 15px;
  }

  .element {
    padding: 20px;
    flex-direction: column;
  }

  hr {
    margin: 40px 0;
  }

  /* Адаптация оверлея для мобильных */
  .overlay {
    top: 50px;
    left: -20px;
    flex-direction: column;
    gap: 10px;
  }

  .overlay img {
    height: 150px;
  }

  .description {
    font-size: 0.9rem;
    max-height: 600px;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 80px; /* Уменьшил отступ для мобильных */
  }

  .menu-toggler {
    gap: 15px;
    margin: 0 0 30px 0;
  }
}

@media (max-width: 480px) {
  .element {
    padding: 15px;
  }

  .overlay {
    top: 30px;
    left: -10px;
  }

  .overlay img {
    height: 120px;
  }

  .description {
    font-size: 0.85rem;
    max-height: 1000px;
  }

  .logo {
    width: 60px;
    height: 60px;
  }

  h2 {
    margin-top: 60px;
    font-size: 1.5rem;
  }
}

/* Дополнительные стили для лучшего отображения оверлея */
@media (min-width: 1200px) {
  .overlay {
    top: -50px;
    left: -50px;
  }
  
  .overlay img {
    height: 400px;
  }
}

@media (min-width: 1600px) {
  .overlay {
    top: -100px;
    left: -100px;
  }
  
  .overlay img {
    height: 500px;
  }
}
</style>