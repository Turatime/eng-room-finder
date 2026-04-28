import { create } from "zustand";
import { Booking, initialBookings, currentUser } from "@/data/mockData";

interface AppState {
  bookings: Booking[];
  isAuthenticated: boolean;
  role: "staff" | "admin";
  addBooking: (b: Booking) => void;
  cancelBooking: (id: string) => void;
  approveBooking: (id: string) => void;
  rejectBooking: (id: string) => void;
  login: (role: "staff" | "admin") => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  bookings: initialBookings,
  isAuthenticated: true,
  role: currentUser.role,
  addBooking: (b) => set((s) => ({ bookings: [b, ...s.bookings] })),
  cancelBooking: (id) =>
    set((s) => ({
      bookings: s.bookings.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)),
    })),
  approveBooking: (id) =>
    set((s) => ({
      bookings: s.bookings.map((b) => (b.id === id ? { ...b, status: "approved" } : b)),
    })),
  rejectBooking: (id) =>
    set((s) => ({
      bookings: s.bookings.map((b) => (b.id === id ? { ...b, status: "rejected" } : b)),
    })),
  login: (role) => set({ isAuthenticated: true, role }),
  logout: () => set({ isAuthenticated: false }),
}));
