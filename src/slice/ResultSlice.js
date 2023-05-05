
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
        let count = 0
        

    playedValid.forEach((el, index) => {
        if(el === finalResult[index]) {
        array.push('black')
      }
        else if(finalResult.includes(el)) {
          const filter1 = finalResult.filter((item, i) => item === el && item !== playedValid[i])
          const filter2 = playedValid.filter((item, i) => item === el && item !== finalResult[i])

          if (filter2.length > filter1.length) {
            if ((filter1.length - count) > 0) {
              array.push('white') 
              count ++
            } else {
              array.push('transparent')
              count = 0
            }
          } else {
            array.push('white')
          }
      }
      else {
        array.push('transparent')
      }
        
        
      });
const statusOrder = ['black','white', 'transparent']
array.sort((a, b) => statusOrder.indexOf(a) - statusOrder.indexOf(b));



        data[10 - index].color_1 = array[0]
        data[10 - index].color_2 = array[1]
        data[10 - index].color_3 = array[2]
        data[10 - index].color_4 = array[3]
    
        set({ data });
    },
  }))


