<template>
  <div id="contato">
    <v-app>
      <Toolbar />
      <Menu />
      <v-content style="padding: 0 0 0 300px">
        <v-container>
          <v-layout>
            <v-flex xs12>
              <section class="page-head">
                <h1 id="introduction" class="display-1 primary--text">
                  Contatos
                </h1>
              </section>
            </v-flex>
          </v-layout>
        </v-container>
        <v-data-table
            :headers="headers"
            :items="desserts"
            :pagination.sync="pagination"
            :total-items="totalDesserts"
            :loading="loading"
            class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.phones }}</td>
            <td class="text-xs-left">{{ props.item.emails }}</td>
            <td class="text-xs-left">
              <router-link :to="{ name: 'ContatoForm', path: 'contato/edit', params: { id: props.item.id }}">
                <v-icon color="primary" large>visibility</v-icon>
              </router-link>
            </td>
          </template>
        </v-data-table>

        <v-container grid-list-md>
          <router-link :to="{ path: 'contato/new' }" class="v-btn primary">
            Novo Contato
          </router-link>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Toolbar from '../Toolbar/Toolbar.vue'
import Menu from '../Menu/Menu.vue'
export default {
  name: 'Contato',
  data () {
    return {
      totalDesserts: 0,
      desserts: [],
      pagination: {},
      loading: true,
      headers: [
        { text: '#ID', align: 'left', value: 'id', sortable: false },
        { text: 'Nome', align: 'left', value: 'name', sortable: true },
        { text: 'Telefone', align: 'left', value: 'phones', sortable: false },
        { text: 'E-mail', align: 'left', value: 'emails', sortable: false },
        { text: 'Visualizar', align: 'left', value: '' }
      ]
    }
  },
  computed: {
    ...mapState('Login', ['token']),
    ...mapState('Empresa', ['companies'])
  },
  watch: {
    pagination: {
      handler () {
        this.getDataFromApi()
          .then(data => {
            this.desserts = data.items
            this.totalDesserts = data.total
          })
      },
      deep: true
    }
  },
  mounted: async function () {
    this.getDataFromApi().then(data => {
      this.desserts = data.items
      this.totalDesserts = data.total
    })
  },
  methods: {
    ...mapActions('Contato', ['loadContatos']),
    ...mapActions('Empresa', ['getEmpresaById', 'loadEmpresas']),

    getCompany (companyId) {
      return this.companies.find(empresa => {
        return empresa.id === companyId
      })
    },

    getDataFromApi () {
      this.loading = true
      return new Promise((resolve, reject) => {
        let self = this
        let promise = this.getDesserts()
        promise.then(function (result) {
          let items = result.items
          const total = result.total
          setTimeout(() => {
            self.loading = false
            resolve({
              items,
              total
            })
          }, 1000)
        })
      })
    },
    async getDesserts () {
      let result = { items: [], length: 0 }
      let params = {
        start: ((this.pagination.page - 1) * this.pagination.rowsPerPage),
        limit: this.pagination.rowsPerPage,
        sort: this.pagination.sortBy,
        order: this.pagination.descending ? 'desc' : 'asc'
      }
      debugger
      let response = await this.loadContatos({ params: params, token: this.token })
      if (response !== null && response.results !== undefined && response.results.length > 0) {
        if (!this.companies || this.companies.length === 0) {
          await this.loadEmpresas({ params: { ...params, limit: 100 }, token: this.token })
        }
        let list = response.results.map((contato) => {
          return {
            id: contato.id,
            name: contato.name,
            phones: contato.phones.map((phone) => { return phone.number }).join(', '),
            emails: contato.emails.map((email) => { return email.address }).join(', '),
            employers: contato.employers.map((employer) => {
              let company = this.getCompany(employer.company.id)
              return company ? company.name : ''
            }).join(', ')
          }
        })
        result.total = response.metadata.pagination.total
        result.items = list
      } else if (response != null && response.error !== null) {
        console.error(response.error)
      }
      return result
    }
  },
  components: {
    Toolbar,
    Menu
  }
}
</script>
