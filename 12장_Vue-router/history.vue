<script>
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/contacts', name: 'contacts', component: Contacts,
            children: []
        },
        {path: '*', component: NotFound}
    ]
});
</script>