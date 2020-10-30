import router from '@/router';
export const routerBeforeEach = () => {
    router.beforeEach(async (to, from, next) => {
        // console.log('路由守卫', to);
        next();
    });
}