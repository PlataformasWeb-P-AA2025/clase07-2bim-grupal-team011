<template>
  <div class="crear-telefono-container">
    <h2>Agregar Teléfono</h2>
    <form @submit.prevent="crearTelefono">
      <div class="form-group">
        <label>Teléfono</label>
        <input v-model="form.telefono" required />
      </div>
      <div class="form-group">
        <label>Tipo</label>
        <select v-model="form.tipo" required>
          <option value="">Seleccione...</option>
          <option value="celular">Celular</option>
          <option value="fijo">Fijo</option>
        </select>
      </div>
      <button type="submit" class="save-btn">Agregar</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "CrearTelefono",
  props: ["estudianteId"],
  data() {
    return {
      form: {
        telefono: "",
        tipo: "",
        estudiante: "",
      },
      error: null,
    };
  },
  async created() {
    // Es preferible hardcodear el puerto del backend si tu frontend corre en otro, ej 8080 vs 8000
    this.form.estudiante = `http://127.0.0.1:8000/api/estudiantes/${this.estudianteId}/`;
  },
  watch: {
    estudianteId(newVal) {
      this.form.estudiante = `http://127.0.0.1:8000/api/estudiantes/${newVal}/`;
    },
  },
  methods: {
    async crearTelefono() {
      try {
        await api.post("numerosts/", this.form);
        this.$router.push({
          name: "EstudianteDetail",
          params: { estudianteUrl: this.form.estudiante },
        });
      } catch (err) {
        this.error = "No se pudo crear el número telefónico";
      }
    },
  },
};
</script>

<style scoped>
.crear-telefono-container {
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
input,
select {
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
