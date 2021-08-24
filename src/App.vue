<template>
  <div id="app" class="demo-2">
    <icons/>
    <main class="main main--demo-2">
      <BaseOverlay v-bind:stage="stage" v-bind:tabs="tabs" v-bind:menuOpen="menuOpen"></BaseOverlay>

      <component v-bind:is="stage"></component>

      <div class="global-menu">
        <div class="global-menu__wrap">
          <li
            v-for="tab in tabs"
            v-bind:key="tab"
            v-bind:class="['global-menu__item', {'is-opened': menuOpen === true}, { active: currentTab === tab }]"
          >
            <a href="#" v-on:click="waitanim(tab)">{{ tab }}</a>
          </li>

        </div>
      </div>

    </main>
  </div>
</template>

<script>
import BaseOverlay from './components/BaseOverlay.vue'
import Icons from './components/Icons.vue'
import {ShapeOverlays} from '@/js/shapeOverlays.js'
import Introduction from './components/stage/Introduction.vue'
import Experience from './components/stage/Experience.vue'



export default {
  name: 'App',
  components: {
    BaseOverlay,
    Icons,
    Introduction,
    Experience
  },
  data: function(){
    return {
      currentTab: "",
      tabs: ["Introduction", "Experience", "Compétences", "Réalisation", "Contact"],
      menuOpen: false,
    }
  },
  computed: {
    stage: function() {
      return this.currentTab;
    }
  },
  methods: {
    waitanim: function(tab) {
      this.currentTab = ""
      setTimeout(()=>{
        this.currentTab = tab
      },1000);
      }
    },
  mounted: function(){
    document.documentElement.classList.add('js');
    console.log(this.stage);

    setTimeout(() => document.body.classList.add('render'), 2000);

    const elmHamburger = document.querySelector('.hamburger');
    const gNavItems = document.querySelectorAll('.global-menu__item');
    const elmOverlay = document.querySelector('.shape-overlays');
    const overlay = new ShapeOverlays(elmOverlay);

    document.addEventListener('click', (e) => {
      if(e.target.parentElement.classList.contains('global-menu__item')) {
        if (overlay.isAnimating) {
          return false;
        }
        overlay.toggle();
        if (overlay.isOpened === true) {
          elmHamburger.classList.add('is-opened-navi');
          for (let i = 0; i < gNavItems.length; i++) {
            gNavItems[i].classList.add('is-opened');
          }
        } else {
          elmHamburger.classList.remove('is-opened-navi');
          for (let i = 0; i < gNavItems.length; i++) {
            gNavItems[i].classList.remove('is-opened');
          }
        }
      }
    });

    elmHamburger.addEventListener('click', () => {
      if (overlay.isAnimating) {
        return false;
      }
      overlay.toggle();
      if (overlay.isOpened === true) {
        elmHamburger.classList.add('is-opened-navi');
        for (let i = 0; i < gNavItems.length; i++) {
          gNavItems[i].classList.add('is-opened');
        }
      } else {
        elmHamburger.classList.remove('is-opened-navi');
        for (let i = 0; i < gNavItems.length; i++) {
          gNavItems[i].classList.remove('is-opened');
        }
      }
    });
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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-main-bg);
  }

  /* Fade effect */
  body {
    opacity: 0.8;
    transition: opacity 0.5s, transform 0.5s;
    transform: scale(0);
    visibility: hidden;
  }

  .js body.render {
    opacity: 1;
    transform: scale(1);
    visibility: visible;
  }

  .content {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    pointer-events: none;
  }

  .title{
    color: var(--color-title);
    font-family: var(--font-family-title);
    font-size: var(--font-size-title);
    font-weight: var(--font-weight-title);
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
