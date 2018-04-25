<template>
    <div class="box" v-for="c in contacts" :key="c.no">
        <span @click="navigate(c.no)">[{{c.name}}]</span>
    </div>
    <router-view></router-view>
</template>
<script>
export default {
    name: "test",
    data: function () {
        return {
            contacts: contactlist.contacts
        };
    },
    methods: {
        navigate(no){
            if(confirm("상세 보기를 보시겠습니까?")){
                this.$router.push({name: 'contactbyno', params: {no: no}},
                    function () {
                        console.log("/contacts/" + no + " 로 이동 완료!");
                    })
            }
        }
    }
}

</script>