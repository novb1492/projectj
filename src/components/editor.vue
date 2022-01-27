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
            this.$EventBus.$emit('editorText',this.editor.getData());     
            });
          }
    );
    this.$EventBus.$on('setEditor',text=>{
      this.editor.setData(text);
    });
  },
  methods:{
    MyCustomUploadAdapterPlugin( editor ) {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
            // Configure the URL to the upload script in your back-end here!
            return new MyUploadAdapter( loader );
            };
    },
  },
}
</script>