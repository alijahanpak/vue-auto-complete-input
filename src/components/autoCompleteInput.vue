<template>
    <div>
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
    export default{
        props:['options' , 'value' , 'name'],
        styles: {
            type: Object,
            default: () => ({}),
        },
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
                    case 13:
                            event.preventDefault();
                            if(this.selectedIndex != -1)
                                this.inputVal =   this.inputValTemp;
                            this.selectedIndex = 0;
                            this.textSuggestionState = false;
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
                                    else this.selectedIndex = -1;
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

<style lang="scss" scoped>
    .my-input-suggestion{
        position: absolute;
        z-index: 9999;
        background-color: #ffffff;
        box-shadow: 0px 0px 5px #1E90FF;
        transition: all .15s ease;
        -webkit-transform: translateY(-2px);
        max-height: 150px;
        min-height: 38px;
        overflow-y: auto;
    }

    .my-input-suggestion ul li{
        padding: 8px;
        font-weight: normal;
        border-bottom: 1px solid #FAFAFA;
        color : #777777;
    }

    .my-input-suggestion ul li:hover{
        background-color: #F5F5F5;
        cursor: pointer;
    }

    .scrollContent{

    }
    .selectedWithArrow{
        background-color: #F5F5F5;
    }

    .my-input{
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 2.4375rem;
        margin: 0 0 1rem;
        padding: 0.5rem;
        border: 1px solid #cacaca;
        border-radius: 0px;
        background-color: #fefefe;
        box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
        font-family: inherit;
        font-size: 1rem;
        font-weight: normal;
        line-height: 1.5;
        color: #0a0a0a;
        transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
    }

    .my-input:focus {
        background-color: #fefefe;
        border: 1px solid #8a8a8a;
        box-shadow: 0 0 5px #1E90FF;
        outline: medium none;
        transition: box-shadow 0.5s ease 0s, border-color 0.25s ease-in-out 0s;
        line-height: 1px;

    }
</style>

