<template>
    <div>
        <component :is="currentMB" :setFlag="setFlag" :menuTempId= "menuTempId" @saveSetMessage="saveSetMsg" :visualTempList="visualTempList" class="mb-content"></component>
    </div>
</template>

<script>
    import MB01 from '../../components/common/MB/MB01';
    import MB02 from '../../components/common/MB/MB02';
    import MB03 from '../../components/common/MB/MB03';
    export default {
        name: "safe",
        data(){
            return{
              currentMB:'',
              visualTempList:'',//临时传参给模版界面 'MB0X',
              visualList:'',//实际查询到的数据List
              mb:'',//实际查询到的MBID
              menuTempId:'',
              visualHomeTempList:'',
            }
        },
      props: ['setFlag','mbId','menuId','visualHomeList'],
        components:{
            MB01,
            MB02,
            MB03
        },
          watch: {
         setFlag: function (val) {
          this.setFlag = val;
        },
        mbId: function (val) {
          this.currentMB = val;
        },
        menuId:function(val){
          this.menuId = val;
          this.menuTempId = val;
        },
        visualHomeList:function(val){
          this.visualHomeTempList = val;
          this.visualTempList = JSON.parse(JSON.stringify(val));
          this.currentMB = this.visualTempList.mb.templateNum;
        }
      },
      created(){
        this.visualHomeTempList = this.visualHomeList;
        this.visualTempList = JSON.parse(JSON.stringify(this.visualHomeList));

        if(this.visualTempList){
          this.currentMB = this.visualTempList.mb.templateNum;
        }
        this.menuTempId = this.menuId;

      },
      methods:{
          // 获取从子组件MB传值 模版可视化内容信息
        saveSetMsg:function(msgList){
          let self = this;
          // 再次上传至上一层home组件内/嵌套路由传值
          this.$emit('uploadSetMsg',msgList);

        },
      }
    }
</script>

<style scoped>
.mb-content{
    position: relative;
    width: 100%;
    height: 90%;
    }
</style>
