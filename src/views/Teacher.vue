<template>
    <section id="speakersSection">
        <!--        <div id="particles-js" class="position-absolute"></div>-->
        <div class="container pt-5" v-if="teacher != null">
            <div class="row mt-5">
                <div class="col-lg-3">
                    <TeacherBlock :speaker="teacher"></TeacherBlock>
                    <button @click.prevent="showRegisterSoonMessage()"
                            v-if=" register === '/'"
                            class="btn btn-primary btn-lg btn-block float-left regBtn"
                    >
                                            <span v-bind:class="{'small' : smallerFontSize}">
                                                {{registerValue}}
                                            </span>
                    </button>
                    <a v-else :href="register"
                       class="btn btn-primary btn-lg btn-block float-left regBtn" target="_blank">{{registerValue}}</a>
                </div>
                <div class="col-lg-9 infoBlock">
                    <div :key="workshops.indexOf(workshop)" v-for="workshop in workshops"> 
                        <h1 class="display-5">
                        {{workshop.name}}
                    </h1>

                    <!--                    <strong>-->
                    <!--                        Location-->
                    <!--                    </strong>-->
                    <!--                    <address>-->
                    <!--                        {{speaker.talk_location}}-->
                    <!--                    </address>-->

                    <strong v-if="workshop.start_date !== ''">Details</strong>
                    <p v-if="workshop.start_date !== ''">
                        <date v-if="scheduled === 'true'">
                            <span class="font-weight-bold">Date: </span> {{datePicker(workshop.start_date)}}
                        </date>
                        <br v-if="scheduled === 'true'">
                        <time v-if="scheduled === 'true'">
                            <span class="font-weight-bold">Time: </span>{{timePicker(workshop.start_date)}}
                        </time>
                        <br>
                        <duration>
                            <span class="font-weight-bold">Workshop Duration: </span>{{getDuration(workshop)}} Minutes
                        </duration>
                        <br>
                        <level v-if="scheduled === 'true' || scheduled === 'false'" >

                            <span class="font-weight-bold">Workshop Level: </span>{{workshop.level}}
                        </level>
                        <br>
                        <prerequisites v-if="workshop.prerequisites !== ''">
                            <span class="font-weight-bold">Prerequisites: </span>{{workshop.prerequisites }}
                        </prerequisites>
                        <br>
                        <project>
                            <span class="font-weight-bold" v-if="workshop.has_project === true">Participants will develop a project in this workshop.</span>
                        </project>

                    </p>



                    <strong>Syllabus</strong>
                    <div v-html="workshop.desc" class="text-justify html-b" style="line-height:30px;"></div>

                    </div>
                    <strong>Bio</strong>
                    <p class="text-justify" style="line-height:30px">
                        {{teacher.bio}}
                    </p>

                    <strong v-if="teacher.cv_path !== ''">CV</strong>
                    <p v-if="teacher.cv_path !== ''" class="text-justify" style="line-height:30px">
                        {{teacher.cv_path}}
                    </p>


                </div>
            </div>
        </div>

    </section>
</template>

<script>

    import TeacherBlock from "../components/TeacherBlock";

    export default {
        name: "Speaker",
        data: function () {
            return {
                registerValue: 'Registration',
                smallerFontSize: false,
            }
        }, computed: {

            teacher: function () {
                return this.$store.getters.getCurrentTeacher;
            },
            workshops: function () {
                console.log(this.$store.getters.getCurrentWorkshops);
                return this.$store.getters.getCurrentWorkshops
            },
            
            register: function () {
                if(this.$store.getters.getRegistrationStatus === 'false'){
                    return "/"
                }
                return "/register/user"
            },
            scheduled: function () {
                return this.$store.getters.getScheduledStatus
            }
        },
        components: {
            TeacherBlock
        },
        methods: {
            showRegisterSoonMessage: function () {
                this.registerValue = 'Registration is closed.';
                this.smallerFontSize = true;
                setTimeout(() => {
                    this.registerValue = 'Registration';
                    this.smallerFontSize = false;
                }, 2500)
            },
            getDuration: function (workshop) {
                console.log(this.timePicker(workshop.end_date));
                let endHour = this.timePicker(workshop.end_date).split(':')[0];
                let endMinute = this.timePicker(workshop.end_date).split(':')[1];
                let endSecond = this.timePicker(workshop.end_date).split(':')[2];
                let end = new Date(0, 0, 0, endHour, endMinute, endSecond);
                let startHour = this.timePicker(workshop.start_date).split(':')[0];
                let startMinute = this.timePicker(workshop.start_date).split(':')[1];
                let startSecond = this.timePicker(workshop.start_date).split(':')[2];
                let start = new Date(0, 0, 0, startHour, startMinute, startSecond);

                return Number(((end.getTime() - start.getTime()) / 60000).toFixed(2));
            },
            datePicker: function (date) {
                return date.split('T')[0];
            },
            timePicker: function (date) {
                var d = date.split('T')[1];
                d = d.split('Z')[0];
                d = d.split('.')[0];
                console.log(d);
                return d;
            }
        },
        async created() {
            try {
                await this.$store.dispatch('getTeacherById', this.$route.params.id);
                this.teacher.workshops.forEach(async (element) => {
                    await this.$store.dispatch('getWorkshopById', element);
                });

                this.$store.dispatch('getRegisterStatus');
                this.$store.dispatch('getScheduledStatus');

            } catch (e) {
                console.log(e);
            }
        },
        mounted() {
            scrollTo(0, 0);
        }

    }
</script>

<style scoped>

    #speakersSection {
        background: #ceccc0;
        /*background: -moz-radial-gradient(center, ellipse cover, #e4e3df 0%, #c6c4b6 100%);*/
        /*background: -webkit-radial-gradient(center, ellipse cover, #e4e3df 0%, #c6c4b6 100%);*/
        /*background: radial-gradient(ellipse at center, #e4e3df 0%, #c6c4b6 100%);*/
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e4e3df', endColorstr='#c6c4b6', GradientType=1);
        color: #797B7F;
        padding-bottom: 20px;
        min-height: 100vh;
    }

    h1.display-5 {
        padding-top: 10px;
        padding-left: 10px;
    }

    .infoBlock {
        border-radius: 10px;
        background-color: #ffffff;
        -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        margin-top: 15px;
        padding: 25px 25px 25px 30px;
    }

    .infoBlock p, address, .html-b {
        padding: 5px 30px;
    }


    .regBtn {
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: #C6C2C4;
        border: none;
    }

    .regBtn:hover {
        background-color: white;
        color: #C6C2C4;
    }

    .small {
        font-size: 12px;
    }

    @media (min-width: 0) and (max-width: 991.98px) {
        #speakersSection {
            height: auto;
        }
    }


</style>