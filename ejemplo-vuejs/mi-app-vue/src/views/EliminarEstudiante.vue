<template>
  <div class="eliminar-estudiante-container">
    <h2>Eliminar Estudiante</h2>
    <div v-if="form">
      <p>¿Estás seguro de que deseas eliminar a <b>{{ form.nombre }} {{ form.apellido }}</b> (Cédula: {{ form.cedula }})?</p>
      <button @click="eliminarEstudiante" class="delete-btn">Sí, eliminar</button>
      <button @click="$router.push({ name: 'EstudiantesList' })" class="cancel-btn">Cancelar</button>
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "EliminarEstudiante",
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
    async eliminarEstudiante() {
      try {
        const url = decodeURIComponent(this.$route.params.estudianteUrl);
        await api.delete(url);
        this.$router.push({ name: "EstudiantesList" });
      } catch (err) {
        this.error = "No se pudo eliminar el estudiante";
      }
    },
  },
};
</script>

<style scoped>
.eliminar-estudiante-container {
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
  color: #c0392b;
}
p {
  text-align: center;
  margin-bottom: 20px;
}
.delete-btn {
  padding: 10px 18px;
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
  transition: background 0.2s;
}
.delete-btn:hover {
  background: #a71d2a;
}
.cancel-btn {
  padding: 10px 18px;
  background: #ccc;
  color: #222;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
.error-message {
  color: red;
  text-align: center;
  margin-top: 15px;
}
</style>
