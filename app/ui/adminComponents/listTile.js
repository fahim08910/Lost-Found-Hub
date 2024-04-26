// components/ListTile.js
function ListTile({ title, subtitle, subtitle2, leading, trailing }) {
  return (
    <div className="flex border-2 hover:border-gray-400 border-gray-200 rounded-xl bg-white items-center p-4 hover:bg-slate-400  transition-colors cursor-pointer mb-2 shadow-sm w-full">
      {leading && <div className="mr-4">{leading}</div>}
      <div className="flex-grow">
        <div className="font-bold text-lg">{title}</div>
        {subtitle && <div className="text-gray-600 text-sm">{subtitle}</div>}
        {subtitle2 && <div className="text-gray-600 text-sm">{subtitle2}</div>}
      </div>
      {trailing && <div className="ml-4">{trailing}</div>}
    </div>
  );
}

export default ListTile;
