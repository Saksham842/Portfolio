import useWindowStore from "#store/window.js";

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, toggleMaximizeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <button
        type="button"
        className="close border-none outline-none p-0 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          console.log("Close clicked on:", target);
          closeWindow(target);
        }}
        aria-label="Close"
      />
      <button
        type="button"
        className="minimize border-none outline-none p-0 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          console.log("Minimize clicked on:", target);
          minimizeWindow(target);
        }}
        aria-label="Minimize"
      />
      <button
        type="button"
        className="maximize border-none outline-none p-0 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          console.log("Maximize clicked on:", target);
          toggleMaximizeWindow(target);
        }}
        aria-label="Maximize"
      />
    </div>
  );
};

export default WindowControls;