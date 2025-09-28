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
      <h2>Команда</h2>
      <div class="team">
        <div v-for="(item, index) in personeTeamGroup" :key="index" class="team-card">
          <div class="photo">
            <img :src="item.image" alt="photo" />
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
        name: "Алексей Воробьев",
        description: "Руководитель отдела веб-разработки",
        image: persone1,
      },
      {
        name: "Мария Иванова",
        description: "Старший разработчик Drupal",
        image: persone2,
      },
      {
        name: "Дмитрий Петров",
        description: "Frontend разработчик",
        image: persone3,
      },
      {
        name: "Елена Сидорова",
        description: "UX/UI дизайнер",
        image: persone4,
      },
      {
        name: "Сергей Козлов",
        description: "Системный администратор",
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
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 100px 0;
  position: relative;
}

.container-our-persone {
  max-width: 1200px;
  margin: 0 auto 80px auto;
  padding: 0 20px;
  text-align: left;
}

.container-our-persone h2 {
  font-size: 36px;
  font-weight: 700;
  color: #2d3748;
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
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.persone-info-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
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
  color: #f14d34;
  margin-bottom: 15px;
  text-align: center;
}

.info span {
  font-size: 16px;
  line-height: 1.6;
  color: #4a5568;
  text-align: center;
  display: block;
}

.container-team {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.container-team h2 {
  font-size: 36px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 50px;
}

.team {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.team-card {
  background: white;
  border-radius: 15px;
  padding: 30px 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.team-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #f14d34, #ff6b4a);
}

.photo {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px auto;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #f8f9fa;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.description b {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
}

.description span {
  font-size: 14px;
  color: #718096;
  line-height: 1.5;
}

.btn-team {
  background: linear-gradient(135deg, #f14d34, #ff6b4a);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(241, 77, 52, 0.3);
}

.btn-team:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(241, 77, 52, 0.4);
  background: linear-gradient(135deg, #e0452d, #ff5a3d);
}

/* Адаптивность */
@media (max-width: 768px) {
  .container-persone {
    padding: 60px 0;
  }
  
  .container-our-persone h2,
  .container-team h2 {
    font-size: 28px;
    margin-bottom: 40px;
  }
  
  .persone-info-group {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-top: 40px;
  }
  
  .persone-info-item {
    padding: 30px 20px;
  }
  
  .team {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .photo {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 480px) {
  .container-persone {
    padding: 40px 0;
  }
  
  .container-our-persone h2,
  .container-team h2 {
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  .persone-info-group {
    gap: 20px;
  }
  
  .team {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .btn-team {
    padding: 12px 30px;
    font-size: 14px;
  }
}
</style>