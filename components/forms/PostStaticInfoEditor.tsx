import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import Dropdown from '../controls/Dropdown';
import { MenuItem } from '@/types/common';
import { PostStatic } from '@/types/post';
import { FiTrash, FiUploadCloud } from 'react-icons/fi';
import { deleteImage, uploadImage } from '@/actions/no-cache/image';

interface PostStaticInfoEditorProps {
  postStatic: PostStatic;
  onChange: (postStatic: PostStatic) => void;
}

const PostStaticInfoEditor: React.FC<PostStaticInfoEditorProps> = ({
  postStatic,
  onChange,
}) => {
  const { slug, headerImage, category, tags, visible } = postStatic;
  const [deleteSuccessed, SetDeleteSuccessed] = useState<true | false | null>(
    null
  );

  const menuItems: MenuItem[] = [
    { label: 'Vietnamese', value: 'vi' },
    { label: 'Japanese', value: 'ja' },
    { label: 'English', value: 'en' },
  ];

  const handleLanguageSelect = (lang: string) => {
    onChange({ ...postStatic, language: lang });
  };

  const handleSlugChange = (slug: string) => {
    onChange({ ...postStatic, slug });
  };

  const handleCategoryChange = (category: string) => {
    onChange({ ...postStatic, category });
  };

  const handleTagsChange = (tags: string) => {
    onChange({ ...postStatic, tags });
  };

  const handleVisibleChange = (visible: boolean) => {
    onChange({ ...postStatic, visible });
  };

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      if (file) {
        try {
          const formData = new FormData();
          formData.append('image', file);
          formData.append(
            'folder',
            process.env.NEXT_PUBLIC_CLOUDINARY_POST_FOLDER!
          );
          const imageUrl = await uploadImage(formData);
          if (imageUrl) onChange({ ...postStatic, headerImage: imageUrl });
          else alert('Upload image failed');
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Upload image failed');
        }
      }
    }
  };

  function extractPublicId(str: string) {
    const regex = /image_\d{1,2}_\d{1,2}_\d{4}__\d{1,2}_\d{1,2}_\d{1,2}_\w{2}/;
    const matches = str.match(regex);

    if (matches) {
      return matches[0];
    } else {
      return null;
    }
  }

  async function handleDeleteImage(event: React.DragEvent<HTMLLabelElement>) {
    SetDeleteSuccessed(null);
    event.preventDefault();
    const text = event.dataTransfer.getData('text/plain');
    const isHeaderImage = text.startsWith('https');

    let publicId = extractPublicId(text);
    if (publicId) {
      publicId = `${process.env.NEXT_PUBLIC_CLOUDINARY_POST_FOLDER}/${publicId}`;
      const result = await deleteImage(publicId);
      SetDeleteSuccessed(result);
      if (isHeaderImage) {
        if (result) {
          onChange({ ...postStatic, headerImage: undefined });
        }
      }
    } else {
      alert('Can not find the public id');
    }
  }

  return (
    <form className="mx-auto md:mr-4">
      <div className="relative w-full mb-5 group">
        <Dropdown menuItems={menuItems} onSelect={handleLanguageSelect} />
      </div>
      <div className="relative w-full mb-5 group">
        <input
          name="floating_slug"
          id="floating_slug"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          onChange={(e) => handleSlugChange(e.target.value)}
          value={slug}
          placeholder=" "
          required={true}
        />
        <label
          htmlFor="floating_slug"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Slug
        </label>
      </div>
      <div className="flex flex-row space-x-2">
        <div className="relative w-full mb-5 group">
          <label className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
            <div className="flex flex-col items-center justify-center pt-5 pb-4">
              <FiUploadCloud />
              {headerImage && (
                <Link
                  className="text-blue-500"
                  href={headerImage}
                  target="_blank"
                >
                  Uploaded
                </Link>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleUploadImage}
            />
          </label>
        </div>
        <div
          className="relative w-full mb-5 group"
          onDragOver={(event) => {
            event.preventDefault();
          }}
        >
          <label
            onDrop={handleDeleteImage}
            className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
          >
            <div
              className={`${
                deleteSuccessed != null &&
                (deleteSuccessed ? 'text-green-500' : 'text-red-500')
              } flex flex-col items-center justify-center pt-5 pb-4`}
            >
              <FiTrash />
            </div>
          </label>
        </div>
      </div>
      <div className="relative w-full mb-5 group">
        <input
          name="floating_category"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
          onChange={(e) => handleCategoryChange(e.target.value)}
          value={category}
          required={true}
        />
        <label
          htmlFor="floating_category"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Category
        </label>
      </div>
      <div className="relative w-full mb-5 group">
        <input
          name="floating_tags"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          value={tags}
          onChange={(e) => handleTagsChange(e.target.value)}
          placeholder=" "
          required={true}
        />
        <label
          htmlFor="floating_tags"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Tags
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={visible}
          defaultValue=""
          onChange={(e) => handleVisibleChange(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Post Visible
        </label>
      </div>
    </form>
  );
};

export default PostStaticInfoEditor;
