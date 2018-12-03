<template>
  <div id="login">
    <v-app>
      <v-content class="primary">
        <v-container fill-height="fill-height">
          <v-layout align-center="align-center" justify-center="justify-center">
            <v-flex class="login-form text-xs-center">
              <div class="mb-3 welcome">
                <span class="font-weight-light">Bem vindo(a)</span>
              </div>
              <v-card light="light" class="box">
                <div class="mb-1 box-header">
                  <span class="font-weight-light">Login</span>
                </div>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                        v-model="token"
                        light="light"
                        prepend-icon="vpn_key"
                        label="Token"
                        type="text"
                        :rules="ruleToken"
                    ></v-text-field>
                    <v-btn block="block" color="primary" @click.native="doLogin">Entrar</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      token: '',
      valid: true,
      validToken: true,
      ruleToken: [ v => this.validToken || 'Token inválido' ]
    }
  },
  methods: {
    ...mapActions('Login', ['validateToken', 'setToken']),
    doLogin () {
      let self = this
      this.validateToken({ token: this.token }).then(function (response) {
        self.validToken = response.status === 200
        self.$refs.form.validate()
        if (self.validToken) {
          self.setToken({ token: self.token })
          self.$router.push({ path: '/contato' })
          console.log(self.token)
        }
      })
    }
  }
}
</script>
