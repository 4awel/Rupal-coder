<template>
  <div class="container-case">
    <h2>Последние кейсы</h2>
    <div class="grid-case">
      <!-- Первая строка -->
      <div class="case-item case-item-40 case-image-top">
        <div class="case-image">
          <img src="../../assets//img/image-copy.png" alt="Кейс 1">
        </div>
        <div class="case-content">
          <h3>Корпоративный портал</h3>
          <p>Разработка комплексного решения для управления бизнес-процессами крупной компании</p>
        </div>
      </div>
      
      <div class="case-item case-item-60 case-text-overlay">
        <div class="case-image">
          <img src="../../assets//img/image-copy-2.png" alt="Кейс 2">
        </div>
        <div class="case-content">
          <h3>Интернет-магазин премиум класса</h3>
          <p>Создание высоконагруженного маркетплейса с интеграцией платежных систем и CRM</p>
        </div>
      </div>

      <!-- Вторая строка -->
      <div class="case-item case-item-33 case-text-overlay">
        <div class="case-image">
          <img src="../../assets/img/image-copy-4.png" alt="Кейс 3">
        </div>
        <div class="case-content">
          <h3>Образовательная платформа</h3>
          <p>Онлайн-курсы с системой тестирования и сертификации</p>
        </div>
      </div>
      
      <div class="case-item case-item-33 case-text-overlay">
        <div class="case-image">
          <img src="../../assets/img/image-copy-5.png" alt="Кейс 4">
        </div>
        <div class="case-content">
          <h3>Медицинский портал</h3>
          <p>Система записи к врачам и онлайн-консультаций</p>
        </div>
      </div>
      
      <div class="case-item case-item-33 case-image-top">
        <div class="case-image">
          <img src="../../assets/img/image-copy-6.png" alt="Кейс 5">
        </div>
        <div class="case-content">
          <h3>Блог платформа</h3>
          <p>Создание современной издательской системы с мультимедиа</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BlockLastCase',
  setup() {
    return {
      // Здесь можно добавить данные кейсов, если нужно динамическое наполнение
    };
  }
})
</script>

<style scoped>
.container-case {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
}

.container-case h2 {
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 50px;
}

.grid-case {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-auto-rows: auto;
  gap: 30px;
}

.case-item {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: white;
}

.case-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.case-image-top {
  display: flex;
  flex-direction: column;
}

.case-text-overlay {
  position: relative;
}

.case-text-overlay .case-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  /* color: white; */
  padding: 30px 20px 20px 20px;
}

.case-image {
  width: auto;
  height: 100%;
  overflow: hidden;
}

.case-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.case-item:hover .case-image img {
  transform: scale(1.05);
}

.case-content {
  padding: 25px 20px;
}

.case-text-overlay .case-content {
  padding: 30px 20px 20px 20px;
}

.case-content h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  color: inherit;
}

.case-text-overlay .case-content h3 {
  color: white;
}

.case-content p {
  font-size: 14px;
  line-height: 1.5;
  color: #718096;
  margin-bottom: 15px;
}

.case-text-overlay .case-content p {
  color: rgba(255, 255, 255, 0.9);
}

