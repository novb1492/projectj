<template>
  <div >
    <textarea id="editor"></textarea>
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
        editor:null,
        editorConfig: {
            placeholder:'간단한 가게 설명을 적어주세요',
            extraPlugins: [this.MyCustomUploadAdapterPlugin],
        },
    }
  },
  mounted(){
    ClassicEditor.create(document.querySelector("#editor"), this.editorConfig).then(
          editor => {
            this.editor = editor;
            this.editor.model.document.on("change", () => {
              this.sendText();
            });
          }
    );
  },
  methods:{
    sendText(){
      console.log(this.editor.getData());
      this.$EventBus.$emit('editorText',this.editor.getData());
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