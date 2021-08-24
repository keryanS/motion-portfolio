
<template v-show="stage=='experience'">
  <div class="stage-2 content" id="experience">


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

export default {
  name: 'Experience',
  data: function(){
    return {
    }
  },
  props: {
    stage: String
  },
  
  mounted: function(){
    console.log(this.stage);
    gsap.defaults({ease:'none', duration: 2});

    const tl = gsap.timeline( {paused: 1} );

    tl.from( '.title' , {duration: .5, y: 100, x: -100, autoAlpha: 0, rotate: 45, stagger: .1,  ease: "back" } );


tl.play();

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

</style>
