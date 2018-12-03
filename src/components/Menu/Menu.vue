<template>
  <v-navigation-drawer fixed light>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">

          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
      <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="abrir(item)"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'Menu',
  data () {
    return {
      items: [
        { title: 'Contato', icon: 'contacts', router: '/contato' },
        { title: 'Empresa', icon: 'business', router: '/empresa' }
      ],
      right: null
    }
  },
  methods: {
    abrir (item) {
      this.$router.push({ name: item.title, path: item.router })
    }
  }
}
</script>
