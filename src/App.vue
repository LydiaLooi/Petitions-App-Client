<template>
  <div id="app">
    <PageHeader></PageHeader>

    <router-view></router-view>
    <PageFooter></PageFooter>

  </div>
</template>

<script>
import PageHeader from "./Components/PageHeader";
import PageFooter from "@/Components/PageFooter";

  export default {
  name: 'app',
    components: {
      PageFooter,
    PageHeader
    },
  data () {
    return {
    }
  }
}
</script>

<style>

  [v-cloak] {
    display: none;
  }


  /**
Sets the styling of everything inside a body
 */
  body {
    /*font-family: Arial, serif;*/
    /*line-height: 1.4em;*/
    /*min-width: 230px;*/
    /*margin: 0;*/
    min-height: 100vh;
    background: #406395;

    /*color: #272727;*/
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  body::-webkit-scrollbar {
    display: none;
  }

#app {
  color: black;
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  padding-bottom: 4em;
}



</style>
