<script>
import {defineComponent} from 'vue'
import AccountPageAccountInfo from "@/components/pages/ViewCardPage/AccountPageAccountInfo.vue";
import VNavbar from "@/components/AppNavbar.vue";
import AppLayout from "@/components/AppLayout.vue";

export default defineComponent({
  name: "CardPage",
  components: {AppLayout, VNavbar, AccountPageAccountInfo}
})
</script>

<template>
<!--  <div class="flip-box mx-auto mt-4">-->
<!--    <div class="flip-box-inner">-->
<!--      <div class="flip-box-front">-->
<!--        <img src="../../../assets/card_front.svg" alt="Paris" style="width:300px;height:200px">-->
<!--      </div>-->
<!--      <div class="flip-box-back">-->
<!--        <img src="../../../assets/card_back.svg" alt="Paris" style="width:300px;height:200px">-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <AppLayout page-name="View my card">
    <AccountPageAccountInfo />
  </AppLayout>
</template>

<style scoped>
.flip-box {
  background-color: transparent;
  width: 300px;
  height: 200px;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-box:hover .flip-box-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-box-front, .flip-box-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}


/* Style the back side */
.flip-box-back {
  transform: rotateY(180deg);
}
</style>