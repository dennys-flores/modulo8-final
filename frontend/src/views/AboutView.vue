<template>
  <div class="pa-3">
    <h3 class="d-flex flex-row">Lista de Productos</h3>
    <v-btn class="d-flex flex-row-reverse" variant="outlined" color="primary" @click="nuevo = true; dialogo = true">
      Nuevo Categoria
    </v-btn>
    <v-card elevation="3">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Id
            </th>
            <th class="text-left">
              Nombre
            </th>
            <th class="text-left">
              Descripcion
            </th>
            <th class="text-left">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listaCategorias" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.descripcion }}</td>
            <td>
              <div class="d-flex flex-row ">
                <v-btn outlined small @click="modificar(item)" color="green" class="mr-2">
                  Modificar
                </v-btn>
                <v-btn outlined small @click="eliminar(item)" color="red">
                  Eliminar
                </v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-dialog v-model="dialogo" width="auto">
      <v-card>
        <v-card-title class="secondary py-1 px-2 flex-column align-stretch">
          <v-row no-gutters>
            <v-col class="subtitle white--text text-truncate">
              {{ nuevo ? 'Registrar Producto' : 'Modificar Producto' }}
            </v-col>
            <v-col cols="auto">
              <v-btn dark class="ml-2" icon tile @click="dialogo = false">
                X
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-5">
          <FormCategoria :item="itemSelect" :esNuevo="nuevo" @cerrar="dialogo = false" @actualizar="actualizarLista()">
          </FormCategoria>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEliminar" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Eliminar </v-card-title>
        <v-card-text>El producto se eliminar permanentemente</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogEliminar = false">
            Cancelar
          </v-btn>
          <v-btn color="red darken-1" text @click="this.eliminarRegistro()">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { categoriaService } from '../service/categoriaService'
import FormCategoria from '../components/FormCategoria.vue'
export default {
  components: {
    FormCategoria
  },
  data() {
    return {
      listaCategorias: [],
      dialogo: false,
      nuevo: true,
      itemSelect: {},
      dialogEliminar: false,
    }
  },
  created() {
    this.obtenerListado()
  },
  methods: {
    obtenerListado() {
      categoriaService.lista().then((response) => {
        this.listaCategorias = response
      })
    },
    modificar(item) {
      this.itemSelect = item
      this.nuevo = false;
      this.dialogo = true;
    },
    eliminar(item) {
      this.itemSelect = item;
      this.dialogEliminar = true;
    },
    eliminarRegistro() {
      categoriaService.eliminar(this.itemSelect).then((response) => {
        console.log(response);
      })
      this.dialogEliminar = false;
      this.actualizarLista();
    },
    actualizarLista() {
      setTimeout(() => this.obtenerListado(), 700);
    },
  }
}
</script>