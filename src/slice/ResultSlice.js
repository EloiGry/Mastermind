
import { ResponseData } from '../data/ResponseData'

import { create } from 'zustand'

export const useStore = create((set, get) => ({
    responseData: ResponseData,
    played: [],
    updatePlayed: async(data) => {
      set({ played: data.concat(get().played)})
    },
    updateData: (playedValid, finalResult, index) => {
        const data = get().responseData;
        let array = []

    finalResult.forEach((el, index) => {
        if(el === playedValid[index]) {
        array.push('black')
      }
        else if(el !== playedValid[index] && playedValid.includes(el)) {
            array.push('white')
      }
      else (
        array.push('transparent')
      )
        
      
      });
      array.sort()

        data[10 - index].color_1 = array[0]
        data[10 - index].color_2 = array[1]
        data[10 - index].color_3 = array[2]
        data[10 - index].color_4 = array[3]
    
        set({ data });
    },
  }))


