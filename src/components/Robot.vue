<template>
    <div>
        <img src="../assets/img/rightHand3.png" alt="rightHand" draggable="false" class="rightHand"/>
        <img src ="../assets/img/body3.png" alt ="body img" draggable="false" class="body"/>
        <img src="../assets/img/leftHand.png" alt="leftHand" draggable="false" class="leftHand"/>
    </div>    
</template>

<script>
    export default {
        name: "Robot",
        data: function () {
            return {}
        },
    }
</script>

<style scoped>


.rightHand{
    z-index: 999;
    width: 2.5%;
    position: absolute;
    left: 45%;
    top: 41%;
    transform-origin: top right;
    -webkit-animation: rightRotating 2s linear infinite alternate;
    -moz-animation: rightRotating 2s linear infinite alternate;
    -ms-animation: rightRotating 2s linear infinite alternate;
    -o-animation: rightRotating 2s linear infinite alternate;
    animation: rightRotating 1s linear infinite alternate;
}

.leftHand{
    position: absolute;
    width: 4%;
    left: 49%;
    top: 48%;
    transform-origin: top left;
    -webkit-animation: leftRotating 2s linear infinite alternate;
    -moz-animation: leftRotating 2s linear infinite alternate;
    -ms-animation: leftRotating 2s linear infinite alternate;
    -o-animation: leftRotating 2s linear infinite alternate;
    animation: leftRotating 1s linear infinite alternate;
}

.body{
  z-index: 599;
  width: 3%;
    position: absolute;
    left: 47%;
    top: 21%;
}


@-webkit-keyframes rightRotating /* Safari and Chrome */ {
 
 from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
    transform: rotate(-60deg);
  }
}
@keyframes rightRotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
    transform: rotate(-60deg);
  }
  }

  @-webkit-keyframes leftRotating /* Safari and Chrome */ {
 
 from {
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
    transform: rotate(30deg);
  }
  to {
    -webkit-transform: rotate(60deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
  }
}
@keyframes leftRotating {
  from {
    -ms-transform: rotate(30deg);
    -moz-transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
    transform: rotate(30deg);
  }
  to {
    -ms-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
  }
}

  @media only screen and (min-width: 0) and (max-width: 767.98px) {

        .body{
          left: 47%;
    top: 40%;
    width: 3%;
        }
        .rightHand{
          top:53%;
        }
        .leftHand{
          width: 5%;
    left: 49%;
    top: 53%;
        }
    }

    

</style>