export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-neon-green rounded-full opacity-30"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-neon-purple rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-neon-green animate-pulse">Loading...</p>
      </div>
    </div>
  )
}

