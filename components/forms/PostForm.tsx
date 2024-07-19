'use client';

import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { PostInfo, PostStatic } from '@/types/post';
import MDXEditor from '@/components/forms/MDXEditor';
import PostInfoEditor from '@/components/forms/PostInfoEditor';
import { createPost, updatePost } from '@/actions/no-cache/post';
import PostStaticInfoEditor from '@/components/forms/PostStaticInfoEditor';

interface Props {
  mode: 'create' | 'update';
  initialPostStatic: PostStatic;
  initialPostInfo: { [key: string]: PostInfo };
  initialPostContent: { [key: string]: string };
}

export default function PostForm({
  initialPostStatic,
  initialPostInfo,
  initialPostContent,
  mode,
}: Props) {
  const [postStatic, setPostStatic] = useState<PostStatic>(initialPostStatic);
  const [postInfo, setPostInfo] = useState<{ [key: string]: PostInfo }>(
    initialPostInfo
  );
  const [postContent, setPostContent] = useState<{ [key: string]: string }>(
    initialPostContent
  );
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  const handleContentChange = (value: string) => {
    setPostContent((prev) => ({ ...prev, [postStatic.language]: value }));
    setIsDirty(true);
  };

  const handlePostStaticChange = (newPostStatic: PostStatic) => {
    setPostStatic(newPostStatic);
    setIsDirty(true);
  };

  const handlePostInfoChange = (newPostInfo: PostInfo) => {
    setPostInfo((prev) => ({ ...prev, [postStatic.language]: newPostInfo }));
    setIsDirty(true);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('slug', postStatic.slug);
    formData.append('post_category', postStatic.category);
    formData.append('tags', postStatic.tags);
    formData.append('header_image', postStatic.headerImage || '');
    formData.append('active', postStatic.visible.toString());

    const translations = Object.keys(postInfo).map((lang) => ({
      language_code: lang,
      post_title: postInfo[lang].title,
      post_brief: postInfo[lang].brief,
      table_of_contents: postInfo[lang].tableOfContent,
      post_content: postContent[lang],
    }));

    formData.append('translations', JSON.stringify(translations));

    let result;
    if (mode === 'update' && postStatic.id) {
      formData.append('id', postStatic.id!.toString());
      result = await updatePost(formData);
    } else {
      result = await createPost(formData);
    }

    if (result) {
      toast.success(`${mode === 'update' ? 'Update' : 'Creation'} Succeeded`);
      setIsDirty(false);
    } else {
      toast.error(
        `${
          mode === 'update' ? 'Update' : 'Creation'
        } Failed: Check the console for details`
      );
    }
  };

  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="flex flex-col md:flex-row mx-4 md:mx-8">
        <div className="w-full mb-4 md:mb-0 md:w-1/4">
          <PostStaticInfoEditor
            postStatic={postStatic}
            onChange={handlePostStaticChange}
          />
          <PostInfoEditor
            mode={mode}
            postInfo={postInfo[postStatic.language] || initialPostInfo}
            postContent={postContent[postStatic.language] || ''}
            onChange={handlePostInfoChange}
            onSave={handleSubmit}
          />
        </div>
        <hr className="md:hidden mb-4" />
        <div className="w-full md:w-3/4">
          <MDXEditor
            value={postContent[postStatic.language] || ''}
            onChange={handleContentChange}
          />
        </div>
      </div>
    </div>
  );
}
