<template>
    <div>
        <section id="headerSection">
            <div class="container position-absolute titleContainer">
                <div class=" row pt-5">
                    <div class="col-md-12 titleCol">
                        <h1 class="noSelect text-center">
                            <br>
                            <br>
                        </h1>
                    </div>
                    <div class="col-md-12 subTitleCol">
                        <h4 class="text-center">
                        </h4>
                    </div>
                </div>
                <img src="../assets/img/aaiss.svg" class="img-fluid brainImage noSelect"/>
                <Robot />
                <img src="../assets/img/aaiss.png" class="aaissHeader" />
            </div>
        </section>


        <section id="aboutSection" class="sub-section" v-if="about!== '' ">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12 justify-content-center">
                        <div class="row">
                            <div class="col-md-12 mx-auto">
                                <h2 class="font-weight-bold text-center text-color-blue">About the Event</h2>
                                <p class="text-justify aboutText text-color-blue">
                                    {{about}}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!--        <section id="presentation-and-workshops" class="sub-section" v-if="about!== '' ">-->
        <!--            <div class="container">-->
        <!--                <div class="row justify-content-center">-->
        <!--                    <div class="col-md-12 justify-content-center">-->
        <!--                        <div class="row">-->
        <!--                            <div class="mx-auto">-->
        <!--                                <router-link to="/workshops+presentation" class="button">-->
        <!--                                    Presentation and workshops-->
        <!--                                    <span class="material-icons">-->
        <!--                                      launch-->
        <!--                                    </span>-->
        <!--                                </router-link>-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </section>-->



        <section id="speakersSection" v-if="presenters.length !== 0">
            <div class="container">
                <div class="row pt-5">
                    <div class="col-md-12">
                        <h1 class="text-center font-weight-bold text-color-blue">Invited Speakers</h1>
                    </div>
                </div>
                <div class="row centeralizedRow pt-3">
                    <div class="col-lg-3" :key="speaker.id" v-for="speaker in presenters">
                        <SpeakerBlock :speaker="speaker"></SpeakerBlock>
                    </div>
                </div>
            </div>
        </section>


        <section id="teacherSection" v-if="teachers.length !== 0">
            <div class="container">
                <div class="row pt-5">
                    <div class="col-md-12">
                        <h1 class="text-center font-weight-bold  text-color-blue">Workshops</h1>
                    </div>
                </div>
                <div class="row centeralizedRow pt-3">
                    <div class="col-lg-3" :key="speaker.id" v-for="speaker in teachers">
                        <TeacherBlock :speaker="speaker"></TeacherBlock>
                    </div>
                </div>
            </div>
        </section>

        <section id="committeeSection">
                   <div class="container">
                       <div class="row pt-5">
                           <div class="col-md-12">
                               <h1 class="text-center font-weight-bold text-white">Scientific Committee</h1>
                           </div>
                       </div>
                       <div class="row centeralizedRow pt-3">
                           <div class="col-lg-3" :key="scientificCommittee.indexOf(member)"
                                v-for="member in scientificCommittee">
                               <CommitteMemberBlock :member="member"></CommitteMemberBlock>
                           </div>
                       </div>
                   </div>
               </section>

        <section id="scheduleSection">
            <div class="container">
                <div class="row pt-5">
                    <div class="col-md-12">
                        <h1 class="text-center font-weight-bold text-color-blue">Schedule</h1>
                    </div>
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table table-bordered table-sm">
                                <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Timing</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Lecturer</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colspan="4" class="firstSpecRow text-center font-weight-bold">
                                        Workshops
                                    </td>
                                </tr>
                                <tr v-for="talk in sortTable" :key="talk.name"  v-if="talk.type === 'Workshop'">
                                    <td v-if="scheduled === 'true'">{{talk.date.toDateString()}}</td>
                                    <td v-else>Coming Soon...</td>
                                    <td v-if="scheduled === 'true'">{{talk.date.toUTCString().split(' ')[4].split(':')[0] +":"+talk.date.toUTCString().split(' ')[4].split(':')[1]
                                        +"_"+ talk.end.toUTCString().split(' ')[4].split(':')[0] +":"+talk.end.toUTCString().split(' ')[4].split(':')[1]}}</td>
                                    <td v-else>-</td>
                                    <td >{{talk.name}}</td>
                                    <td>{{talk.lecturer}}
                                    </td>

                                </tr>
                                <tr>
                                    <td colspan="4" class="firstSpecRow text-center font-weight-bold">
                                        Presentations
                                    </td>
                                </tr>
                                <tr v-for="talk in sortTable" :key="talk.name" v-if="talk.type === 'Presentation'">
                                    <td v-if="scheduled === 'true'">{{talk.date.toDateString()}}</td>
                                    <td v-else>Coming Soon...</td>
                                    <td v-if="scheduled === 'true'">{{talk.date.toUTCString().split(' ')[4].split(':')[0] +":"+talk.date.toUTCString().split(' ')[4].split(':')[1]
                                        +"_"+ talk.end.toUTCString().split(' ')[4].split(':')[0] +":"+talk.end.toUTCString().split(' ')[4].split(':')[1]}}</td>
                                    <td v-else>-</td>
                                    <td>{{talk.name}}</td>
                                    <td>{{talk.lecturer}}
                                    </td>

                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section id="buttonSection">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12 justify-content-center">
                        <button @click.prevent="showRegisterSoonMessage()"
                                v-if="register === '/'"
                                class="btn btn-lg btn-block float-left regBtn">
            <span v-bind:class="{'small' : smallerFontSize}">
                                                {{registerValue}}
                                                </span>
                        </button>
                        <a v-else :href="register"
                           class="btn btn-primary btn-lg btn-block float-left regBtn"
                           target="_blank">{{registerValue}}</a>
                    </div>
                </div>
            </div>
        </section>

        <section id="organizerSection">
            <div class="container">
                <div class="row pt-5">
                    <div class="col-md-12">
                        <h1 class="text-center font-weight-bold text-white">Organizer</h1>
                    </div>
                </div>
                <div class="row pt-5 pb-5 details">
                    <div class="col-md-6 text-white text-center text-md-start">

                        <h5 class="organizerName">Students' Scientific Chapter of Computer Engineering
                            Department of Amirkabir University of Technology</h5>
                        <h6 class="organizerAddress mt-5">Website : <a href="http://ceit-ssc.ir" target="_blank">ceit-ssc.ir</a>
                        </h6>
                        <h6 class="organizerEmail">
                            Email: <a href="mailto:ceit.aaiss@gmail.com">ceit.aaiss@gmail.com</a>
                            
                            </h6>
                        <h6 class="organizerEmail">
                            Telegram: <a href="http://telegram.me/aaiss_aut">@aaiss_aut</a>
                            </h6>

                    </div>

                    <div class="col-md-6 " align="center">
                            <div class="col-md-12">
                                <img src="../assets/img/ssc-logo-white-horizontal.png" alt="ssc logo" class="img-fluid px-5"
                                     draggable="false" >
                            </div>
                        </div>

                </div>
            </div>
        </section>
    </div>

