<template>
  <transition name="fade">
    <div v-if="!hidden" class="cover">
      <div class="container mt-3">
        <div class="row">
          <div class="col">
            <div class="glitch" data-text="BREAKING NEWS">BREAKING NEWS</div>
            <div class="glow">BREAKING NEWS</div>
          </div>
            <div class="scanlines"></div>
        </div>

        <div class="card">
          <div class="card-body text-center">
           <video width="640" height="480" @ended="onEnd()" autoplay>
              <source :src="news.videoUrl" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "DisplayBoardBreakingNews",
  props: [
    'news',
    'hidden'
  ],
  methods: {
    onEnd() {
      this.$emit('ended');
    },
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.cover {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.8);
  z-index: 10;
}

/* ------------------------------------------ */

.glitch {
  color: rgb(255, 0, 0);
  position: relative;
  font-size: 6vw;
  animation: glitch 5s 5s infinite;
}

.glitch::before {
  content: attr(data-text);
  position: absolute;
  left: -2px;
  text-shadow: -5px 0 magenta;
  //background: rgb(0, 0, 0, 0.2);
  overflow: hidden;
  top: 0;
  animation: noise-1 3s linear infinite alternate-reverse, glitch 5s 5.05s infinite;
}

.glitch::after {
  content: attr(data-text);
  position: absolute;
  left: 2px;
  text-shadow: -5px 0 rgb(255, 100, 100);
  //background: rgb(0, 0, 0, 0.2);
  overflow: hidden;
  top: 0;
  animation: noise-2 3s linear infinite alternate-reverse, glitch 5s 5s infinite;
}

@keyframes glitch {
  1%{
    transform: rotateX(10deg) skewX(90deg);
  }
  2%{
    transform: rotateX(0deg) skewX(0deg);
  }
}

@keyframes noise-1 {
  $steps: 30;
  @for $i from 1 through $steps {
    #{percentage($i*(1/$steps))} {
      $top: random(100);
      $bottom: random(101 - $top);
      clip-path: inset(#{$top}px 0 #{$bottom}px 0);
    }
  }
}

@keyframes noise-2 {
  $steps: 30;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      $top: random(100);
      $bottom: random(101 - $top);
      clip-path: inset(#{$top}px 0 #{$bottom}px 0);
    }
  }
}

.scanlines {
  overflow: hidden;
  mix-blend-mode: difference;
}

.scanlines::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  background: repeating-linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 255, 255, 0.05) .5%,
    transparent 1%
  );

  animation: fudge 7s ease-in-out alternate infinite;
}


@keyframes fudge {
  from {
    transform: translate(0px, 0px);
  }
  to {
    transform: translate(0px, 2%);
  }
}

.glow {
  @extend .glitch;
  text-shadow: 0 0 1000px rgb(223, 191, 191);
  color: transparent;
  position: absolute;
  top: 0;
}
</style>