<template>
  <div >
   <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" @input="sendText"></ckeditor>
  </div>
</template>
<style>
</style>
<script>
//import * as modules from '../jslib';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '../MyUploadAdapter';
export default {
  name: 'editorComponent',
  data(){
    return  {
    editor: ClassicEditor,
    editorData: null,
        editorConfig: {
            placeholder:'간단한 가게 설명을 적어주세요',
            extraPlugins: [this.MyCustomUploadAdapterPlugin],
          
        },
    }
  },
  methods:{
    sendText(){
      this.$EventBus.$emit('editorText',this.editorData);
    },
    MyCustomUploadAdapterPlugin( editor ) {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
            // Configure the URL to the upload script in your back-end here!
            return new MyUploadAdapter( loader );
            };
    },
  },
}
</script>