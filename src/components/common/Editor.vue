<script setup>
// import ClassicEditor from '/libs/ckeditor.js?url'
import DecoupledEditor from '/libs/ckeditor/ckeditor.js?url'

const props = defineProps({
  contentData: {
    type: String,
    default: ''
  }
})

// const editor = ClassicEditor
const emit = defineEmits(['changeData'])

const emitValue = (event) => {
  emit('changeData', event)
  const images = document.getElementsByTagName('img')
  for (const image of images) {
    if (!image.hasAttribute('alt')) {
      image.setAttribute('alt', '에디터 이미지')
    }
  }
}

//FIXME API 완성되면 수정 필요함
const config = {
  fontFamily: {
    options: ['default', 'Arial', '궁서체', '바탕', '돋움'],
    supportAllValues: true
  },
  language: 'ko',
  simpleUpload: {
    uploadUrl: 'http://172.90.0.55:7080/file/ckeditor'
    // Enable the XMLHttpRequest.withCredentials property.
    // withCredentials: true,
    // Headers sent along with the XMLHttpRequest to the upload server.
    // headers: {
    //   'X-CSRF-TOKEN': 'CSRF-Token',
    //   Authorization: 'Bearer <JSON Web Token>'
    // }
  }
}

const onReady = (editor) => {
  editor.ui.getEditableElement().parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement())
}
</script>
<template>
  <div>
    <ckeditor :editor="DecoupledEditor" :model-value="props.contentData" @input="emitValue" @ready="onReady" :config="config" />
  </div>
</template>

<style>
.ck-editor__editable {
  min-height: 400px;
}
#ckEditorQuestionStem .ck.ck-toolbar > .ck-toolbar__items {
  position: fixed !important;
}
/* .ck-editor__editable_inline p
{
  font-size: var(--fontSize) !important;
  font-family: var(--fontFamily) !important;
} */
</style>
