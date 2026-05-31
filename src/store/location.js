import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "#constants/index.js";

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create(
	immer((set) => ({
		activeLocation: DEFAULT_LOCATION,

		// Require an explicit argument; ignore undefined calls to prevent accidental
		setActiveLocation: (location) =>
			set((state) => {
				if (location === undefined) return;
				state.activeLocation = location; // allow explicit null if intended
			}),

		resetActiveLocation: () =>
			set((state) => {
				state.activeLocation = DEFAULT_LOCATION;
			}),
	})),
);

export default useLocationStore;
