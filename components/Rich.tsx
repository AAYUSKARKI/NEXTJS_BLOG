import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

interface TinyMCEEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const TinyMCEEditor = ({ value, onChange }: TinyMCEEditorProps) => {
  return (
    <Editor
      apiKey="ab1gx498a2f11lhyrfowzlc5vovptcyccgyzyl3s6krtkfbb"
      value={value}
      init={{
        height: '90vh',
        menubar: false,
        relative_urls: false,
        plugins: [
          'autolink', 
          'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
          'fullscreen', 'insertdatetime', 'media', 'table', 'help', 
          'wordcount', 'code'
        ],
        toolbar: 'undo redo | styles | bold italic backcolor | ' + 
                 'alignleft aligncenter alignright alignjustify | ' +
                 'bullist numlist checklist outdent indent | image | removeformat',
        images_upload_url: '/api/upload/', // Handle image uploads
        content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; }',  // Optional: Customize editor font
      }}
      onEditorChange={onChange}  // Pass the content back when the editor changes
    />
  );
};

export default TinyMCEEditor;
