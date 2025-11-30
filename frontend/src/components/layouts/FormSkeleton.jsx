// import { Card } from "../ui/card";
// export function FormSkeleton() {
//   return (
//   <div className="space-y-3 animate-pulse font-mono text-sm w-full">
//   {/* Opening brace */}
//   <div className="h-4 w-6 bg-[var(--bg-subtle)] rounded"></div>

//   {/* Key-value pairs */}
//   <div className="pl-4 space-y-2 w-full">
//     <div className="flex items-center space-x-2 w-full">
//       <div className="h-3 w-1/4 bg-[var(--bg-subtle)] rounded"></div>
//       <div className="h-3 flex-1 bg-[var(--bg-subtle)] rounded"></div>
//     </div>

//     <div className="flex items-center space-x-2 w-full">
//       <div className="h-3 w-1/3 bg-[var(--bg-subtle)] rounded"></div>
//       <div className="h-3 flex-1 bg-[var(--bg-subtle)] rounded"></div>
//     </div>

//     {/* Nested object */}
//     <div className="w-full">
//       <div className="h-3 w-1/2 bg-[var(--bg-subtle)] rounded mb-2"></div>
//       <div className="pl-6 space-y-2 w-full">
//         <div className="h-3 w-2/3 bg-[var(--bg-subtle)] rounded"></div>
//         <div className="h-3 w-1/2 bg-[var(--bg-subtle)] rounded"></div>
//       </div>
//     </div>

//     {/* Array */}
//     <div className="w-full">
//       <div className="h-3 w-1/4 bg-[var(--bg-subtle)] rounded mb-2"></div>
//       <div className="pl-6 space-y-1 w-full">
//         <div className="h-3 w-full bg-[var(--bg-subtle)] rounded"></div>
//         <div className="h-3 w-5/6 bg-[var(--bg-subtle)] rounded"></div>
//         <div className="h-3 w-2/3 bg-[var(--bg-subtle)] rounded"></div>
//       </div>
//     </div>
//   </div>

//   {/* Closing brace */}
//   <div className="h-4 w-6 bg-[var(--bg-subtle)] rounded"></div>
// </div>

//   );
// }


export function FormSkeleton() {
  const Line = ({ width = "100%", height = "12px", indent = 0 }) => (
    <div
      className="bg-[var(--bg-subtle)] rounded"
      style={{ width, height, marginLeft: indent }}
    ></div>
  );

  return (
    <div className="space-y-3 animate-pulse font-mono text-sm w-full">
      {/* { */}
      <Line width="18px" height="14px" />

      {/* key: value */}
      <Line width="25%" indent={16} />
      <Line width="100%" height="16px" indent={16} />

      {/* another key: value */}
      <Line width="40%" indent={16} />
      <Line width="100%" height="16px" indent={16} />

      {/* nested object */}
      <Line width="50%" indent={16} />
      <Line width="70%" indent={32} />
      <Line width="40%" indent={32} />

      {/* array */}
      <Line width="30%" indent={16} />
      <Line width="100%" height="16px" indent={32} />
      <Line width="85%" height="16px" indent={32} />
      <Line width="65%" height="16px" indent={32} />

      {/* closing brace } */}
      <Line width="18px" height="14px" />
    </div>
  );
}