</template>

<script>
    // @ is an alias to /src
    import SpeakerBlock from '../components/SpeakerBlock';
    import TeacherBlock from "../components/TeacherBlock";
    import CommitteMemberBlock from '../components/CommitteeMemberBlock.vue';
    import Robot from "../components/Robot.vue"
    import axios from "axios";


    export default {
        name: 'Home',
        data: function () {
            return {
                registerValue: 'Registration',
                smallerFontSize: false,
                about: "",
                workshops: [],
                presentations: [],
            }
        },
        
        computed: {
            
            presenters: function () {
                return this.$store.getters.getPresenters;
            },
            teachers: function () {
                return this.$store.getters.getTeachers;
            },
            scientificCommittee: function () {
                return this.$store.getters.getScientificCommittee;
            },
            register: function () {
                if (this.$store.getters.getRegistrationStatus === 'false') {
                    return "/"
                }
                return "/register/user"
            },
            scheduled: function () {
                return this.$store.getters.getScheduledStatus
            },
            sortTable: function () {
                let talks = [];
                let presenters = this.$store.getters.getPresenters;
                let teachers = this.$store.getters.getTeachers;
                this.presentations.forEach(function (presentation) {
                    if(!presentation.hasOwnProperty('is_full') ){
                        let eachTalk = new Object();
                        eachTalk.name = presentation.name;
                        eachTalk.date = new Date(Date.parse(presentation.start_date));
                        eachTalk.end = new Date(Date.parse(presentation.end_date));
                        for (let i = 0; i < presenters.length; i++) {
                            if (presenters[i].id === presentation.presenters[0])
                                eachTalk.lecturer = presenters[i].name;
                        }
                        eachTalk.type = 'Presentation';
                        talks.push(eachTalk);
                    }

                });

                this.workshops.forEach(function (workshop) {
                    let eachTalk = new Object();
                    eachTalk.name = workshop.name;
                    eachTalk.date = new Date(Date.parse(workshop.start_date));
                    eachTalk.end = new Date(Date.parse(workshop.end_date));
                    eachTalk.lecturer = ""
                    for (let i = 0; i <workshop.teachers.length ; i++) {
                        let str = "";
                        if(i < workshop.teachers.length -1) str = "/";
                            for (let j = 0; j <teachers.length ; j++) {
                            if(teachers[j].id === workshop.teachers[i])
                                eachTalk.lecturer = eachTalk.lecturer.concat(teachers[j].name, str);
                        }
                    }
                    eachTalk.type = 'Workshop';

                    talks.push(eachTalk);
                });

                const sortedTalks = talks.sort((a, b) => a.date - b.date)

                return sortedTalks

            },

        },
        components: {
            TeacherBlock,
            SpeakerBlock,
            Robot,
            CommitteMemberBlock
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
            getAbout: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + '/misc/about/',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'GET',
                    }).then((response) => {
                        this.about = response.data.desc;
                        resolve(response.data);
                    }).catch((error) => {
                        reject(error);
                    })
                })
            },

            getTableData: async function () {
                await this.$store.dispatch('getPresenters');
                await this.$store.dispatch('getTeachers');
                await this.$store.dispatch('getPresentations');
                await this.$store.dispatch('getWorkshops');
                this.workshops = this.$store.getters.getWorkshops;
                this.presentations = this.$store.getters.getPresentations;
            }
        },
        created() {
            
            this.$store.dispatch('getRegisterStatus');
            this.$store.dispatch('getScheduledStatus');
            this.$store.dispatch('getScientificCommittee');
            this.getTableData();
            this.getAbout();

        },
        mounted() {
            if(this.$route.query.payment_status){
                console.log(this.$route.query.payment_status);
                if(this.$route.query.payment_status === "true" || this.$route.query.payment_status === true){
                    console.log("inside true");
                    this.$notify({
                        group: "payment",
                        title: "Success",
                        text: "Paid successfully! Please check your mail spam.",
                        type: "success"
                    });
                }
                else if(this.$route.query.payment_status === "false" || this.$route.query.payment_status === false){
                    console.log("inside false");
                    this.$notify({
                        group: "payment",
                        title: "Error",
                        text: "Something went wrong during payment!",
                        type: "error"
                    });
                }
            }
            else{
                console.log("null");
            }
            scrollTo(0, 0);
        }
    }
