<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'index',
  data () {
    return {}
  },
  methods: {
  },
  computed: {
    ...mapState('Login', ['token'])
  }
}
</script>
