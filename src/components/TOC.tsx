import type { MarkdownHeading } from "astro";

type TOCProps = {
  headings: MarkdownHeading[];
};

const renderList = (items: MarkdownHeading[], currentDepth: number) => {
  const currentList = [];
  let collector: MarkdownHeading[] = [];
  let sameLevel = true;
  for (const item of items) {
    if (item.depth <= currentDepth) {
      if (!sameLevel) {
        console.log("foo", collector);
        currentList.push(renderList(collector, currentDepth + 1));
        collector = [];
      }
      sameLevel = true;
      currentList.push(
        <li key={item.slug}>
          <a href={`#${item.slug}`} className="text-blue-600 hover:underline">
            {item.text}
          </a>
          {/*{nestedItems.length > 0 && renderList(nestedItems, currentDepth + 1)}*/}
        </li>
      );
    } else {
      sameLevel = false;
      collector.push(item);
    }
  }

  return <ul className="list-disc pl-4">{currentList}</ul>;
};

const TOC = ({ headings }: TOCProps) => {
  // Recursive function to render nested lists

  return (
    <nav className="sticky top-5 prose prose-sm w-full">
      <h3 className="font-bold">Outline</h3>
      {renderList(headings, headings[0].depth)}
    </nav>
  );
};

export default TOC;
