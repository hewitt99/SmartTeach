import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Home = () => import('../views/Home.vue')
const Welcome = () => import("../components/Welcome")
// course导入
const Courseshow = () => import('../views/course/Courseshow')
const CoursereAdd = () => import('../views/course/CourseAdd')
const Courseupdate = () => import('../views/course/Courseupdate')
// score导入
const Scoreshow = () => import('../views/score/Scoreshow')
const Scoreupdate = () => import('../views/score/Scoreupdate')
// teacher导入
const Teacherlist = () => import('../views/teacher/Teacherlist')
// question导入
const Question = () => import('../views/question/question')
const Questionupdate = () => import('../views/question/questionupdate')

// practice导入
const Practiceshow = () => import('../views/practice/Practiceshow')
const Practiceupdate = () => import('../views/practice/Practiceupdate')
const Practiceupdate2 = () => import('../views/practice/Practiceupdate2')
const Practiceadd2 = () => import('../views/practice/Practiceadd2')
const Practiceadd = () => import('../views/practice/Practiceadd')
// 
const Courseresource = () => import("../views/courseResource/Courseresource")
// 问卷
const Questionareshow = () => import("../views/questionare/Questionareshow")
const Questionareupdate2 = () => import("../views/questionare/Questionareupdate2")
const Questionareadd = () => import("../views/questionare/Questionareadd")
// 试题试卷
const KnowledgeManage = () => import("../views/Testpaper/KnowledgeManage")
const Pointadd = () => import("../views/Testpaper/Pointadd")
const Pointupdate = () => import("../views/Testpaper/Pointupdate")

// 作业管理
const Homeworkshow = () => import("../views/homework/Homeworkshow")
const Homeworkadd = () => import("../views/homework/Homeworkadd")
const Homeworkupdate = () => import("../views/homework/Homeworkupdate")
// 测评
const Cepingshow = () => import("../views/cepingManage/cepingshow")
const Cepingupdate = () => import("../views/cepingManage/cepingupdate")
// 题型管理
const TopicManage = () => import("../views/Testpaper/TopicManage")
const Topicadd = () => import("../views/Testpaper/Topicadd")
const Topicupdate = () => import("../views/Testpaper/Topicupdate")


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/courseshow', component: Courseshow },
      { path: '/courseupdate', component: Courseupdate },
      { path: '/courseadd', component: CoursereAdd },
      { path: '/scoreshow', component: Scoreshow },
      { path: '/scoreupdate', component: Scoreupdate },
      { path: '/teacherlist', component: Teacherlist },
      { path: '/question', component: Question },
      { path: '/questionupdate', component: Questionupdate },
      { path: '/practiceshow', component: Practiceshow },
      { path: '/practiceupdate', component: Practiceupdate },
      { path: '/practiceupdate2', component: Practiceupdate2 },
      { path: '/practiceadd2', component: Practiceadd2 },
      { path: '/practiceadd', component: Practiceadd },
      { path: '/courseresource', component: Courseresource },
      { path: '/questionareshow', component: Questionareshow },
      { path: '/questionareupdate2', component: Questionareupdate2 },
      { path: '/questionareadd', component: Questionareadd },
      { path: '/questionareadd', component: Questionareadd },
      { path: '/knowledgeManage', component: KnowledgeManage },
      { path: '/topicManage', component: TopicManage },
      { path: '/homeworkshow', component: Homeworkshow },
      { path: '/pointadd', component: Pointadd },
      { path: '/pointupdate', component: Pointupdate },
      { path: '/homeworkadd', component: Homeworkadd },
      { path: '/homeworkupdate', component: Homeworkupdate },
      { path: '/cepingshow', component: Cepingshow },
      { path: '/cepingupdate', component: Cepingupdate },
      { path: '/topicadd', component: Topicadd },
      { path: '/topicupdate', component: Topicupdate },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router