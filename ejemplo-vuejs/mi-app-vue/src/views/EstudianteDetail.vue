<template>
  <div class="estudiante-detail-container">
    <h2>Detalle del Estudiante</h2>
    <p v-if="loading">Cargando detalles...</p>
    <p v-if="error" class="error-message">{{ error }}</p>
    <div v-else-if="estudiante">
      <h3>{{ estudiante.nombre }} {{ estudiante.apellido }}</h3>
      <p><strong>Cédula:</strong> {{ estudiante.cedula }}</p>
      <p><strong>Correo:</strong> {{ estudiante.correo }}</p>

      <h4>Números Telefónicos:</h4>
      <ul v-if="numerosTelefonicos.length">
        <li v-for="numero in numerosTelefonicos" :key="numero.url">
          {{ numero.telefono }} ({{ numero.tipo }})
          <!-- Botones de acción al lado del teléfono -->
          <router-link
            :to="{
              name: 'EditarTelefono',
              params: { telefonoId: numero.id },
            }"
            class="action-link edit"
            >Editar</router-link
          >
          |
          <router-link
            :to="{
              name: 'EliminarTelefono',
              params: { telefonoId: numero.id },
            }"
            class="action-link delete"
            >Eliminar</router-link
          >
        </li>
      </ul>
      <p v-else>No tiene números telefónicos registrados.</p>

      <!-- Botón para agregar nuevo teléfono -->
      <router-link
        :to="{ name: 'CrearTelefono', params: { estudianteId: estudiante.id } }"
        class="back-button"
      >
        Agregar Teléfono
      </router-link>

      <router-link :to="{ name: 'EstudiantesList' }" class="back-button">
        Volver al Listado
      </router-link>
      <router-link
        :to="{
          name: 'EditarEstudiante',
          params: { estudianteUrl: estudiante.url },
        }"
        class="back-button"
      >
        Editar
      </router-link>
      <router-link
        :to="{
          name: 'EliminarEstudiante',
          params: { estudianteUrl: estudiante.url },
        }"
        class="back-button"
      >
        Eliminar
      </router-link>
    </div>
    <p v-else>Estudiante no encontrado.</p>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "EstudianteDetail",
  props: ["estudianteUrl"],
  data() {
    return {
      estudiante: null,
      numerosTelefonicos: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    // Decodifica la URL si viene codificada
    let decodedUrl = this.estudianteUrl;
    try {
      if (decodedUrl && decodedUrl.includes("%")) {
        decodedUrl = decodeURIComponent(decodedUrl);
      }
    } catch (e) {
      decodedUrl = this.estudianteUrl;
    }
    // Para debug
    console.log("Detalle estudiante, URL a usar:", decodedUrl);
    await this.fetchEstudianteDetail(decodedUrl);
    await this.fetchNumerosTelefonicos(decodedUrl);
  },
  methods: {
    async fetchEstudianteDetail(url) {
      try {
        this.loading = true;
        this.error = null;
        const response = await api.get(url);
        this.estudiante = response.data;
      } catch (err) {
        this.error = "No se pudo cargar el detalle del estudiante.";
        console.error("Detalle estudiante ERROR:", err, "URL usada:", url);
      } finally {
        this.loading = false;
      }
    },
    async fetchNumerosTelefonicos(estudianteApiUrl) {
      try {
        const response = await api.get("numerosts/");
        // Normaliza ambas URLs quitando slashes al final
        this.numerosTelefonicos = response.data.results.filter(
          (numero) =>
            numero.estudiante.replace(/\/+$/, "") ===
            estudianteApiUrl.replace(/\/+$/, "")
        );
      } catch (err) {
        console.error("Error cargando teléfonos:", err);
      }
    },
  },
};
</script>

<style scoped>
.estudiante-detail-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: left;
}
h2,
h3,
h4 {
  text-align: center;
  color: #333;
  margin-bottom: 15px;
}
ul {
  list-style: disc;
  padding-left: 20px;
  margin-bottom: 20px;
}
li {
  margin-bottom: 5px;
}
.action-link {
  margin-left: 8px;
  font-size: 0.95em;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}
.action-link.edit:hover {
  color: #f1c40f;
}
.action-link.delete:hover {
  color: #e74c3c;
}
.back-button {
  display: block;
  width: fit-content;
  margin: 20px auto 0;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s ease;
}
.back-button:hover {
  background-color: #0056b3;
}
.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
