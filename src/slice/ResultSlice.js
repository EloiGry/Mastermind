
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

    playedValid.forEach((el, index) => {
        if(el === finalResult[index]) {
        array.push('black')
      }
        if(el !== finalResult[index] && finalResult.includes(el)) {
            array.push('white')
      }
      });
      array.sort()
      if (array.length < 4) {
          while (array.length < 4) {
            array.push('transparent')
          }
      }

        data[10 - index].color_1 = array[0]
        data[10 - index].color_2 = array[1]
        data[10 - index].color_3 = array[2]
        data[10 - index].color_4 = array[3]
        array = []
        set({ data });
    },
  }))


