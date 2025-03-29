export const SideMenu = () => {
  const options = ["auto", "light", "dark"];

  return (
    <details class="z-10" {...{ "@click.away": "$el.removeAttribute('open')" }}>
      <summary>Theme</summary>
      <ul className="bg-base-100 rounded-t-none p-2">
        {options.map((color) => (
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              x-on:change="localStorage.theme = $el.value"
              className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
              aria-label={color}
              value={color}
              x-bind:checked={`localStorage.theme === "${color}"`}
            />
          </li>
        ))}
      </ul>
    </details>
  );
};
