import { MDXRemote } from 'next-mdx-remote/rsc';

interface Props {
  datas: any;
}

export default function TableOfContent({ datas }: Props) {
  return (
    <div className="w-full prose dark:prose-invert prose-a:no-underline prose-a:font-normal prose-a:text-gray-400 dark:prose-a:text-gray-500 hover-links-cyan-500">
      <MDXRemote source={datas[0].post_translation[0].table_of_contents} />
    </div>
  );
}
