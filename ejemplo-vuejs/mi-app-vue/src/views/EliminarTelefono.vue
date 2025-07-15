<template>
  <div class="eliminar-telefono-container">
    <h2>Eliminar Teléfono</h2>
    <div v-if="form">
      <p>
        ¿Estás seguro de que deseas eliminar el teléfono
        <b>{{ form.telefono }}</b> ({{ form.tipo }})?
      </p>
      <button @click="eliminarTelefono" class="delete-btn">Sí, eliminar</button>
      <button @click="$router.back()" class="cancel-btn">Cancelar</button>
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
    <p v-if="success" class="success-message">{{ success }}</p>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "EliminarTelefono",
  props: ["telefonoId"],
  data() {
    return {
      form: null,
      error: null,
      success: null,
    };
  },
  async created() {
    await this.cargarTelefono();
  },
  methods: {
    async cargarTelefono() {
      try {
        const response = await api.get(`numerosts/${this.telefonoId}/`);
        this.form = { ...response.data };
      } catch (err) {
        this.error = "No se pudo cargar el teléfono";
      }
    },
    async eliminarTelefono() {
      try {
        await api.delete(`numerosts/${this.telefonoId}/`);
        this.success = "Teléfono eliminado correctamente";
        // Redirige si lo necesitas
        // this.$router.push({ name: 'EstudianteDetail', params: { estudianteUrl: encodeURIComponent(this.form.estudiante) } });
      } catch (err) {
        this.error = "No se pudo eliminar el teléfono";
      }
    },
  },
};
</script>

<style scoped>
.eliminar-telefono-container {
  max-width: 400px;
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
.success-message {
  color: green;
  text-align: center;
  margin-top: 15px;
}
</style>
