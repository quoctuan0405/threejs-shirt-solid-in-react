interface Props {
  header?: React.ReactNode;
  body?: React.ReactNode;
}

export const Card: React.FC<Props> = ({ header, body }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-neutral-200">
      <div className="drag-handle__custom px-4 py-2 text-sm font-semibold bg-neutral-50 border-b-[1px] border-neutral-200 text-neutral-600/70">
        {header}
      </div>
      <div className="px-4 py-4 cursor-auto">{body}</div>
    </div>
  );
};
