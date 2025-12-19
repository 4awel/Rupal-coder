<template>
  <div class="container-tarif">
    <div class="svg-overlay">
      <img src="../../assets/img/image.png" alt="overlay-drupal" />
    </div>
    <div class="container">
      <h2>Тарифы</h2>
      <div class="tarifs">
        <div 
          v-for="(item, index) in tarifComponents" 
          :key="index" 
          :class="{
            'tarif-item': true,
            'tarif-item--main': item.isMain,
            'tarif-item--secondary': !item.isMain
          }"
        >
          <div v-if="item.isMain" class="tarif-badge">Популярный</div>
          <h4>{{ item.title }}</h4>
          <hr />
          <div class="tarif-features">
            <div v-for="(comp, featureIndex) in item.content" :key="featureIndex" class="feature-item">
              <span class="feature-icon">✓</span>
              <span class="feature-text">{{ comp.text }}</span>
            </div>
          </div>
          <div class="tarif-button">
            <ButtonTypeBould @click="openModalActive" style="width: 100%;" v-if="item.isMain">СВЯЖИТЕСЬ С НАМИ!</ButtonTypeBould>
            <ButtonTypeOpasyti @click="openModalActive"  style="width: 100%;" v-else>СВЯЖИТЕСЬ С НАМИ!</ButtonTypeOpasyti>
          </div>
        </div>
      </div>
      <div class="tarif-info">
        <span class="info-text">
          Вам не подходят наши тарифы? Оставьте заявку и мы предложим вам индивидуальные условия!
        </span>
        <a href="#" class="info-link">ПОЛУЧИТЬ ИНДИВИДУАЛЬНЫЙ ТАРИФ</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
interface ContentType {
  text: string;
}

interface ComponentType {
  title: string;
  content: ContentType[];
  isMain: boolean;
  price?: string;
  period?: string;
}

export default defineComponent({
  name: "BlockTarif",
  setup() {
    const store = useStore();
    const openModalActive = () => {
      store.commit("SET_MODAL_OPEN", true);
    }
    const tarifComponents: ComponentType[] = [
      {
        title: "Стартовый",
        content: [
          { text: "До 5 проектов" },
          { text: "Базовая техническая поддержка" },
          { text: "Обновления 1 раз в месяц" },
          { text: "Email поддержка" },
        ],
        isMain: false,
      },
      {
        title: "Бизнес",
        content: [
          { text: "До 20 проектов" },
          { text: "Приоритетная техническая поддержка" },
          { text: "Еженедельные обновления" },
          { text: "Поддержка 24/7" },
          { text: "До 100 GB хранилища" },
        ],
        isMain: true,
      },
      {
        title: "VIP",
        content: [
          { text: "Неограниченное количество проектов" },
          { text: "Персональный менеджер" },
          { text: "Ежедневные обновления" },
          { text: "Поддержка высшего приоритета" },
          { text: "Неограниченное хранилище" },
        ],
        isMain: false,
      },
    ];

    return {
      tarifComponents,
      openModalActive
    };
  },
});
</script>

<style scoped>

.container-tarif {
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #afafaf 100%);
  padding: 100px 0;
  overflow: visible; /* Меняем на visible */
  display: flex;
  align-items: center;
  z-index: 1; /* Добавляем явный z-index */
}

.svg-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
  pointer-events: none;
  z-index: 1; /* Добавляем z-index */
}

.svg-overlay img {
  width: auto;
  height: 100%;
  object-fit: cover;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
  width: 100%;
}

.container h2 {
  text-align: center;
  color: #484848;
  font-size: 3rem;
  margin-top: 80px;
  margin-bottom: 100px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.tarifs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.tarif-item {
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  height: fit-content;
}

.tarif-item--main {
  transform: scale(1.05);
  border: 3px solid #ffd700;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.tarif-item--secondary {
  border: 2px solid #e9ecef;
}

.tarif-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

.tarif-item--main:hover {
  transform: scale(1.05) translateY(-10px);
}

.tarif-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #333;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}

.tarif-item h4 {
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 15px;
  color: #f14d32;
  background: linear-gradient(135deg, #ff2200, #ffd000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tarif-price {
  text-align: center;
  margin-bottom: 25px;
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
}

.period {
  font-size: 1rem;
  color: #718096;
  margin-left: 5px;
}

.tarif-item hr {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, #000000, transparent);
  margin: 20px 0;
  width: 100%;
}

.tarif-features {
  flex: 1;
  margin-bottom: 30px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  padding: 8px 0;
}

.feature-icon {
  color: #f14d32;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 12px;
  min-width: 20px;
  margin-top: 2px;
}

.feature-text {
  color: #4a5568;
  line-height: 1.5;
  font-size: 1rem;
}

.tarif-button {
  margin-top: auto;
  text-align: center;
}

.tarif-info {
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  padding: 40px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.info-text {
  display: block;
  color: #4a5568;
  font-size: 1.3rem;
  margin-bottom: 20px;
  line-height: 1.6;
  font-weight: 500;
}

.info-link {
  color: #4a5568;
  text-decoration: none;
  font-weight: 600;
  padding: 15px 40px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 30px;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
  font-size: 1rem;
  display: inline-block;
}

.info-link:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Адаптивность */
@media (max-width: 768px) {
  .container-tarif {
    padding: 300px 0;
  }
  
  .container h2 {
    font-size: 2.2rem;
    margin-bottom: 100px;
  }
  
  .tarifs {
    grid-template-columns: 1fr;
    gap: 25px;
    margin-bottom: 40px;
  }
  
  .tarif-item {
    padding: 30px 20px;
  }
  
  .tarif-item--main {
    transform: none;
    order: -1;
  }
  
  .tarif-item:hover,
  .tarif-item--main:hover {
    transform: translateY(-5px);
  }
  
  .price {
    font-size: 2rem;
  }
  
  .tarif-info {
    padding: 30px 20px;
  }
  
  .info-text {
    font-size: 1.1rem;
  }
  
  .info-link {
    padding: 12px 30px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  .container h2 {
    font-size: 1.8rem;
  }
  
  .tarif-item h4 {
    font-size: 1.5rem;
  }
  
  .price {
    font-size: 1.8rem;
  }
  
  .feature-text {
    font-size: 0.9rem;
  }
}
</style>