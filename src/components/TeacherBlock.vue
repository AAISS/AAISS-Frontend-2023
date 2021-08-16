<template>
    <router-link :to="'/teachers/' + speaker.id" class="speakerBlock d-block">
        <div class="text-center imgWrapper">
            <img :src="this.$store.getters.getMediaRoot + speaker.pic" alt="img" class="rounded-circle img-fluid" draggable="false">
        </div>
        <div class="text-center speakerInfo">
            <router-link :to="'/teachers/' + speaker.id">
                <h5>{{speaker.name}}</h5>
            </router-link>
            <div v-if="this.$route.name !== 'teacher'">
                <div v-for="value in speaker.workshops" :key="value">
                    <h6 >{{value}}</h6>
                    <hr v-if="Object.values(speaker.workshops)[Object.values(speaker.workshops).length - 1] !== value">
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: "TeacherBlock",
        data: function () {
            return {}
        },
        props: {
            speaker: {},
        },
        computed:{
          workshop: function () {
                return this.$store.getters.getCurrentWorkshop;
          }
        },
        created(){
        }
    }
</script>

<style scoped>
    .speakerBlock {
        transition: all 0.1s ease-in-out;
        border-radius: 10px;
        background-color: #ffffff;
        height: 325px;
        margin-top: 15px;
        padding: 10px;
        -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        text-decoration: none;
    }

    .speakerBlock:hover {
        -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 1);
        -moz-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 1);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 1);
    }

    .imgWrapper img {
        width: 110px;
        height: 110px;
    }

    .speakerBlock .imgWrapper {
        padding-top: 30px;
        padding-bottom: 30px;
    }

    .speakerInfo h5 {
        color: #1b7979;
        font-size: 1em;
        margin-bottom: 20px;
    }

    .speakerInfo h6 {
        color: #707070;
        line-height: 25px;
    }

    .speakerInfo {
        padding-bottom: 30px;
    }

    @media (max-width: 1199.98px) {
        .speakerBlock {
            height: 400px;
        }
    }

    @media (max-width: 991.98px) {
        .speakerBlock {
            height: auto;
        }
    }

    hr {
        margin-top: 0;
        margin-bottom: 0;
        background-color: #1b7979;
    }

</style>