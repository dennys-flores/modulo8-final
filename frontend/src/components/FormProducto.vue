<template>
  <div>
    <div>
      <v-form ref="form" lazy-validation>
        <v-row no-gutters>
          <v-col cols="12" sm="12">
            <v-text-field label="Id" maxlength="10" :counter="10" autocomplete="off" outlined type="number"
              :disabled="!esNuevo" v-model="objetoProducto.id" :rules="[
                (v) => !!v || 'Id es requerido',
                (v) =>
                  (v && v >= 1 && v <= 50) ||
                  'el Id debe tener entre 1 y 10 caracteres',
              ]"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-textarea label="Url de Imagen" maxlength="300" :counter="300" autocomplete="off" outlined
              placeholder="Ingrese la URL de la imagen" v-model="objetoProducto.imagen" :rules="[
                (v) => !!v || 'Imagen es requerido',
                (v) =>
                  (v && v.length >= 5 && v.length <= 300) ||
                  'La Imagen debe tener entre 5 y 300 caracteres',
              ]"></v-textarea>
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field outlined label="Nombre de Producto" placeholder="Nombre de producto"
              v-model="objetoProducto.nombre" :rules="[
                (v) => !!v || 'Nombre es requerido',
                (v) =>
                  (v && v.length >= 5 && v.length <= 200) ||
                  'Nombre debe tener entre 5 y 200 caracteres',
              ]"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-textarea label="Descripcion de producto" maxlength="300" :counter="300" autocomplete="off" outlined
              v-model="objetoProducto.descripcion" :rules="[
                (v) => !!v || 'La descripcion es requerido',
                (v) =>
                  (v && v.length >= 1 && v.length <= 300) ||
                  'Descripcion debe tener entre 5 y 300 caracteres',
              ]"></v-textarea>
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field label="Precio de producto" maxlength="30" :counter="30" autocomplete="off" outlined
              type="number" v-model="objetoProducto.precio" :rules="[
                (v) => !!v || 'La precio es requerido',
                (v) =>
                  (v && v.length >= 1 && v.length <= 10) ||
                  'Deben ser de 1 y 10',
              ]"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12">

            <v-select v-model="objetoProducto.categoriaId" :items="listaCategorias" item-title="nombre"  
              item-value="id" label="Categoria"  ></v-select>

           
          </v-col>
        </v-row>
      </v-form>

      <v-btn type="submit" @click="agregarServicio" color="primary" class="pl-4 pr-4 mr-2">Guardar
      </v-btn>
      <v-btn @click="cancelar" variant="outlined" color="primary" class="pl-4 pr-4">Cancelar
      </v-btn>
    </div>
  </div>
</template>

<script>
import { productosService } from '../service/productosService'
import { categoriaService } from '../service/categoriaService'
export default {
  props: ["item", "esNuevo"],
  data() {
    return {
      listaCategorias:[],
      objetoProducto: {
        id: 0,
        imagen: "",
        nombre: "",
        descripcion: "",
        precio: 0,
        categoriaId: 0
      },
    };
  },
  mounted() {
    this.obtenerCategorias()
    if (!this.esNuevo) {
      this.objetoProducto.id = this.item.id;
      this.objetoProducto.imagen = this.item.imagen;
      this.objetoProducto.nombre = this.item.nombre;
      this.objetoProducto.descripcion = this.item.descripcion;
      this.objetoProducto.precio = this.item.precio;
      this.objetoProducto.categoriaId = this.item.categoriaId;
    }
  },
  methods: {
    obtenerCategorias() {
      categoriaService.lista().then((response) => {
        this.listaCategorias = response
      })
    },
    agregarServicio() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (this.esNuevo) {
        productosService.insertar(this.objetoProducto).then((response) => {
          console.log("respuesta:", response);
        })
        /* this.$store.commit("alert", {
          color: "success",
          text: "Se registro de forma correcta",
        }); */
      } else {
        productosService.modificar(this.objetoProducto).then((response) => {
          console.log("respuesta:", response);
        })
        /* this.$store.commit("alert", {
          color: "success",
          text: "Se modifico de forma correcta",
        }); */
      }

      this.$emit("cerrar");
      this.$emit("actualizar")
    },
    cancelar() {
      this.$emit("cerrar");
    }
  },
};
</script>

<style></style>
