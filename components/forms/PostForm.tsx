'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostInfo, PostStatic } from '@/types/post';
import MDXEditor from '@/components/forms/MDXEditor';
import PostInfoEditor from '@/components/forms/PostInfoEditor';
import PostStaticInfoEditor from '@/components/forms/PostStaticInfoEditor';
import { getPostUpdate, updatePost, createPost } from '@/utils/actions';

interface PostFormProps {
  mode: 'create' | 'update';
  slug?: string;
}

const initialPostStatic: PostStatic = {
  language: 'vi',
  slug: '',
  headerImage: undefined,
  category: '',
  tags: 'tips, ',
  visible: true,
};

const initialPostInfo: PostInfo = {
  title: '',
  brief: '',
  tableOfContent: '',
};

export default function PostForm({ mode, slug }: PostFormProps) {
  const [postStatic, setPostStatic] = useState<PostStatic>(initialPostStatic);
  const [postInfo, setPostInfo] = useState<{ [key: string]: PostInfo }>({});
  const [postContent, setPostContent] = useState<{ [key: string]: string }>({});
  const [isDirty, setIsDirty] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (mode === 'update' && slug) {
      const fetchData = async () => {
        try {
          const data = await getPostUpdate(slug);
          const postData = data[0];

          setPostStatic((prev) => ({
            ...prev,
            id: postData.id,
            slug: postData.slug,
            headerImage: postData.header_image,
            category: postData.post_category,
            tags: postData.tags.join(', '),
            visible: postData.active ?? false,
          }));

          const info: { [key: string]: PostInfo } = {};
          const content: { [key: string]: string } = {};

          postData.post_translation.forEach((translation: any) => {
            info[translation.language_code] = {
              title: translation.post_title,
              brief: translation.post_brief,
              tableOfContent: translation.table_of_contents,
            };
            content[translation.language_code] = translation.post_content;
          });

          setPostInfo(info);
          setPostContent(content);
        } catch (error) {
          console.error('Failed to fetch post data', error);
        }
      };

      fetchData();
    }
  }, [mode, slug]);

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
      alert(`${mode === 'update' ? 'Update' : 'Creation'} Succeeded`);
      setIsDirty(false);
      router.push('/');
    } else {
      alert(
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
