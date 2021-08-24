<template>
  <nav class="dots">
    <svg class="icon icon--keyboard"><use xlink:href="#icon-keyboard"></use></svg>
    <a class="dot current" href="#"><span>Introduction</span></a>
    <a class="dot" href="#"><span>Expériences</span></a>
    <a class="dot" href="#"><span>Compétences</span></a>
    <a class="dot" href="#"><span>Réalisations</span></a>
    <a class="dot" href="#"><span>Contact</span></a>
  </nav>
</template>

<script>
export default {
  name: 'Dots',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.dots {
	position: relative;
	display: block;
  align-self: end;
  justify-self: end;
	text-align: center;
	grid-area: dots;
  margin-bottom: 0.5em;

  .dot {
    margin: 0 0.15em;
    display: none;
    overflow: hidden;
    &:hover,
    &:focus {
      opacity: 0.5;
    }
    span {
      white-space: nowrap;
      text-transform: lowercase;
      pointer-events: none;
      transform: translateY(100%);
      transition: transform 0.3s;
      &::before {
        content: '#';
      }
    }
    &.current {
      pointer-events: none;
      display: flex;

      span{
        transform: translateY(0);
      }
    }
  }
}

@include medium-up(){
  .dots {
    display: flex;
    padding-right: 5px;
    justify-self: end;

    .dot {
      display: block;
      width: 17px;
      height: 17px;
      margin: 0 4px;
      border-radius: 50%;
      background: var(--color-link);


      &.current {
        background: var(--color-link-hover);
        span {
          display: block;

        }
      }
      span {
        position: absolute;
        line-height: 1;
        right: 100%;
        display: none;
        margin: 0 1em 0 0;

      }
    }
  }
}
</style>