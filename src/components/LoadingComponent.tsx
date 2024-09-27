export const LoadingComponent = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 border-b-transparent"></div>
    </div>
  )
}