'use client';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'easymde/dist/easymde.min.css';
import EasyMDE from 'easymde';
import { uploadImage } from '@/utils/actions';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

export default function MDXEditor({ value, onChange }: Props) {
  const handleImageUpload = async (
    file: File,
    onSuccess: any,
    onError: any
  ) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append(
          'folder',
          process.env.NEXT_PUBLIC_CLOUDINARY_POST_FOLDER!
        );
        const imageUrl = await uploadImage(formData);
        if (imageUrl) {
          onSuccess(imageUrl);
        } else {
          alert('Upload image fail');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        onError('Upload image error, maybe size of image too big');
      }
    }
  };

  const defaultOptions = useMemo(() => {
    return {
      autofocus: true,
      lineNumbers: true,
      spellChecker: true,
      uploadImage: true,
      imageUploadFunction: handleImageUpload,
    } as EasyMDE.Options;
  }, []);

  return (
    <div className="w-full prose dark:prose-invert">
      <SimpleMdeReact
        className="editor-text-black editor-toolbar-gray"
        value={value}
        onChange={onChange}
        options={defaultOptions}
      />
    </div>
  );
}
