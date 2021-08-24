
<template>
  <div class="stage-1 content" id="introduction">


    <div class="text__block title">Salut</div>
    <div class="title text__block">Je m'appele Keryan</div>
    <div class="title text__block">Je suis
      <span>Web</span>
      <span>Front-End</span>
      <span>Developpeur</span>
    </div>


  </div>
</template>

<script>

import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';


export default {
  name: 'Introduction',
  data: function(){
    return {
    }
  },
  mounted: function(){
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ease:'none', duration: 2});

    const tl = gsap.timeline( {paused: 1} );

    tl.from( '.title' , {duration: .5, y: 100, x: -100, autoAlpha: 0, rotate: 45, stagger: .1,  ease: "back" } );

    document.addEventListener('scroll', function () {
        //You've scrolled this much:
        tl.progress(document.offsetTop/ ( document.querySelector('.text__block').height - document.height ) );
    });

    /*gsap.utils.toArray('.title').forEach((text) => {

      ScrollTrigger.create({
        animation: tl,
        markers: true,
        trigger: text,
        start: 'top top',
        end: '+=4000',
        scrub: true,
        pin: true,
        anticipatePin: 1
      });
    });*/
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.text__block{
  height: 100vh;
  width: 100vw;
  display: block;
  align-items: center;
  justify-content: center;
  position: sticky;
}
</style>
