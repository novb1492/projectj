<template>
  <div >
    <textarea id="editor"></textarea>
  </div>
</template>
<style>
</style>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '../MyUploadAdapter';
import { checkNull } from '../jslib';
export default {
  name: 'editorComponent',
  props:['text','placeHolder'],
  data(){
    return  {
        editor:null,
        editorConfig: {
            placeholder:this.placeHolder,
            extraPlugins: [this.MyCustomUploadAdapterPlugin],
        },
    }
  },
  mounted(){
    ClassicEditor.create(document.querySelector("#editor"), this.editorConfig).then(
          editor => {
            this.editor = editor;
            if(!checkNull(this.text)){
              this.editor.setData(this.text);
            }
          }
    );
  },
  methods:{
    MyCustomUploadAdapterPlugin( editor ) {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
            // Configure the URL to the upload script in your back-end here!
            return new MyUploadAdapter( loader );
            };
    },
    getText(){
      return this.editor.getData();
    },
    setText(text){
      this.editor.setData(text);
    }
  },
}
</script>