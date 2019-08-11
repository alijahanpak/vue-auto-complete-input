<template>
  <div id="app">
    <HelloWorld
            :name="'referralDescription'"
            :options = "referralSearch"
            v-model="des">
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
    data () {
        return {
            referralSearch : [
                {id : 1 , text : 'iran'},
                {id : 2 , text : 'iran 2'},
                {id : 3 , text : 'usa'},
                {id : 4 , text : 'canada'},
                {id : 5 , text : 'canada'},
                {id : 6 , text : 'canada'},
                {id : 7 , text : 'canada'},
                {id : 8 , text : 'canada'},
                {id : 9 , text : 'canada'},
                {id : 10 , text : 'canada'},
                {id : 11 , text : 'canada'},
                {id : 12 , text : 'canada'},
                {id : 13 , text : 'canada'},
                {id : 14 , text : 'canada'},
                {id : 15 , text : 'canada'},
                {id : 16 , text : 'canada'},
            ],
            des : '',
        }
    },
    components: {
    HelloWorld
  }
}
</script>

