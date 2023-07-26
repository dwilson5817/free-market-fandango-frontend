<template>
  <div class="gradient-ease">
    <div class="px-3">
      <div class="grid grid-cols-7">
        <div class="py-4 pr-4 text-center mx-auto">
          <img src="../../../../assets/logo.svg" class="h-12" alt="Flowbite Logo" />
        </div>

        <div class="w-full border-white border-x-2 col-span-6 bg-gray-900 bg-opacity-20">
            <display-board-page-accounts />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DisplayBoardPageAccounts from "@/components/pages/Admin/DisplayBoardPage/DisplayBoardPageAccounts.vue";
import {Navbar, NavbarCollapse, NavbarLink, NavbarLogo} from "flowbite-vue";

export default {
  name: "DisplayBoardPageNavbar",
  components: {NavbarLink, NavbarCollapse, NavbarLogo, Navbar, DisplayBoardPageAccounts},
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