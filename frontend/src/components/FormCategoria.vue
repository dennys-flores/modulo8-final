<template>
  <div>
    <div>
      <v-form ref="form" lazy-validation>
        <v-row no-gutters>
          <v-col cols="12" sm="12">
            <v-text-field
              label="Id"
              maxlength="10"
              :counter="10"
              autocomplete="off"
              outlined
              type="number"
              :disabled="!esNuevo"
              v-model="objetoCategoria.id"
              :rules="[
                (v) => !!v || 'Id es requerido',
                (v) =>
                  (v && v >= 1 && v <= 50) ||
                  'el Id debe tener entre 1 y 10 caracteres',
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-textarea
              outlined
              label="Nombre de Categoria"
              placeholder="categoria"
              v-model="objetoCategoria.nombre"
              :rules="[
                (v) => !!v || 'Nombre es requerido',
                (v) =>
                  (v && v.length >= 5 && v.length <= 200) ||
                  'Nombre debe tener entre 5 y 200 caracteres',
              ]"
            ></v-textarea>
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field
              label="Descripcion de Categoria"
              maxlength="300"
              :counter="300"
              autocomplete="off"
              outlined
              v-model="objetoCategoria.descripcion"
              :rules="[
                (v) => !!v || 'La descripcion es requerido',
                (v) =>
                  (v && v.length >= 1 && v.length <= 300) ||
                  'Descripcion debe tener entre 5 y 300 caracteres',
              ]"
            ></v-text-field>
          </v-col>
        
        </v-row>
      </v-form>

      <v-btn
        type="submit"
        @click="agregarServicio"
        color="primary"
        class="pl-4 pr-4 mr-2"
        >Guardar
      </v-btn>
      <v-btn
        @click="cancelar"
        variant="outlined" color="primary"
        class="pl-4 pr-4"
        >Cancelar
      </v-btn>
    </div>
  </div>
</template>

<script>
import { categoriaService } from '../service/categoriaService'
export default {
  props: ["item", "esNuevo"],
  data() {
    return {
      objetoCategoria: {
        id: 0,
        nombre: "",
        descripcion: "",
      },
    };
  },
  mounted() {
    if (!this.esNuevo) {
      this.objetoCategoria.id = this.item.id;
      this.objetoCategoria.nombre = this.item.nombre;
      this.objetoCategoria.descripcion = this.item.descripcion;
    }
  },
  methods: {
    agregarServicio() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (this.esNuevo) {
          categoriaService.insertar(this.objetoCategoria).then((response) => {
          console.log("respuesta:", response);
        })
      } else {
          categoriaService.modificar(this.objetoCategoria).then((response) => {
          console.log("respuesta:", response);
        })
      }
      
      this.$emit("cerrar");
      this.$emit("actualizar")
    },
    cancelar(){
      this.$emit("cerrar");
    }
  },
};
</script>

<style></style>
