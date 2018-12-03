<template>
  <div id="empresa-form">
    <v-app>
      <Toolbar />
      <Menu />
      <v-content style="padding: 0 0 0 300px">
        <v-container>
          <v-layout>
            <v-flex xs12>
              <section class="page-head">
                <h1 id="introduction" class="display-1 primary--text">
                  Empresa
                </h1>
              </section>
            </v-flex>
          </v-layout>
        </v-container>

        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > 1" step="1">
            Empresa
          </v-stepper-step>

          <v-stepper-content step="1">

            <v-layout row>
              <v-flex xs6>
                <v-text-field prepend-icon="business" label="Nome" v-model="name" required></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs6>
                <v-text-field prepend-icon="language" label="Domínio" v-model="domain" required></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs4>
                <v-text-field mask="(##) #####-####" prepend-icon="phone" label="Telefone" v-model="phone" required></v-text-field>
              </v-flex>

              <v-flex xs8>
                <v-btn flat icon color="primary lighten-2" @click.native="addPhone">
                  <v-icon  color="primary" large>add_circle</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>

            <v-list>
              <v-list-tile
                  v-for="item in phones"
                  :key="item"
                  avatar>
                <v-layout row>
                  <v-flex xs4>
                    <v-text-field
                        type="text"
                        prepend-icon="phone"
                        name="phone"
                        :value="item">
                    </v-text-field>
                  </v-flex>

                  <v-flex xs4>
                    <v-list-tile-action>
                      <v-btn flat icon color="primary lighten-2" class="m-l-10" @click.native="removePhone(item)">
                        <v-icon color="red" large>remove_circle</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-flex>
                </v-layout>
              </v-list-tile>
            </v-list>

            <v-layout row>
              <v-flex xs6>
                <v-text-field prepend-icon="email" label="E-mail" v-model="email" required></v-text-field>
              </v-flex>

              <v-flex xs6>
                <v-btn flat icon color="primary lighten-2" @click.native="addEmail">
                  <v-icon color="primary" large>add_circle</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>

            <v-list>
              <v-list-tile
                  v-for="item in emails"
                  :key="item"
                  avatar>
                <v-layout row>
                  <v-flex xs6>
                    <v-text-field
                        type="text"
                        prepend-icon="email"
                        name="email"
                        :value="item">
                    </v-text-field>
                  </v-flex>

                  <v-flex xs6>
                    <v-list-tile-action>
                      <v-btn flat icon color="primary lighten-2" class="m-l-10" @click.native="removeEmail(item)">
                        <v-icon color="red" large>remove_circle</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-flex>
                </v-layout>
              </v-list-tile>
            </v-list>

            <v-btn color="primary" @click="e6 = 2">Continuar</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2">
            Contatos
            <small>Empregados</small>
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-layout row>
              <v-flex xs12 sm6 d-flex>
                <v-select
                    :items="employees"
                    item-text="name"
                    item-value="id"
                    v-model="employeesSelected"
                    multiple
                    single-line
                    label="Contatos"
                ></v-select>
              </v-flex>
            </v-layout>

            <v-btn flat @click="e6 = 1">Anterior</v-btn>
            <v-btn color="primary" @click.prevent="submit">Salvar</v-btn>
          </v-stepper-content>
        </v-stepper>
        <Alert v-show="success" type="type" message="message" />
      </v-content>
    </v-app>

  </div>
</template>

<script>
import Toolbar from '../../Toolbar/Toolbar.vue'
import Menu from '../../Menu/Menu.vue'
import Alert from '../../Alert/Alert.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ContatoForm',
  data () {
    return {
      name: '',
      domain: '',
      phone: '',
      phones: [],
      email: '',
      emails: [],
      employees: [],
      employeesSelected: [],
      type: '',
      message: '',
      success: false,
      e6: 1
    }
  },
  methods: {
    ...mapActions('Empresa', ['getEmpresaById', 'saveCompany']),
    ...mapActions('Contato', ['loadContatos']),
    addPhone: function () {
      this.phones.push(this.phone)
    },
    removePhone: function (index) {
      this.phones.splice(index, 1)
      this.phone = ''
    },
    addEmail: function () {
      this.emails.push(this.email)
    },
    removeEmail: function (index) {
      this.emails.splice(index, 1)
      this.email = ''
    },
    async submit () {
      let emails = this.emails.map(email => {
        return {
          type: {
            id: '2'
          },
          address: email
        }
      })
      let phones = this.phones.map(phone => {
        return {
          type: {
            id: '70569'
          },
          number: phone
        }
      })
      let employees = this.employeesSelected.map(employee => {
        return {
          contact: {
            id: employee
          }
        }
      })
      let data = {
        name: this.name,
        domain: this.domain,
        dateCreated: Date.now(),
        createdBy: { id: this.user.id },
        responsible: { id: this.user.id },
        emails: emails,
        phones: phones,
        employees: employees
      }
      let response = await this.saveCompany({ empresa: data, token: this.token })
      let saved = response.status === 200

      if (saved) {
        this.type = 'success'
        this.message = 'Empresa cadastrada com sucesso!'
        this.success = true

        this.$router.back()
      } else {
        this.type = 'error'
        this.message = 'Erro ao cadastrar empresa!'
        this.success = false
      }
    }
  },
  components: {
    Toolbar,
    Menu,
    Alert
  },
  computed: {
    ...mapState('Login', ['user', 'token'])
  },
  props: ['contact'],
  created: function () {
    this.id = this.$route.params.id
  },
  mounted: async function () {
    if (this.id !== null && this.id !== undefined && this.id > 0) {
      let response = await this.getEmpresaById({ id: this.id, token: this.token })

      if (response !== null && response.data !== undefined) {
        this.name = response.data.name !== undefined ? response.data.name : ''
        this.domain = response.data.domain !== undefined ? response.data.domain : ''
        let self = this
        if (response.data.phones !== undefined) {
          response.data.phones.map((phone) => {
            return phone.number
          }).forEach(value => {
            self.phones.push(value)
          })
        }
        if (response.data.emails !== undefined) {
          response.data.emails.map((email) => {
            return email.address
          }).forEach(value => {
            self.emails.push(value)
          })
        }
        if (response.data.employees !== undefined) {
          response.data.employees.map((employer) => {
            return employer.contact.id
          }).forEach(value => {
            self.employeesSelected.push(value)
          })
        }
      }
    }
    let params = {
      start: 0,
      limit: 100,
      sort: 'name',
      order: 'asc'
    }
    let response = await this.loadContatos({ params: params, token: this.token })

    if (response !== null && response.results !== undefined && response.results.length > 0) {
      this.employees = response.results
    }
  }
}
</script>
