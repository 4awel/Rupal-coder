<template>
  <div class="container-support">
    <h2>Поддержка от Drupal-coder</h2>
    <div class="group-item-support">
      <div v-for="(item, index) in groupItemSupport" :key="index" class="item-support">
        <span class="numbering">{{ '0' + (index + 1) }}</span>
        <div class="text-support">
          <h3 class="item-title">{{ item.title }}</h3>
          <span class="item-info">{{ item.description }}</span>
        </div>
        <img class="item-image" :src="item.image" :alt="'support-svg-' + index" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import support1 from '@/assets/svg/support1.svg';
import support2 from '@/assets/svg/support2.svg';
import support3 from '@/assets/svg/support3.svg';
import support4 from '@/assets/svg/support4.svg';
import support5 from '@/assets/svg/support5.svg';
import support6 from '@/assets/svg/support6.svg';
import support7 from '@/assets/svg/support7.svg';
import support8 from '@/assets/svg/support8.svg';

interface GroupItemSupportType {
    title: string,
    description: string,
    image: string
}
export default defineComponent({
  name: 'BlockHeaderAboutInfo',
  setup() {
    const groupItemSupport = [
      {
        title: "Постановка задачи по Email",
        description: "Удобная и привычная модель постановки задач, при которой задачи фиксируются и никогда не теряются.",
        image: support1,
      },
      {
        title: "Система Helpdesk – отчетность, прозрачность",
        description: "Возможность посмотреть все заявки в работе и отработанные часы в личном кабинете через браузер.",
        image: support2,
      },
      {
        title: "Расширенная техническая поддержка",
        description: "Возможность организации расширенной техподдержки с 6:00 до 22:00 без выходных.",
        image: support3,
      },
      {
        title: "Персональный менеджер проекта",
        description: "Ваш менеджер проекта всегда в курсе текущего состояния проекта и в любой момент готов ответить на любые вопросы.",
        image: support4,
      },
      {
        title: "Удобные способы оплаты",
        description: "Безналичный расчет по договору или электронные деньги: WebMoney, Яндекс.Деньги, Paypal.",
        image: support5,
      },
      {
        title: "Работаем с SLA и NDA",
        description: "Работа в рамках соглашений о конфиденциальности и об уровне качества работ.",
        image: support6,
      },
      {
        title: "Штатные специалисты",
        description: "Надежные штатные специалисты, никаких фрилансеров.",
        image: support7,
      },
      {
        title: "Удобные каналы связи",
        description: "Консультации по телефону, скайпу, в месенджерах.",
        image: support8,
      },
    ] as GroupItemSupportType[];

    return {
        groupItemSupport
    }
  },
});
</script>

<style scoped>
.container-support {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.container-support h2 {
  text-align: center;
  font-size: 42px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 60px;
  position: relative;
}

.container-support h2::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: #f14d34;
  border-radius: 2px;
}

.group-item-support {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.item-support {
  display: flex;
  align-items: flex-start;
  background: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.item-support::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #f14d34;
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.item-support:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.item-support:hover::before {
  transform: scaleY(1);
}

.numbering {
  font-size: 64px;
  font-weight: 900;
  color: #f14d34;
  opacity: 0.1;
  position: absolute;
  top: 10px;
  right: 30px;
  line-height: 1;
  transition: opacity 0.3s ease;
}

.item-support:hover .numbering {
  opacity: 0.2;
}

.text-support {
  flex: 1;
  margin-right: 20px;
}

.item-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
  line-height: 1.3;
}

.item-info {
  font-size: 14px;
  color: #6c757d;
  line-height: 1.6;
  display: block;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.item-support:hover .item-image {
  transform: scale(1.1);
}

/* Адаптивность для планшетов */
@media (max-width: 1024px) {
  .group-item-support {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .container-support h2 {
    font-size: 36px;
  }
}

/* Адаптивность для мобильных */
@media (max-width: 768px) {
  .container-support {
    padding: 60px 20px;
  }
  
  .container-support h2 {
    font-size: 28px;
    margin-bottom: 40px;
  }
  
  .item-support {
    padding: 20px;
    flex-direction: column;
    text-align: center;
  }
  
  .text-support {
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .item-title {
    font-size: 18px;
  }
  
  .item-info {
    font-size: 13px;
  }
  
  .item-image {
    width: 50px;
    height: 50px;
    align-self: center;
  }
  
  .numbering {
    position: relative;
    top: 0;
    right: 0;
    font-size: 48px;
    margin-bottom: 10px;
  }
}

/* Адаптивность для маленьких мобильных */
@media (max-width: 480px) {
  .container-support {
    padding: 40px 15px;
  }
  
  .container-support h2 {
    font-size: 24px;
  }
  
  .item-support {
    padding: 15px;
  }
  
  .item-title {
    font-size: 16px;
  }
  
  .item-info {
    font-size: 12px;
  }
  
  .numbering {
    font-size: 36px;
  }
}

/* Анимация при появлении элементов */
.item-support {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
}

.item-support:nth-child(1) { animation-delay: 0.1s; }
.item-support:nth-child(2) { animation-delay: 0.2s; }
.item-support:nth-child(3) { animation-delay: 0.3s; }
.item-support:nth-child(4) { animation-delay: 0.4s; }
.item-support:nth-child(5) { animation-delay: 0.5s; }
.item-support:nth-child(6) { animation-delay: 0.6s; }
.item-support:nth-child(7) { animation-delay: 0.7s; }
.item-support:nth-child(8) { animation-delay: 0.8s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>