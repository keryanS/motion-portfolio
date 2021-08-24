<template>
  <div id="app" class="demo-2">
    <icons/>
    <main class="main main--demo-2">
      <BaseOverlay></BaseOverlay>

      <StagesManager></StagesManager>

      <div class="global-menu">
        <div class="global-menu__wrap">
          <a class="global-menu__item global-menu__item--demo-2" href="#">Introduction</a>
          <a class="global-menu__item global-menu__item--demo-2" href="#">Expérience</a>
          <a class="global-menu__item global-menu__item--demo-2" href="#">Compétences</a>
          <a class="global-menu__item global-menu__item--demo-2" href="#">Réalisation</a>
          <a class="global-menu__item global-menu__item--demo-2" href="#">Contact</a>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import BaseOverlay from './components/BaseOverlay.vue'
import StagesManager from './components/StagesManager.vue'
import Icons from './components/Icons.vue'


export default {
  name: 'App',
  components: {
    BaseOverlay,
    StagesManager,
    Icons
  },
  mounted: function(){
    document.documentElement.classList.add('js');

    setTimeout(() => document.body.classList.add('render'), 2000);

  }
}
</script>

<style lang="scss">
  html {
    background: var(--color-main-bg);
  }

  body {
    font-family: 'Source Sans Pro', Avenir, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    min-height: 100vh;
    color: #57585c;
    color: var(--color-text);
    background-color: #fff;
    background-color: var(--color-bg);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  main {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: var(--color-main-bg);
  }

  /* Fade effect */
  body {
    opacity: 0.8;
    transition: opacity 0.5s, transform 0.5s;
    transform: scale(0);
  }

  .js body.render {
    opacity: 1;
    transform: scale(1);
  }

  @include medium-down(){
    html,
    body {
      overflow-x: hidden;
      width: 100vw;
      height: 100%;
    }
  }
</style>
