import Login from '../components/Login/Login.vue'
import Empresa from '../components/Empresa/Empresa.vue'
import EmpresaForm from '../components/Empresa/form/EmpresaForm.vue'
import Contato from '../components/Contato/Contato.vue'
import ContatoForm from '../components/Contato/form/ContatoForm.vue'

export default [
  { path: '/', name: 'Login', component: Login },
  { path: '/empresa', name: 'Empresa', component: Empresa, props: true },
  { path: '/empresa/edit/:id', name: 'EmpresaForm', component: EmpresaForm, props: true },
  { path: '/empresa/new', name: 'EmpresaForm', component: EmpresaForm, props: false },
  { path: '/contato', name: 'Contato', component: Contato, props: true },
  { path: '/contato/edit/:id', name: 'ContatoForm', component: ContatoForm, props: true },
  { path: '/contato/new', name: 'ContatoForm', component: ContatoForm, props: false }
]
