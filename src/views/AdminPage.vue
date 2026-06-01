<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>👑 Панель администратора</h1>
      <div class="admin-info">
        <span>👤 {{ adminName || user?.name || 'Администратор' }}</span>
        <button @click="logout" class="btn-logout">🚪 Выйти</button>
      </div>
    </div>

    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>Загрузка данных...</p>
    </div>

    <div v-if="error" class="error-message">
      ⚠️ {{ error }}
    </div>

    <div v-if="!isLoading && !error" class="admin-content">
      <!-- Статистика -->
      <div class="stats-section">
        <h2>📊 Общая статистика</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <h3>Всего пользователей</h3>
              <div class="stat-number">{{ users.length }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">💻</div>
            <div class="stat-info">
              <h3>Языков программирования</h3>
              <div class="stat-number">{{ totalLanguages }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-info">
              <h3>Новых сегодня</h3>
              <div class="stat-number">{{ newUsersToday }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-info">
              <h3>Средний возраст</h3>
              <div class="stat-number">{{ averageAge }} лет</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Статистика по языкам -->
      <div class="languages-section">
        <h2>📈 Популярность языков программирования</h2>
        <div class="languages-grid">
          <div v-for="stat in languageStats" :key="stat.name" class="language-card">
            <div class="language-name">{{ stat.name }}</div>
            <div class="language-bar">
              <div class="language-fill" :style="{ width: stat.percentage + '%' }"></div>
            </div>
            <div class="language-count">{{ stat.count }} пользователей</div>
          </div>
        </div>
      </div>

      <!-- Таблица пользователей -->
      <div class="users-section">
        <div class="users-header">
          <h2>👥 Управление пользователями</h2>
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="🔍 Поиск по имени, email или телефону..."
              class="search-input"
            >
          </div>
        </div>

        <div class="table-wrapper">
          <table class="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ФИО</th>
                <th>Логин</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>Дата рождения</th>
                <th>Пол</th>
                <th>Любимые языки</th>
                <th>Дата регистрации</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>{{ user.id }}</td>
                <td>
                  <strong>{{ user.name }}</strong>
                  <div v-if="user.biography" class="user-bio-preview">
                    {{ user.biography.substring(0, 30) }}...
                  </div>
                </td>
                <td>{{ user.login }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.birthDate || '—' }}</td>
                <td>
                  <span :class="['gender-badge', getGenderClass(user.gender)]">
                    {{ getGenderText(user.gender) }}
                  </span>
                </td>
                <td>
                  <div class="languages-tags">
                    <span v-for="lang in (user.favoriteLanguages || [])" :key="lang" class="lang-tag">
                      {{ lang }}
                    </span>
                    <span v-if="!user.favoriteLanguages?.length" class="no-langs">—</span>
                  </div>
                </td>
                <td>{{ formatDate(user.createdAt) }}</td>
                <td class="actions">
                  <button @click="editUser(user)" class="btn-edit" title="Редактировать">
                    ✏️
                  </button>
                  <button 
                    @click="deleteUser(user.id)" 
                    class="btn-delete" 
                    :disabled="user.id === currentUserId"
                    :title="user.id === currentUserId ? 'Нельзя удалить себя' : 'Удалить пользователя'"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Модальное окно редактирования -->
    <div v-if="editingUser" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>✏️ Редактирование пользователя</h2>
          <button class="modal-close" @click="closeModal">×</button>
        </div>
        <form @submit.prevent="saveUser" class="edit-form">
          <div class="form-row">
            <div class="form-group">
              <label>ФИО *</label>
              <input type="text" v-model="editForm.name" required>
            </div>
            <div class="form-group">
              <label>Логин *</label>
              <input type="text" v-model="editForm.login" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Email *</label>
              <input type="email" v-model="editForm.email" required>
            </div>
            <div class="form-group">
              <label>Телефон *</label>
              <input type="tel" v-model="editForm.phone" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Дата рождения</label>
              <input type="date" v-model="editForm.birthDate">
            </div>
            <div class="form-group">
              <label>Пол</label>
              <select v-model="editForm.gender">
                <option value="">Не указан</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
                <option value="other">Другой</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Любимые языки программирования</label>
            <div class="languages-select">
              <label v-for="lang in allLanguages" :key="lang" class="language-checkbox">
                <input type="checkbox" :value="lang" v-model="editForm.favoriteLanguages">
                <span>{{ lang }}</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Биография</label>
            <textarea v-model="editForm.biography" rows="4" placeholder="Расскажите о себе..."></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-save">💾 Сохранить</button>
            <button type="button" class="btn-cancel" @click="closeModal">❌ Отмена</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "AdminPage",

  setup() {
    const store = useStore();
    const router = useRouter();
    
    const isLoading = ref(false);
    const error = ref(null);
    const users = ref([]);
    const searchQuery = ref("");
    const editingUser = ref(null);
    const editForm = ref({
      name: "",
      login: "",
      email: "",
      phone: "",
      birthDate: "",
      gender: "",
      favoriteLanguages: [],
      biography: ""
    });

    const user = computed(() => store.getters["auth/user"]);
    const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
    const currentUserId = computed(() => user.value?.id);

    const adminName = computed(() => {
      return user.value?.name || user.value?.login || "Admin";
    });

    const allLanguages = [
      "Pascal", "C", "C++", "JavaScript", "PHP", 
      "Python", "Java", "Haskell", "Clojure", "Prolog", "Scala", "Go"
    ];

    const totalLanguages = computed(() => allLanguages.length);

    const newUsersToday = computed(() => {
      const today = new Date().toDateString();
      return users.value.filter(u => {
        const createdDate = new Date(u.createdAt).toDateString();
        return createdDate === today;
      }).length;
    });

    const averageAge = computed(() => {
      const usersWithBirthDate = users.value.filter(u => u.birthDate);
      if (usersWithBirthDate.length === 0) return 0;
      
      const today = new Date();
      const totalAge = usersWithBirthDate.reduce((sum, user) => {
        const birthDate = new Date(user.birthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return sum + age;
      }, 0);
      
      return Math.round(totalAge / usersWithBirthDate.length);
    });

    const languageStats = computed(() => {
      const stats = {};
      allLanguages.forEach(lang => {
        stats[lang] = 0;
      });
      
      users.value.forEach(user => {
        if (user.favoriteLanguages) {
          user.favoriteLanguages.forEach(lang => {
            if (stats[lang] !== undefined) {
              stats[lang]++;
            }
          });
        }
      });
      
      const total = users.value.length;
      return Object.entries(stats)
        .map(([name, count]) => ({
          name,
          count,
          percentage: total > 0 ? (count / total * 100) : 0
        }))
        .sort((a, b) => b.count - a.count);
    });

    const filteredUsers = computed(() => {
      if (!searchQuery.value) return users.value;
      
      const query = searchQuery.value.toLowerCase();
      return users.value.filter(user => 
        user.name?.toLowerCase().includes(query) ||
        user.login?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.phone?.includes(query)
      );
    });

    const loadUsers = async () => {
      isLoading.value = true;
      error.value = null;
      
      try {
        // Здесь должен быть API запрос к вашему бэкенду
        // const response = await axios.get('/api/admin/users');
        // users.value = response.data;
        
        // Временно используем мок-данные
        await new Promise(resolve => setTimeout(resolve, 500));
        users.value = [
          {
            id: 1,
            name: "Иван Петров",
            login: "ivan",
            email: "ivan@example.com",
            phone: "+7 (999) 123-45-67",
            birthDate: "1990-05-15",
            gender: "male",
            favoriteLanguages: ["JavaScript", "Python", "PHP"],
            biography: "Опытный веб-разработчик",
            createdAt: "2024-01-15T10:30:00Z"
          },
          {
            id: 2,
            name: "Мария Сидорова",
            login: "maria",
            email: "maria@example.com",
            phone: "+7 (999) 234-56-78",
            birthDate: "1995-08-22",
            gender: "female",
            favoriteLanguages: ["Java", "C++", "Python"],
            biography: "Бэкенд разработчик",
            createdAt: "2024-02-20T14:45:00Z"
          }
        ];
      } catch (err) {
        error.value = "Ошибка загрузки пользователей: " + err.message;
      } finally {
        isLoading.value = false;
      }
    };

    const editUser = (user) => {
      editingUser.value = user;
      editForm.value = {
        name: user.name || "",
        login: user.login || "",
        email: user.email || "",
        phone: user.phone || "",
        birthDate: user.birthDate || "",
        gender: user.gender || "",
        favoriteLanguages: [...(user.favoriteLanguages || [])],
        biography: user.biography || ""
      };
    };

    const saveUser = async () => {
      try {
        // Здесь должен быть API запрос к вашему бэкенду
        // await axios.post('/api/admin/update-user', {
        //   user_id: editingUser.value.id,
        //   ...editForm.value
        // });
        
        // Обновляем локальные данные
        const index = users.value.findIndex(u => u.id === editingUser.value.id);
        if (index !== -1) {
          users.value[index] = {
            ...users.value[index],
            ...editForm.value
          };
        }
        
        closeModal();
        alert("Пользователь успешно обновлен!");
      } catch (err) {
        error.value = "Ошибка сохранения: " + err.message;
      }
    };

    const deleteUser = async (userId) => {
      if (userId === currentUserId.value) {
        alert("Вы не можете удалить самого себя!");
        return;
      }
      
      if (!confirm("Вы уверены, что хотите удалить этого пользователя?")) {
        return;
      }
      
      try {
        // Здесь должен быть API запрос к вашему бэкенду
        // await axios.delete(`/api/admin/delete-user/${userId}`);
        
        users.value = users.value.filter(u => u.id !== userId);
        alert("Пользователь удален!");
      } catch (err) {
        error.value = "Ошибка удаления: " + err.message;
      }
    };

    const closeModal = () => {
      editingUser.value = null;
      editForm.value = {
        name: "",
        login: "",
        email: "",
        phone: "",
        birthDate: "",
        gender: "",
        favoriteLanguages: [],
        biography: ""
      };
    };

    const getGenderText = (gender) => {
      const genders = {
        male: "Мужской",
        female: "Женский",
        other: "Другой"
      };
      return genders[gender] || "Не указан";
    };

    const getGenderClass = (gender) => {
      const classes = {
        male: "gender-male",
        female: "gender-female",
        other: "gender-other"
      };
      return classes[gender] || "gender-unknown";
    };

    const formatDate = (dateString) => {
      if (!dateString) return "—";
      const date = new Date(dateString);
      return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };

    const logout = async () => {
      await store.dispatch("auth/logout");
      router.push("/");
    };

    onMounted(async () => {
      if (!isAuthenticated.value) {
        router.push("/");
        return;
      }
      await loadUsers();
    });

    return {
      user,
      users,
      isLoading,
      error,
      searchQuery,
      editingUser,
      editForm,
      currentUserId,
      adminName,
      allLanguages,
      totalLanguages,
      newUsersToday,
      averageAge,
      languageStats,
      filteredUsers,
      editUser,
      saveUser,
      deleteUser,
      closeModal,
      getGenderText,
      getGenderClass,
      formatDate,
      logout
    };
  }
};
</script>

<style scoped>
.admin-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.admin-header {
  background: white;
  border-radius: 15px;
  padding: 20px 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.admin-header h1 {
  margin: 0;
  color: #333;
}

.admin-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.admin-info span {
  font-weight: bold;
  color: #667eea;
}

.btn-logout {
  padding: 8px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-logout:hover {
  background: #c82333;
  transform: translateY(-2px);
}

.loading {
  text-align: center;
  padding: 50px;
  background: white;
  border-radius: 15px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.admin-content {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.stats-section {
  margin-bottom: 40px;
}

.stats-section h2,
.languages-section h2,
.users-section h2 {
  margin-bottom: 20px;
  color: #333;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: white;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 3em;
}

.stat-info {
  flex: 1;
}

.stat-info h3 {
  margin: 0 0 5px 0;
  font-size: 0.9em;
  opacity: 0.9;
}

.stat-number {
  font-size: 2em;
  font-weight: bold;
}

.languages-grid {
  display: grid;
  gap: 15px;
}

.language-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
}

.language-name {
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.language-bar {
  background: #e0e0e0;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 8px;
}

.language-fill {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  color: white;
  font-size: 0.85em;
  transition: width 1s ease;
}

.language-count {
  font-size: 0.85em;
  color: #666;
}

.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.search-box {
  flex: 1;
  max-width: 300px;
}

.search-input {
  width: 100%;
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
}

.table-wrapper {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.users-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.users-table tr:hover {
  background: #f8f9fa;
}

.user-bio-preview {
  font-size: 0.85em;
  color: #666;
  margin-top: 4px;
}

.gender-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 0.85em;
}

.gender-male {
  background: #d4edda;
  color: #155724;
}

.gender-female {
  background: #f8d7da;
  color: #721c24;
}

.gender-other {
  background: #fff3cd;
  color: #856404;
}

.gender-unknown {
  background: #e2e3e5;
  color: #383d41;
}

.languages-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.lang-tag {
  background: #667eea;
  color: white;
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 0.8em;
}

.no-langs {
  color: #999;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-delete {
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
  transition: all 0.3s;
}

.btn-edit {
  background: #ffc107;
  color: #333;
}

.btn-edit:hover {
  background: #e0a800;
  transform: scale(1.05);
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.btn-delete:hover:not(:disabled) {
  background: #c82333;
  transform: scale(1.05);
}

.btn-delete:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Модальное окно */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 700px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s;
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2em;
  cursor: pointer;
  color: #999;
}

.modal-close:hover {
  color: #333;
}

.edit-form {
  padding: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.languages-select {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
}

.language-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: background 0.3s;
}

.language-checkbox:hover {
  background: #e0e0e0;
}

.language-checkbox input {
  width: auto;
  margin: 0;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-save,
.btn-cancel {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-save {
  background: #28a745;
  color: white;
}

.btn-save:hover {
  background: #218838;
  transform: translateY(-2px);
}

.btn-cancel {
  background: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background: #5a6268;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .users-table {
    font-size: 12px;
  }
  
  .admin-header {
    flex-direction: column;
    gap: 15px;
  }
}
</style>