.case-tag {
  display: inline-block;
  padding: 5px 12px;
  background: #f14d34;
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

/* Стили для второй строки */
.grid-case > .case-item:nth-child(n+3) {
  grid-column: span 1;
}

.case-item-40 {
  grid-column: 40%;
}

.case-item-60 {
  grid-column: 60%;
}

.case-item-33 {
  grid-column: span 1;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .grid-case {
    grid-template-columns: 1fr 1fr;
  }
  
  .case-item-40,
  .case-item-60,
  .case-item-33 {
    grid-column: span 1;
  }
  
  .grid-case > .case-item:nth-child(1) {
    grid-column: 1 / -1;
  }
  
  .grid-case > .case-item:nth-child(2) {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .container-case {
    padding: 60px 15px;
  }
  
  .container-case h2 {
    font-size: 28px;
    margin-bottom: 30px;
  }
  
  .grid-case {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .case-image {
    height: 250px;
  }
  
  .case-content {
    padding: 20px 15px;
  }
  
  .case-text-overlay .case-content {
    padding: 25px 15px 15px 15px;
  }
  
  .case-content h3 {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .container-case {
    padding: 40px 10px;
  }
  
  .container-case h2 {
    font-size: 24px;
  }
  
  .case-image {
    height: 200px;
  }
}

/* Альтернативный вариант grid для второй строки */
@media (min-width: 1025px) {
  .grid-case {
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: auto auto;
    gap: 30px;
  }
  
  .case-item:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }
  
  .case-item:nth-child(2) {
    grid-column: 2;
    grid-row: 1;
  }
  
  .case-item:nth-child(3) {
    grid-column: 1;
    grid-row: 2;
  }
  
  .case-item:nth-child(4) {
    grid-column: 2;
    grid-row: 2;
  }
  
  .case-item:nth-child(5) {
    grid-column: 3;
    grid-row: 2;
    grid-column: 1 / span 2;
  }
}

/* Исправленный grid для правильного отображения */
.grid-case {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-areas: 
    "item1 item2"
    "item3 item4 item5";
  gap: 30px;
}

.case-item:nth-child(1) {
  grid-area: item1;
}

.case-item:nth-child(2) {
  grid-area: item2;
}

.case-item:nth-child(3) {
  grid-area: item3;
}

.case-item:nth-child(4) {
  grid-area: item4;
}

.case-item:nth-child(5) {
  grid-area: item5;
}

/* Для трех колонок во второй строке */
@media (min-width: 1025px) {
  .grid-case {
    grid-template-columns: 40% 60%;
    grid-template-rows: auto auto;
    grid-template-areas: 
      "item1 item2"
      "item3 item4 item5";
  }
  
  .case-item:nth-child(5) {
    grid-column: 3;
    grid-row: 2;
  }
}

/* Упрощенное решение для трех колонок */
@media (min-width: 1025px) {
  .grid-case {
    display: grid;
    grid-template-columns: 40% 30% 30%;
    grid-template-rows: 400px 350px;
    gap: 30px;
  }
  
  .case-item:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }
  
  .case-item:nth-child(2) {
    grid-column: 2 / span 2;
    grid-row: 1;
  }
  
  .case-item:nth-child(3) {
    grid-column: 1;
    grid-row: 2;
  }
  
  .case-item:nth-child(4) {
    grid-column: 2;
    grid-row: 2;
  }
  
  .case-item:nth-child(5) {
    grid-column: 3;
    grid-row: 2;
  }
}

/* Финальное решение grid */
.grid-case {
  display: grid;
  grid-template-columns: 40% 30% 30%;
  grid-template-rows: 400px 350px;
  gap: 30px;
}

.case-item:nth-child(1) {
  grid-column: 1;
  grid-row: 1;
  height: 400px;
}

.case-item:nth-child(2) {
  grid-column: 2 / span 2;
  grid-row: 1;
  height: 400px;
}

.case-item:nth-child(3) {
  grid-column: 1;
  grid-row: 2;
  height: 350px;
}

.case-item:nth-child(4) {
  grid-column: 2;
  grid-row: 2;
  height: 350px;
}

.case-item:nth-child(5) {
  grid-column: 3;
  grid-row: 2;
  height: 350px;
}

/* Адаптивность для финального решения */
@media (max-width: 1024px) {
  .grid-case {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: 
      "item1 item2"
      "item3 item4"
      "item5 item5";
  }
  
  .case-item {
    height: auto !important;
    min-height: 300px;
  }
  
  .case-item:nth-child(1) { grid-area: item1; }
  .case-item:nth-child(2) { grid-area: item2; }
  .case-item:nth-child(3) { grid-area: item3; }
  .case-item:nth-child(4) { grid-area: item4; }
  .case-item:nth-child(5) { grid-area: item5; }
}

@media (max-width: 768px) {
  .grid-case {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "item1"
      "item2"
      "item3"
      "item4"
      "item5";
  }
}
</style>