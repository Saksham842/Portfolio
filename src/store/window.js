import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/index.js";

const useWindowStore = create(
	immer((set) => ({
		windows: WINDOW_CONFIG,
		nextZIndex: INITIAL_Z_INDEX + 1,

		openWindow: (windowKey, data = null) =>
			set((state) => {
				const win = state.windows[windowKey];
				win.isOpen = true;
				win.isMinimized = false;
				win.zIndex = state.nextZIndex;
				win.data = data ?? win.data;
				state.nextZIndex++;
			}),

		closeWindow: (windowKey) =>
			set((state) => {
				const win = state.windows[windowKey];
				if (!win) return;
				win.isOpen = false;
				win.isMinimized = false;
				win.isMaximized = false;
				win.zIndex = INITIAL_Z_INDEX;
				win.data = null;
			}),

		focusWindow: (windowKey) =>
			set((state) => {
				const win = state.windows[windowKey];
				if (!win) return;
				win.zIndex = state.nextZIndex++;
			}),

		minimizeWindow: (windowKey) =>
			set((state) => {
				const win = state.windows[windowKey];
				if (!win) return;
				win.isMinimized = true;
			}),

		unminimizeWindow: (windowKey) =>
			set((state) => {
				const win = state.windows[windowKey];
				if (!win) return;
				win.isMinimized = false;
			}),

		toggleMaximizeWindow: (windowKey) =>
			set((state) => {
				const win = state.windows[windowKey];
				if (!win) return;
				win.isMaximized = !win.isMaximized;
			}),
	})),
);

export default useWindowStore;

console.log("[store/window.js] Store file executed!");
if (typeof useWindowStore?.getState === "function") {
	console.log("[store/window.js] Registered keys:", Object.keys(useWindowStore.getState()));
}
