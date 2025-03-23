const themes = ["light", "dark", "blue", "purple"];

export default function ThemeSelector({ theme, setTheme }) {
  return (
    <div>
      <h3 className="font-medium">Theme</h3>
      <div className="flex gap-2 mt-2">
        {themes.map((t) => (
          <button
            key={t}
            className={`p-2 rounded-md border ${
              theme === t ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setTheme(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
