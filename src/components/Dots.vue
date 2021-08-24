<template>
  <nav class="dots">
    <svg class="icon icon--keyboard"><use xlink:href="#icon-keyboard"></use></svg>
    <a v-for="tab in tabs" :key="tab" :class="['dot', {current: stage===tab}]" href="#"><span>{{tab}}</span></a>
  </nav>
</template>

<script>
export default {
  name: 'Dots',
  props: {
    stage: String,
    tabs: Array
  }
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
    color: var(--color-link);
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
      background-color: var(--color-link);
      transition: background-color 0.2s;

      &.current {
        background-color: var(--color-link-hover);
        span {
          opacity: 1;
        }
      }
      span {
        position: absolute;
        display: block;
        line-height: 1;
        right: 100%;
        margin: 0 1em 0 0;
        opacity: 0;
        transition: opacity 0.2s;
      }
    }
  }
}
</style>