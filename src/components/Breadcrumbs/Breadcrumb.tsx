import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h6 className="text-xl font-medium text-black dark:text-white">
        {pageName}
      </h6>
    </div>
  );
};

export default Breadcrumb;
