import { create } from 'zustand'

const useSideBarStore = create((set) => ({
  sidebar:true,
  toggleSidebar: () => set((state) => ({ sidebar: !(state.sidebar) })),
}))


export default useSideBarStore