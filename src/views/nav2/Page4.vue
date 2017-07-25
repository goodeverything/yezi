<template>
  <div>
    <h3>vuex测试</h3>
    <p>
      <span>{{count}}</span>
      <button @click="inc">+</button>
      <button @click="dec">-</button>
    </p>

  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    computed: {
      count () {
        return this.store.state.count;
      }
    },
    methods: {
      inc () {
        this.store.commit('inc');
      },
      dec () {
        this.store.commit('dec');
      }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
