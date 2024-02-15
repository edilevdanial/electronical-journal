import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const header = defineAsyncComponent(() => import('@components/HeaderTemplate.vue'))

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    components: {
      default: import('@modules/home/view/HomePage.vue'),
      header,
    },
  },
  {
    path: '/create/user',
    name: 'create.user',
    components: {
      default: import('@modules/users/view/UserCreateView.vue'),
      header,
    },
  },
  // {
  //     path: '/create/course',
  //     name: 'create.course',
  //     component: CreateCourse,
  //     meta: {
  //         middleware: [
  //             auth
  //         ]
  //     }
  // },
  // {
  //     path: '/create/course-group',
  //     name: 'create.course.group',
  //     component: CreateGroupCourse,
  //     meta: {
  //         middleware: [
  //             auth
  //         ]
  //     }
  // },
  // {
  //     path: '/create/vacancy',
  //     name: 'create.vacancy',
  //     component: CreateVacancy,
  //     meta: {
  //         middleware: [
  //             auth
  //         ]
  //     }
  // },
  // {
  //     path: '/create/news',
  //     name: 'create.news',
  //     component: CreateNews,
  //     meta: {
  //         middleware: [
  //             auth
  //         ]
  //     }
  // },
  // {
  //     path: '/vacancy/:id',
  //     name: 'vacancy.watch',
  //     component: VacancyPages,
  //
  // },
  {
    path: '/all/course',
    name: 'all.course',
    components: {
      default: import('@modules/course/view/CourseListView.vue'),
      header,
    },
  },
  {
    path: '/all/users',
    name: 'all.users',
    components: {
      default: import('@modules/users/view/UsersView.vue'),
      header,
    },
  },
  // {
  //     path: '/seminar/:id',
  //     name: 'seminar.group',
  //     component: SeminarList,
  //     meta: {
  //         middleware: [
  //             auth
  //         ]
  //     }
  // },
  {
    path: '/all/news',
    name: 'all.news',
    components: {
      default: import('@modules/news/view/NewsListView.vue'),
      header,
    },
  },
  {
    path: '/news/:id',
    name: 'get.news',
    components: {
      default: import('@modules/news/view/NewsPage.vue'),
      header,
    },
  },
  // {
  //     path: '/all/vacancy',
  //     name: 'all.vacancy',
  //     component: VacancyList,
  //     meta: {
  //         middleware: [
  //             auth
  //         ]
  //     }
  // },
  {
    path: '/all/group',
    name: 'all.group',
    components: {
      default: import('@modules/group/view/GroupListView.vue'),
      header,
    },
  },
  {
    path: '/auth/login',
    name: 'auth.login',
    components: {
      default: import('@modules/auth/view/AuthLogin.vue'),
    },
  },
  // {
  //     path: '/create/group',
  //     name: 'create.group',
  //   component: import('@modules/group/view/AuthLogin.vue'),
  // },
  // {
  //     path: '/create/seminar',
  //     name: 'create.seminar',
  //     component: CreateSeminar,
  //     meta: {
  //         middleware: [
  //             auth
  //         ]
  //     }
  // },
]

const router = createRouter({
  history: createWebHistory(),
  // base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  if (!localStorage.getItem('token') && to.path !== '/auth/login') {
    next('/auth/login')
  }
  next()
})

export { router }
