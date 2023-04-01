export function Input({ title, ...props }) {
  return (
    <div className="my-3">
      <label className="my-1 font-bold text-lg">{title}</label>
      <input
        className="bg-form w-full rounded-lg text-black p-3 border focus:outline-none"
        {...props}
      />
    </div>
  );
}
