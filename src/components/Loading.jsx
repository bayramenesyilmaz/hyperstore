export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 opacity-95 z-60">
      <div className="flex flex-col items-center space-y-4">
        <div className="text-white text-4xl font-bold animate-pulse">
          Yükleniyor...
        </div>
        <div className="mt-6 w-10 h-10 border-4 border-t-4 border-white border-solid rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
