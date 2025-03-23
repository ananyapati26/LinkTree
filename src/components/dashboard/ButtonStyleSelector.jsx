const buttonStyles = ["filled", "outline", "soft"];

export default function ButtonStyleSelector({ buttonStyle, setButtonStyle }) {
  return (
    <div>
      <h3 className="font-medium">Button Style</h3>
      <div className="flex gap-2 mt-2">
        {buttonStyles.map((style) => (
          <button
            key={style}
            className={`p-2 rounded-md border ${
              buttonStyle === style ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setButtonStyle(style)}
          >
            {style.charAt(0).toUpperCase() + style.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
