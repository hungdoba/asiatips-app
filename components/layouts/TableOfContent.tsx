import { MDXRemote } from 'next-mdx-remote/rsc';

interface Props {
  datas: any;
}

export default function TableOfContent({ datas }: Props) {
  return (
    <div className="w-full">
      <MDXRemote source={datas[0].post_translation[0].table_of_contents} />
    </div>
  );
}