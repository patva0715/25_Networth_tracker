import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid';

let init = [{
  categoryName: "Credit Card",
  icon: 'credit-card',
  color: '#f2893f',
  total: 0,
  top3: [],
  items: [],
  largest: null
}, {
  categoryName: "Student Loans",
  icon: 'graduation-cap',
  color: '#36c9c9',
  total: 0,
  top3: [],
  items: [],
  largest: null
}, {
  categoryName: "Car Loan",
  icon: 'gauge',
  color: '#db2531',
  total: 0,
  top3: [],
  items: [],
  largest: null
}, {
  categoryName: "Mortage",
  icon: 'home',
  color: '#80c926',
  total: 0,
  top3: [],
  items: [],
  largest: null
}
]
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@liabilities', JSON.stringify(value))
  } catch (e) {
    // saving error
    console.log("ERROR STORING")
  }
}



export const liabilities = createSlice({
  name: 'liabilities',
  initialState: init,
  reducers: {
    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      action.payload.id = uuid()
      // Check if category exist
      let index = state.findIndex((elem) => elem.categoryName === action.payload.category)
      // If not then create a new one
      if (index === -1) {
        return [...state, { categoryName: action.payload.category, items: { name: action.payload.name, value: action.payload.value } }]
      }
      // Else push payload
      if (state[index].top3.length < 3) {
        state[index].top3.push(action.payload)
        state[index].top3.sort((a, b) => b.value - a.value)
      }
      else {
        if (state[index].top3[2].value < action.payload.value) {
          state[index].items.push(state[index].top3[2])
          state[index].top3[2] = action.payload
          state[index].top3.sort((a, b) => b.value - a.value)
        }
        else {
          state[index].items.push(action.payload)
        }
      }
      // Add value to total
      state[index].total += action.payload.value
      // Compare Payload to largest asset
      if (!state[index].largest) state[index].largest = action.payload
      else {
        if (state[index].largest.value < action.payload.value) state[index].largest = action.payload
      }
      storeData(state)
    },
    remove: (state, action) => {
      const { category, value, id } = action.payload
      let index = state.findIndex((elem) => elem.categoryName === category)
      // CHECK IF IN TOP 3 THEN REMOVE
      if (state[index].top3.find(elem => elem.id === id)) {
        state[index].top3 = state[index].top3.filter(x => x.id !== id)
        if (state[index].items.length > 0) {
          let max = { value: 0 }
          state[index].items.map((item, idx) => {
            if (item.value > max.value) {
              max = item
            }
          })
          state[index].top3[2] = max
          state[index].items = state[index].items.filter(x => x.id !== max.id)
        }
      }
      // ELSE REMOVE IN ITEMS
      else {
        state[index].items = state[index].items.filter(x => x.id !== id)
      }
      state[index].total -= value
      storeData(state)


    },
    addInit: (state, action) => {
      storeData(action.payload || init)
      return action.payload || init
    },

  },
})


// Action creators are generated for each case reducer function
export const { add, remove, addInit } = liabilities.actions

export default liabilities.reducer




