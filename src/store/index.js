import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nav: [
      {
        id: 1, name1: '课程管理', kids: [{
          id: 101, kname: '课程查看', path: '/courseshow'
        }, {
          id: 108, kname: '课程修改', path: '/courseupdate'
        }, {
          id: 109, kname: '课程添加', path: '/courseadd'
        }]
      },
      {
        id: 2, name1: '课程资源管理', kids: [{
          id: 118, kname: '课程资源总览', path: '/courseresource'
        }]
      },
      {
        id: 3, name1: '试卷试题管理', kids: [{
          id: 104, kname: '知识点管理', path: '/knowledgeManage'
        }, {
          id: 124, kname: '知识点添加', path: '/pointadd'
        }, {
          id: 125, kname: '知识点修改', path: '/pointupdate'
        }, {
          id: 151, kname: '题型管理', path: '/topicManage'
        }, {
          id: 152, kname: '题型添加', path: '/topicadd'
        }, {
          id: 153, kname: '题型修改', path: '/topicupdate'
        }]
      },
      {
        id: 4, name1: '作业管理', kids: [{
          id: 122, kname: '作业查看', path: '/homeworkshow'
        }, {
          id: 126, kname: '作业添加', path: '/homeworkadd'
        }, {
          id: 127, kname: '作业更新', path: '/homeworkupdate'
        }]
      },
      {
        id: 5, name1: '测评管理', kids: [{
          id: 123, kname: '评测查看', path: '/cepingshow'
        }, {
          id: 150, kname: '评测修改', path: '/cepingupdate'
        }]
      },
      {
        id: 6, name1: '成绩管理', kids: [{
          id: 106, kname: '成绩查看', path: '/scoreshow'
        }, {
          id: 107, kname: '成绩修改', path: '/scoreupdate'
        }]
      },
      {
        id: 7, name1: '实训管理', kids: [{
          id: 113, kname: '实训总览', path: '/practiceshow'
        }, {
          id: 114, kname: '实训修改', path: '/practiceupdate'
        }, {
          id: 115, kname: '实训流程修改', path: '/practiceupdate2'
        }, {
          id: 116, kname: '实训流程添加', path: '/practiceadd2'
        }, {
          id: 117, kname: '实训添加', path: '/practiceadd'
        }]
      },
      {
        id: 8, name1: '问卷调查管理', kids: [{
          id: 119, kname: '问卷总览', path: '/questionareshow'
        }, {
          id: 120, kname: '问卷详情查看', path: '/questionareupdate2'
        }, {
          id: 121, kname: '问卷添加', path: '/questionareadd'
        }]
      },
      {
        id: 9, name1: '教学效果评价', kids: [{
          id: 110, kname: '教师效果查看', path: '/teacherlist'
        }]
      },
      {
        id: 10, name1: '问题中心', kids: [{
          id: 111, kname: '问题查看', path: '/question'
        }, {
          id: 112, kname: '问题回复', path: '/questionupdate'
        }]
      },
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
})
