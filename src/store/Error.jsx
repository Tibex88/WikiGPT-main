import { create } from 'zustand'

const useErrorStore = create((set) => ({
  isError:false,
  error:{
    title:'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    content:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum eveniet cupiditate repellendus perspiciatis reiciendis, nemo ipsa sequi harum illum culpa corrupti blanditiis, ex unde tempora provident ad rerum. Animi, soluta.'
  },
  setError: (e) => set(() => ({ isError:true, error: e })),
  removeError: () => set(() =>
   ({ 
    isError:false, 
    error: {
        title:null,
        content:null
        } 
    })),
}))


export default useErrorStore