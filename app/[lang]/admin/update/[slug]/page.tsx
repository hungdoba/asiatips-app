import PostForm from '@/components/forms/PostForm';

interface Props {
  params: {
    slug: string;
  };
}

const Update = ({ params }: Props) => {
  return <PostForm mode="update" slug={params.slug} />;
};

export default Update;
