
<template>
  <Introduction></Introduction>

</template>

<script>


import {ShapeOverlays} from '@/js/shapeOverlays.js';
import Introduction from '@/components/stage/Introduction';


export default {
  name: 'StagesManager',
  components: {
    Introduction
  },
  data: function(){
    return {
    }
  },
  mounted: function(){
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0 auto;
    pointer-events: none;
  }

  .title{
    color: var(--color-title);
    font-family: var(--font-family-title);
    font-size: var(--font-size-title);
    font-weight: var(--font-weight-title);
  }

</style>
