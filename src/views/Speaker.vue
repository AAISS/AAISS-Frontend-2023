<template>
    <section id="speakersSection">
        <!--        <div id="particles-js" class="position-absolute"></div>-->
        <div class="container pt-5" v-if="presenter != null">
            <div class="row mt-5">
                <div class="col-lg-3">
                    <SpeakerBlock :speaker="presenter"></SpeakerBlock>
                                        <button @click.prevent="showRegisterSoonMessage()"
                                                v-if="register === '/'"
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
                    <h1 class="display-5">
                        {{presentation.name}}
                    </h1>

                    <!--                    <strong>-->
                    <!--                        Location-->
                    <!--                    </strong>-->
                    <!--                    <address>-->
                    <!--                        {{speaker.talk_location}}-->
                    <!--                    </address>-->

                    <strong v-if="presentation.start_date !== '' && scheduled === 'true'">Date and Time</strong>
                    <p v-if="presentation.start_date !== '' && scheduled === 'true'">
                        <date>
                            <span class="font-weight-bold">On: </span> {{datePicker(presentation.start_date)}}
                        </date>
                        <br>
                        <time>
                            <span class="font-weight-bold">At: </span>{{timePicker(presentation.start_date)}}
                        </time>
                    </p>

                    <strong>Abstract</strong>
                    <p class="text-justify" style="line-height:30px;">
                        {{presentation.desc}}
                    </p>

                    <strong>Bio</strong>
                    <p class="text-justify" style="line-height:30px">
                        {{presenter.bio}}
                    </p>

                    <strong v-if="presenter.cv_path !== ''">CV</strong>
                    <p v-if="presenter.cv_path !== ''" class="text-justify" style="line-height:30px" >
                        {{presenter.cv_path}}
                    </p>

                </div>
            </div>
        </div>

    </section>
</template>

<script>
    import SpeakerBlock from '../components/SpeakerBlock'

    export default {
        name: "Speaker",
        data: function () {
            return {
                registerValue: 'Registration',
                smallerFontSize: false,
            }
        }, computed: {
            presenter: function () {
                return this.$store.getters.getCurrentPresenter;
            },
            presentation: function () {
                return this.$store.getters.getCurrentPresentation;
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
            SpeakerBlock
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
            datePicker: function (date) {
                return date.split('T')[0];
            },
            timePicker: function (date) {
                var d = date.split('T')[1];
                d = d.split('Z')[0];
                return d.split('.')[0]
            },
        },
        async created() {
            try {
                await this.$store.dispatch('getPresenterById', this.$route.params.id);
                this.$store.dispatch('getPresentationById', this.presenter.presentations[0]);
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

    .infoBlock p, address {
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