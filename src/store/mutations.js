import * as types from './mutation_types'

export const mutations = {
  // payload is rooms array (include id, imageUrl, normalDayPrice, holidayPrice, name)
  [types.GET_ROOMS] (state, payload) {
    if (payload) {
      state.roomsIntro = payload
    }
    state.isLoading = false
  },
  // payload is { room, booking }
  [types.GET_ROOM] (state, payload) {
    if (payload) {
      state.roomDetail = payload.room
      state.roomBooking = payload.booking
    }
    state.isLoading = false
  },
  [types.START_LOADING] (state) {
    state.isLoading = true
  },
  // payload is error object (include action, errMessage)
  [types.UPDATE_ERR] (state, payload) {
    if (payload) {
      state.lastErrorMessage = payload
    }
    state.isLoading = false
  },
  // payload is booking (array include name, tel, date)
  [types.BOOKED_ROOM] (state, payload) {
    if (payload) {
      payload.forEach((booking) => {
        state.roomBooking.push(booking)
      })
    }
    state.isLoading = false
  }
}

export const state = {
  roomsIntro: [],
  roomDetail: {},
  roomBooking: null,
  isLoading: false,
  lastErrorMessage: null
}