</script>

<style scoped>
    #headerSection {
        min-height: 100vh;
        width: 100%;
        background: #004958;
        background: -moz-radial-gradient(center, ellipse cover, #102e48 0%, #535053 100%);
        background: -webkit-radial-gradient(center, ellipse cover, #3f494c 0%, #1D4176 100%);
        background: radial-gradient(ellipse at center, #484c5a 0%, #16375 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e4e3df', endColorstr='#c6c4b6', GradientType=1);
    }


    .titleContainer {
        top: 42%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
    }


    .titleCol {
        margin-bottom: 50px;
    }

    .subTitleCol h4 {
        color: white;
    }

    .titleCol h1 {
        color: #797B7F;
        text-align: center;
        line-height: 65px;
        font-weight: 700;
        cursor: default;
    }

    .noSelect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;
    }

    .brainImage {
        width: 70%;
        position: absolute;
        left: 47%;
        top: 51%;
        transform: translate(-50%, -50%);

    }

    .autLogo {
        left: 30px;
        bottom: 30px;
        width: 150px;
        height: 100px;
    }

    #aboutSection {
        width: 100%;
        background-color: #128D8A;
        color: white;
        min-height: 100%;
    }

    #aboutSection h2 {
        margin-top: 45px;
    }

    #aboutSection p {
        margin-bottom: 45px;
        line-height: 30px;
    }

    #speakersSection {
        background-color: #128D8A;
        min-height: 100vh;
        padding-bottom: 30px;
    }

    #speakersSection h1 {
        padding-top: 45px;
    }


    #teacherSection {
        background-color: #128D8A;
        padding-bottom: 30px;
    }

    #presentation-and-workshops {
        background: #ceccc0;
        padding: 30px;
    }

    #scheduleSection {
        background-color: #128D8A;
    }

    #committeeSection{
        background-color: #128D8A;
    }

    #buttonSection {
        background-color: #128D8A;
        min-height: 30vh;
    }

    #scheduleSection h1 {
        padding-top: 45px;
        padding-bottom: 30px;
    }

    #organizerSection {
        background-color: #004958;
    }

    .organizerEmail {
        margin-bottom: 10px;
    }

    .organizerAddress a, .organizerEmail a {
        text-decoration: none;
        color: white;
        transition: all 0.3s ease-in-out;
    }

    .organizerAddress a:hover, .organizerEmail a:hover {
        color: #c6c4b6;
    }

    .regBtn {
        background-color: white;
        margin-top: 50px;
        margin-bottom: 50px;
        color: #797B7F;
        border: none;
        font-size: 2rem;
    }

    .regBtn:hover {
        color: white;
        background-color: #004958;
        -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }

    .titleCol h1 {
        font-size: 4rem;
    }

    .ceitMapFrame {
        width: 100%;
        min-height: 350px;
        border-radius: 10px;
        -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

    }

    .text-color-blue {
        color: #e4e3e3;
    }

    .aboutText {
        font-weight: bolder;
        font-size: 18px;
    }

    td:first-child {
        text-align: center;
    }

    td[colspan="3"] {
        font-size: 16px;
        color: black;
    }

    td[colspan="4"] {
        font-size: 16.5px;
    }

    .table-responsive {
        background-color: white;
        font-size: 12px;
        padding: 10px;
        border-radius: 10px;
        -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }

    .details {
        display: flex;
        justify-content: center;
    }

    .ps-link {
        text-decoration: none;
        color: #128d94;
    }

    .ps-link:hover {
        color: #8e5751;
    }

    .material-icons {
    }

    .firstSpecRow{
    }
    .centeralizedRow{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .aaissHeader{
        position: absolute;
        top:30%;
        width:90%;
        left: 3%;
    }

    @media only screen and (min-width: 416px) and (max-width: 767.98px) {

        .small {
            font-size: 17px;
        }

        .titleContainer {
            top: 42%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
        }

        .titleCol {
            margin-bottom: 25px;
        }

        .titleCol h1 {
            font-size: 2.7rem;
            line-height: 45px;
        }
        .brainImage{
            width: 108%;
            position: absolute;
            left: 46%;
            top: 60%;
        }
        .aaissHeader{
            top: 45%;
            width: 90%;
            left: 4%;
        }
        
    }

    @media only screen and (min-width: 0) and (max-width: 415px) {
        .titleContainer {
            top: 42%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
        }

        .titleCol {
            margin-bottom: 10px;
        }

        .titleCol h1 {
            font-size: 1.5rem;
            line-height: 30px;
        }

        .subTitleCol h4 {
            color: #55585d;
            font-size: 1rem;
        }

        .small {
            font-size: 17px;
        }
        .brainImage{
            width: 75%;
            position: absolute;
            left: 49%;
            top: 60%;
        }
        .aaissHeader{
            top: 45%;
            width: 90%;
            left: 4%;
        }
    }
    
</style>