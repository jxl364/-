import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)
let originPush = VueRouter.prototype.push;
let originReplace= VueRouter.prototype.replace;

//重写push|replace
//第一个参数：告诉原来push方法，你往哪里跳（传递哪些参数）
//call|apply区别
//相同点：都可以调用函数一次，都可以篡改函数的上下文一次
//不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this,location, resolve, reject)
    } else {
        originPush.call(this,location, ()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this,location, resolve, reject)
    } else {
        originReplace.call(this,location, ()=>{},()=>{})
    }
}

//配置路由
let router = new VueRouter({
    routes,
    scrollBehavior() {
        return { y: 0 }
    }
})
 
router.beforeEach(async(to,from,next)=>{
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token) {
        if (to.path == '/login') {
            next('/home')
        } else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch('userInfo')
                    next()
                } catch (error) {
                    await store.dispatch('logOut')
                    next('/login')
                }
                
            }
        }
    } else {
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect='+toPath)
        } else {
            next()
        }
    }
})

export default router