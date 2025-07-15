<template>
  <div class="editar-estudiante-container">
    <h2>Editar Estudiante</h2>
    <form @submit.prevent="guardarCambios" v-if="form">
      <div class="form-group">
        <label>Nombre</label>
        <input v-model="form.nombre" required />
      </div>
      <div class="form-group">
        <label>Apellido</label>
        <input v-model="form.apellido" required />
      </div>
      <div class="form-group">
        <label>Cédula</label>
        <input v-model="form.cedula" required />
      </div>
      <!-- Agrega más campos según tu modelo -->
      <button type="submit" class="save-btn">Guardar</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "EditarEstudiante",
  props: ["estudianteUrl"],
  data() {
    return {
      form: null,
      error: null,
    };
  },
  async created() {
    await this.cargarEstudiante();
  },
  methods: {
    async cargarEstudiante() {
      try {
        const url = decodeURIComponent(this.$route.params.estudianteUrl);
        const response = await api.get(url);
        this.form = { ...response.data };
      } catch (err) {
        this.error = "No se pudo cargar el estudiante";
      }
    },
    async guardarCambios() {
      try {
        const url = decodeURIComponent(this.$route.params.estudianteUrl);
        await api.put(url, this.form);
        this.$router.push({ name: "EstudiantesList" });
      } catch (err) {
        this.error = "No se pudo guardar el estudiante";
      }
    },
  },
};
</script>

<style scoped>
.editar-estudiante-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 25px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}
.form-group {
  margin-bottom: 18px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
}
input {
  width: 100%;
  padding: 7px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.save-btn {
  padding: 10px 18px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.save-btn:hover {
  background: #0056b3;
}
.error-message {
  color: red;
  text-align: center;
  margin-top: 15px;
}
</style>
