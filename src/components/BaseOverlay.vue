
<template>
  <div class="content--fixed">
    <header class="header">
      <div class="header__links">
        <a href="/" title="Relancer l'aventure">
          <h1 class="header__title">Keryan Sanié</h1>
        </a>
      </div>
    </header>

    <a class="github" href="https://github.com/keryanS" title="Find my projects on GitHub"><svg class="icon icon--github"><use xlink:href="#icon-github"></use></svg></a>

    <Dots></Dots>

    <button class="hamburger">
      <div class="hamburger__line hamburger__line--01">
        <div class="hamburger__line-in hamburger__line-in--01"></div>
      </div>
      <div class="hamburger__line hamburger__line--02">
        <div class="hamburger__line-in hamburger__line-in--02"></div>
      </div>
      <div class="hamburger__line hamburger__line--03">
        <div class="hamburger__line-in hamburger__line-in--03"></div>
      </div>
      <div class="hamburger__line hamburger__line--cross01">
        <div class="hamburger__line-in hamburger__line-in--cross01"></div>
      </div>
      <div class="hamburger__line hamburger__line--cross02">
        <div class="hamburger__line-in hamburger__line-in--cross02"></div>
      </div>
    </button>

    <svg class="shape-overlays" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path class="shape-overlays__path"></path>
      <path class="shape-overlays__path"></path>
      <path class="shape-overlays__path"></path>
      <path class="shape-overlays__path"></path>
    </svg>
  </div>
</template>

<script>
import Dots from './Dots.vue';
import {ShapeOverlays} from '@/js/shapeOverlays.js';

export default {
  name: 'BaseOverlay',
  components: {
    Dots
  },
  data: function(){
    return {
    }
  },
  methods: {
    menu() {
      const elmHamburger = document.querySelector('.hamburger');
      const gNavItems = document.querySelectorAll('.global-menu__item');
      const elmOverlay = document.querySelector('.shape-overlays');
      const overlay = new ShapeOverlays(elmOverlay);

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
  },
  mounted: function(){

    this.menu()

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .content--fixed {
    position: sticky;
    top: 0;
    left: 0;
    display: grid;
    align-content: space-between;
    width: 100%;
    max-width: none;
    min-height: 0;
    height: 100vh;
    padding: 1.5em;
    z-index: 100;
    pointer-events: none;
    grid-template-columns: 50% 50%;
    grid-template-rows: 3em auto 4em;
    grid-template-areas: 'header menu'
    '... ...'
    'github dots';

    a, button {
      pointer-events: auto;
    }

    @include medium-up(){
      grid-template-rows: 4em auto 4em;
    }
  }

  .header {
    position: relative;
    z-index: 100;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    align-items: center;
    align-self: center;
    grid-area: header;
    justify-self: start;
  }

  .header__title {
    font-size: 1em;
    font-weight: 400;
    margin: 0;
    padding: 0;
    color: var(--color-title);
    font-family: var(--font-family-title);
    font-size: 3vmax;
    text-transform: uppercase;
  }
    .header__links {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 0 1em 0 0;
    text-align: center;
    white-space: nowrap;
  }

  .header__icon {
    display: inline-block;
    margin: 0.15em;
    padding: 0.25em;
  }


  // social
  .github {
    display: block;
    align-self: end;
    grid-area: github;
    justify-self: start;
    margin: 0.5em;
  }

</style>
