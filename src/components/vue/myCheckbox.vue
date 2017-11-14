<template>
    <label :for="idName" class="checkbox">
        <i class="iconfont icon-hook" v-if="checked"></i>
        <input type="checkbox" :id="idName" v-model="checked">{{label}}
    </label>
</template>
<style scoped>
    .checkbox{
        position:relative;
        padding-left:4px;
        cursor: pointer;
    }
    .checkbox input{
        visibility:hidden;
        opacity:0;
    }
    .checkbox:before{
        width:16px;
        height:16px;
        border: 1px solid #6C6F70;
        border-radius: 2px;
        position:absolute;
        top:1px;
        left:1px;
        content:'';
        margin: -1px 5px -3px -3px;
    }
    .checkbox i{
        font-size: 12px;
        -webkit-transform: scale(0.7);
        transform: scale(0.7);
        position: absolute;
        top: 2px;
        left: -1px;
        height: auto;
        line-height: 12px;
        color: #E14B5D;
    }
</style>
<script>
    export default{
        data(){
            return {
                checked:this.selected || false,
            }
        },
        props:{
            label:{
                type:String
            },
            selected:{
                type:Boolean,
                default:false
            },
            idName:{
                type:String,
                required:true
            }
        },
        watch:{
            checked:function(){
                this.$emit('change',this.checked);
            }
        }
    }
</script>