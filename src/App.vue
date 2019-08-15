<template>
  <div id="app">
    <input type="text" class="my-input" ref="textSuggestionRef" v-model="inputVal" @blur="textSuggestionControl" v-on:keyup="getReferralSuggestion(inputVal)" :name="name" style="width: 100%;height: 100%;margin-bottom: 0px;line-height: 1.5;">
    <div v-show="textSuggestionState" id="content" ref="content">
      <div>
        <div :style="{'width' : textSuggestionWidth + 2 +'px'}" class="my-input-suggestion" id="scrollContent1">
          <ul style="list-style:none;margin : 0;padding: 0;" class="scrollContent" id="ulScrollContent"  v-for="refSearch in referralSearch">
            <li @click.self="setReferralTest(refSearch)" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" :style="{'width' : textSuggestionWidth -30 +'px'}"  :class="inputValIdTemp == refSearch.id ? 'selectedWithArrow' : ''" >{{refSearch.text}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import jQuery from 'jquery';
    let $ = jQuery;
    require('./assets/css/style.css');
    export default{
        name : 'app',
        props:['options' , 'value' , 'name'],
        data () {
            return {
                textSuggestionState : false,
                scrollVisible : false,
                textSuggestionWidth : 0,
                referralSearch : [],
                inputVal : this.value,
                selectedIndex : -1,
                referralSearchSelectedId : 0,
                inputValTemp : '',
                inputValIdTemp : 0,
            }
        },

        components: {

        },

        created: function(){


        },

        updated: function () {

        },

        watch: {
            inputVal: function (newValue
            ) {
                this.$emit('input' , newValue);
            },
        },

        methods : {
            getReferralSuggestion : function(query){

                switch (event.keyCode) {
                    case 40:
                        this.inputValTemp = '';
                        if(this.selectedIndex < this.referralSearch.length-1)
                            this.selectedIndex += 1;
                        else this.selectedIndex = 0;
                        //console.log(this.selectedIndex + ' : ' + this.referralSearch.length);
                        this.inputValTemp = this.referralSearch[this.selectedIndex].text;
                        this.inputValIdTemp = this.referralSearch[this.selectedIndex].id;
                        this.setScroll();
                        //console.log(JSON.stringify( this.referralSearch[this.selectedIndex]));

                        break;
                    case 38:
                        this.inputValTemp = '';
                        if( this.selectedIndex < this.referralSearch.length)
                            if(this.selectedIndex > 0)
                                this.selectedIndex -= 1;
                            else
                                this.selectedIndex = 0;
                        //console.log(this.selectedIndex);
                        this.inputValTemp = this.referralSearch[this.selectedIndex].text;
                        this.inputValIdTemp = this.referralSearch[this.selectedIndex].id;
                        this.setScroll();

                        //console.log(JSON.stringify( this.referralSearch[this.selectedIndex]));
                        break;
                    default:
                        $("#scrollContent1").scrollTop(0);
                        this.selectedIndex = -1;
                        this.textSuggestionWidth = this.$refs.textSuggestionRef.clientWidth;
                        var state = false;
                        if(query == ''){
                            this.referralSearch = [];
                            this.scrollVisible = false;
                        }
                        else{
                            this.referralSearch = [];
                            this.options.forEach(item => {
                                if ((item.text.includes(query))) {
                                    state = true;
                                    if(state){
                                        var rTemp = {};
                                        rTemp.id = item.id;
                                        rTemp.text = item.text;
                                        this.referralSearch.push(rTemp);
                                        this.scrollVisible = true;
                                    }
                                }
                                else{
                                    this.scrollVisible = false;
                                }
                            });
                        }
                        if(this.inputVal == '' || this.inputVal == null || this.referralSearch.length == 0)
                            this.textSuggestionState = false;
                        else
                            this.textSuggestionState = true;
                        break;

                }
                if(event.keyCode == 13){
                    event.preventDefault();
                    this.inputVal =   this.inputValTemp;
                    this.selectedIndex = 0;
                    this.textSuggestionState = false;
                }

            },

            setScroll: function(){
                var selected = this.selectedIndex;
                var elHeight = $("#ulScrollContent").height();
                var scrollTop = $("#scrollContent1").scrollTop();
                //document.getElementById('scrollContent1').scrollTop += 25;
                var viewport = scrollTop + $("#scrollContent1").height();
                var elOffset = elHeight * selected;
                if (elOffset < scrollTop || (elOffset + elHeight) > viewport)
                    $("#scrollContent1").scrollTop(elOffset);
            },

            setReferralTest : function(input){
                this.inputVal = input.text;
                this.textSuggestionState = false;
            },

            textSuggestionControl : function () {
                var _this = this;
                setTimeout(function () {
                    _this.textSuggestionState = false;
                },300)
            },
        }
    }
</script>

