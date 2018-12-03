<template>
  <v-toolbar app fixed clipped-left>
    <v-menu :nudge-width="-100">
      <v-toolbar-title slot="activator">
        Toolbar
      </v-toolbar-title>
      <v-list>
        <v-list-tile :to="'/page1'">
          Settings
        </v-list-tile>
        <v-list-tile :to="'/page2'">
          <v-list-tile-title v-text="'Account'"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
  export default {
    name: "Header"
  }
</script>