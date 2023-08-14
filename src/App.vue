<template>
    <div class="h-100">
        <particles-bg type="lines" :bg="true"  class="particles" num="100"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet">
        <notifications group="auth" position="top center" classes="my-vue-notification"></notifications>
        <notifications group="payment" position="top center" classes="my-vue-notification"></notifications>
        <TopMenu></TopMenu>
        <transition name="fade" mode="out-in">
            <router-view class="iransans "/>
        </transition>
<!--        <Footer></Footer>-->
    </div>
</template>

<script>

    import TopMenu from "./components/TopMenu";
    import moment from 'moment-timezone';
    moment.tz.setDefault('Asia/Amman')

    export default {
        name: 'App',
        data: function () {

            return {}
        },
        components: {
            TopMenu,
        }, methods: {},
        mounted() {
        }

    }
</script>

<style lang="scss">

    *{
        scroll-behavior: smooth;
        font-variant-numeric: normal;
    }

    html, body {
        height: 100%;
    }

    @font-face {
        font-family: system-ui;
        /*src : url('assets/fonts/iranSansFarsiNumber.ttf') format('truetype');*/

    }

    .iransans {
        font-family: system-ui;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }

    div[style*="z-index: 10000"] {
        display: none !important;
    }

    .particles {
        z-index: 0 !important;
        //position: fixed !important;
    }
    .notification-title {
        font-family : system-ui !important;
        direction: rtl !important;
        text-align:left;
    }
    .notification-content {
        font-family : system-ui !important;
        direction: ltr !important;
        text-align:left;
    }
    .my-vue-notification{
        padding: 10px;
        margin: 0 5px 5px;

        font-size: 12px;

        color: #ffffff;
        background: #44A4FC;
        border-left: 5px solid #187FE7;

        &.success {
            background: #004958;
            border-left-color: #122c48;
        }
        &.warn {
            background: #ffb648;
            border-left-color: #f48a06;
        }

        &.error {
            background: #E54D42;
            border-left-color: #B82E24;
        }

    }


</style>
