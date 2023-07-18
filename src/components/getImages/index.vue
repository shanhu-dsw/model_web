<template>
  <div>
    <el-button @click="writeFile">导成txt文件</el-button>
  </div>
</template>

<script>
   import {saveAs} from 'file-saver';
export default {
    data(){
        return{
            listurl:"https://img2.baidu.com/it/u=1814268193,3619863984&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1663779600&t=adab3be6ece224ca0d521383e8135c99"
        }
    },
methods:{
    writeFile(){
      var data = 'https://img2.baidu.com/it/u=1814268193,3619863984&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1663779600&t=adab3be6ece224ca0d521383e8135c99'
      let str = new Blob([data], {type: 'text/plain;charset=utf-8'});
// 注意这里要手动写上文件的后缀名
      saveAs(str, `test.txt`);
}
}
}
</script>

<style>

</style>