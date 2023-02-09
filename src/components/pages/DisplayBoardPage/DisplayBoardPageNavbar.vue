<template>
  <nav class="navbar navbar-dark gradient-ease">
    <div class="container">
      <div class="row">
        <div class="col-2">
          <a class="navbar-brand" href="#">
            <img src="../../../assets/logo.svg" alt="" width="200">
          </a>
        </div>
      </div>
      <div class="col-10">
        <display-board-page-accounts></display-board-page-accounts>
      </div>
    </div>
  </nav>
</template>

<script>
import DisplayBoardPageAccounts from "@/components/pages/DisplayBoardPage/DisplayBoardPageAccounts.vue";

export default {
  name: "DisplayBoardPageNavbar",
  components: {DisplayBoardPageAccounts}
}
</script>

<style scoped>
.gradient-ease {
    background: linear-gradient(0deg, #9aca3c, #d5364b);
    background-size: 400% 400%;

    -webkit-animation: gradient-ease 10s ease infinite;
    -moz-animation: gradient-ease 10s ease infinite;
    animation: gradient-ease 10s ease infinite;
}

@-webkit-keyframes gradient-ease {
    0%{background-position:50% 0%}
    50%{background-position:50% 100%}
    100%{background-position:50% 0%}
}

@-moz-keyframes gradient-ease {
    0%{background-position:50% 0%}
    50%{background-position:50% 100%}
    100%{background-position:50% 0%}
}

@keyframes gradient-ease {
    0%{background-position:50% 0%}
    50%{background-position:50% 100%}
    100%{background-position:50% 0%}
}
</style>