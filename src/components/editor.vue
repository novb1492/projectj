<template>
  <div >
      
    <textarea name="" id="editor" cols="30" rows="10"></textarea>
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
        editorArr:[],
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
    createEditor(editorId,text){
      ClassicEditor.create(document.querySelector("#"+editorId), this.editorConfig).then(
              editor => {
                this.editorArr[editorId]=editor;
                if(!checkNull(text)){
                   this.editorArr[editorId].setData(text);
                }
              }
        );
    },
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