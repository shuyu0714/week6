import axios from 'axios'
import * as types from './mutation_types'

const actions = {
  getRooms: ({ commit }, payload) => {
    // [API] get all rooms
    commit(types.START_LOADING)
    axios.get('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', {
      headers: {
        Authorization: process.env.VUE_APP_API_TOKEN,
        accept: 'application/json'
      }
    }).then((response) => {
      // get response
      if (response && response.data && response.data.success) {
        commit(types.GET_ROOMS, response.data.items)
      }
    }).catch((err) => {
      commit(types.UPDATE_ERR, { action: 'getRooms', errMessage: err })
    })
  },
  getRoom: ({ commit }, payload) => {
    // [API] get one room detail
    commit(types.START_LOADING)
    const url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${payload}` // payload must be a room id
    axios.get(url, {
      headers: {
        Authorization: process.env.VUE_APP_API_TOKEN,
        accept: 'application/json'
      }
    }).then((response) => {
      if (response && response.data && response.data.success) {
        commit(types.GET_ROOM, { room: response.data.room[0], booking: response.data.booking })
      }
    }).catch((err) => {
      // error found
      commit(types.UPDATE_ERR, { action: 'getRoom', errMessage: err })
    })
  },
  bookRoom: ({ commit }, payload) => {
    // [API] book a room with several date
    commit(types.START_LOADING)
    const url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${payload.roomID}`
    const data = {
      name: payload.name,
      tel: payload.phone,
      date: payload.dates
    }
    axios.post(url, data, {
      headers: {
        Authorization: process.env.VUE_APP_API_TOKEN,
        accept: 'application/json'
      }
    }).then((response) => {
      // receive the response
      if (response && response.data && response.data.success) {
        commit(types.BOOKED_ROOM, response.data.booking)
      }
    }).catch((err) => {
      commit(types.UPDATE_ERR, { action: 'bookRoom', errMessage: err })
    })
  }
}

export default actions
