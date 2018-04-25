<!-- ContactByNo.vue -->
<script>
export default {
    beforeRouteUpdate(to, from, next) {
        console.log('** beforeRouteUpdate');
        this.no = to.params.no;
        next();
    }
};
</script>

<!-- App.vue -->
<script>
const router = new VueRouter({
    routes: [
        {
            path: '/contacts', name: 'contacts', component: Contacts,
            children: [
                {
                    path: ':no', name: 'contactbyno', component: ContactByNo,
                    beforeEnter: (to, from, next) => {
                        console.log('@@ beforeEnter: ' + from.path + ' --> ' + to.path);
                        if(from.path.startsWith("/contacts")){
                            next();
                        }else{
                            next("/home");
                        }
                    }
                }
            ]
        }
    ]
});
router.beforeEach((to, from, next) => {
    console.log('before Each');
    next();
});
router.afterEach((to, from) => {
    console.log("after Each!");
});
</script>