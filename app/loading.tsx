export default function Loading() {
  return (
    <div className="flex flex-col space-y-3 justify-center items-center">
      <div className="w-16 h-16 sm:w-32 sm:h-32 border-4 border-dashed rounded-full animate-spin border-slate-600"></div>
      <p className="text-2xl">Loading...</p>
    </div>
  );
}
