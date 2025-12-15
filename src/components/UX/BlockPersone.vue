<template>
  <div class="container-persone">
    <div class="container-our-persone">
      <h2>Наши профессиональные разработчики выполняют быстро любые задачи</h2>
      <div class="persone-info-group">
        <div v-for="(item, index) in personeInfoGroup" :key="index" class="persone-info-item">
          <div class="svg">
            <div class="svg-overlay">
              <img
                src="../../assets/svg/overlay-drupal.svg"
                alt="overlay-drupal"
              />
            </div>
            <img :src="item.image" alt="svg" />
          </div>
          <div class="info">
            <h4>{{ item.title }}</h4>
            <span>{{ item.description }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container-team">
      <h2 class="team-title">Команда</h2>
      <div class="team">
        <div v-for="(item, index) in personeTeamGroup" :key="index" class="team-card">
          <div class="photo">
            <img :src="item.image" :alt="item.name" />
          </div>
          <div class="description">
            <b>{{ item.name }}</b>
            <span>{{ item.description }}</span>
          </div>
        </div>
      </div>
      <button class="btn-team">Вся команда</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import competency20 from "@/assets/svg/competency-20.svg";
import competency21 from "@/assets/svg/competency-21.svg";
import competency22 from "@/assets/svg/competency-22.svg";

// Для изображений используем require или публичные пути
// Если изображения в public/img/
import persone1 from "@/assets/img/IMG_2472_0.jpg";
import persone2 from "@/assets/img/IMG_2474_1.jpg";
import persone3 from "@/assets/img/IMG_2522_0.jpg";
import persone4 from "@/assets/img/IMG_2539_0.jpg";
import persone5 from "@/assets/img/IMG_9971_16.jpg";

interface InfoType {
    title: string,
    description: string,
    image: string
}

interface TeamType {
    name: string,
    description: string,
    image: string
}

export default defineComponent({
  name: "BlockPersone",
  setup() {
    const personeInfoGroup = [
      {
        title: "Аналитик",
        description: "Собирает требования к сайту, составляет ТЗ для разработки, оптимизирует работы по разработке",
        image: competency20,
      },
      {
        title: "Дизайнер",
        description: "Проектирует структуру сайта, разрабатывает интерфейсы и готовит макеты для разработки",
        image: competency21,
      },
      {
        title: "Разработчик",
        description: "Верстает, программирует и тестирует сайт, интегрирует с системами и CMS",
        image: competency22,
      },
    ] as InfoType[];

    const personeTeamGroup = [
      {
        name: "Сергей Синица",
        description: "Руководитель отдела веб-разработки, канд. техн. наук, заместитель директора",
        image: persone1,
      },
      {
        name: "Роман Агабеков",
        description: "Руководитель отдела DevOPS, директор",
        image: persone2,
      },
      {
        name: "Алексей Синица",
        description: "Руководитель отдела поддержки сайтов",
        image: persone3,
      },
      {
        name: "Дария Бочкарева",
        description: "Руководитель отдела продвижения, контекстной рекламы и контент поддержки сайтов",
        image: persone4,
      },
      {
        name: "Ирина Торкунова",
        description: "Менеджер по работе с клиентами",
        image: persone5,
      },
    ] as TeamType[];

    return {
        personeInfoGroup,
        personeTeamGroup
    }
  },
});
</script>

<style scoped>
.container-persone {
  background: #ffffff;
  padding: 80px 0;
  position: relative;
}

.container-our-persone {
  max-width: 1200px;
  margin: 0 auto 80px auto;
  padding: 0 20px;
  text-align: left;
}

.container-our-persone h2 {
  font-size: 42px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 60px;
  line-height: 1.3;
  width: 60%;
}

.persone-info-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 60px;
}

.persone-info-item {
  background: #fafafa;
  border-radius: 4px;
  padding: 40px 30px;
  box-shadow: none;
  border: 1px solid #eeeeee;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.persone-info-item:hover {
  transform: none;
  box-shadow: none;
  border-color: #dddddd;
}

.svg {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 25px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-overlay {
  position: absolute;
  top: 60%;
  left: 10%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.svg-overlay img {
  width: 120px;
  height: 120px;
}

.svg img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  position: relative;
  z-index: 2;
}

.info h4 {
  font-size: 22px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 15px;
  text-align: center;
}

.info span {
  font-size: 16px;
  line-height: 1.6;
  color: #666666;
  text-align: center;
  display: block;
}

/* Блок "Команда" как на скриншоте */
.container-team {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: left;
}

.team-title {
  font-size: 42px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 50px;
  text-align: center;
}

.team {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  margin-bottom: 50px;
}

.team-card {
  background: #ffffff;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  transition: none;
  position: relative;
  overflow: hidden;
  text-align: center;
  border: none;
}

.team-card:hover {
  transform: none;
  box-shadow: none;
}

.team-card::before {
  display: none;
}

.photo {
  width: 220px;
  height: 220px;
  margin: 0 auto 15px auto;
  border-radius: 0%;
  overflow: hidden;
  border: none;
  box-shadow: none;
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.description b {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 5px;
  line-height: 1.3;
}

.description span {
  font-size: 14px;
  color: #888888;
  line-height: 1.4;
  display: block;
}

.btn-team {
  background-colour: #000000;
  color: #575656ff;
  border: 1px solid #dddddd;
  padding: 12px 35px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 50px auto 0 auto;
  text-align: center;
  box-shadow: none;
}

.btn-team:hover {
  background: #e6e6e6;
  transform: none;
  box-shadow: none;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .team {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
  
  .container-our-persone h2,
  .team-title {
    font-size: 36px;
  }
}

@media (max-width: 768px) {
  .container-persone {
    padding: 60px 0;
  }
  
  .container-our-persone h2,
  .team-title {
    font-size: 28px;
    margin-bottom: 40px;
    width: 100%;
    text-align: center;
  }
  
  .persone-info-group {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 40px;
  }
  
  .persone-info-item {
    padding: 30px 20px;
  }
  
  .team {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
  
  .photo {
    width: 100px;
    height: 100px;
  }
  
  .btn-team {
    margin-top: 40px;
  }
}

@media (max-width: 576px) {
  .container-persone {
    padding: 40px 0;
  }
  
  .container-our-persone h2,
  .team-title {
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  .persone-info-group {
    gap: 15px;
  }
  
  .team {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 300px;
    margin: 0 auto 30px auto;
  }
  
  .btn-team {
    padding: 10px 25px;
    font-size: 14px;
    margin-top: 30px;
  }
  
  .description b {
    font-size: 15px;
  }
  
  .description span {
    font-size: 13px;
  }
}
</style>