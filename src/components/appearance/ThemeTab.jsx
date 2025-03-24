export default function ThemeTab() {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold">Theme Customization</h2>
        <p className="text-gray-500 text-sm">Choose your profile theme</p>
  
        {/* Example Theme Options */}
        <div className="mt-4 flex gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
          <div className="w-24 h-24 bg-black rounded-md"></div>
          <div className="w-24 h-24 bg-blue-500 rounded-md"></div>
        </div>
      </div>
    );
  }
  