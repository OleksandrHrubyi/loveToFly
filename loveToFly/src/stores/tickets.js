import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const useTickerStore = defineStore('tickerStore', () => {
  const ticketsList = ref([])
  let idSearch = ref(null)

  async function getIdSearch() {
    try {
      const response = await fetch('https://avs-backend.vercel.app/search')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data && data.searchId) {
        idSearch.value = data.searchId
      } else {
        console.error('getIdSearch: No searchId found in the response')
      }
    } catch (error) {
      console.error('error getIdSearch', error.errorMessage)
    }
  }

  async function getListTickets() {
    try {
      const response = await fetch(
        `https://avs-backend.vercel.app/tickets?searchId=${idSearch.value}`
      )
      if (!response.ok) {
        throw new Error('getListTickets: Network response was not ok ')
      }
      const data = await response.json()
      if (data && data.tickets) {
        ticketsList.value = data.tickets.map((el) => {
          el.keyId = uuidv4()
          return el
        })
      }
    } catch (error) {
      console.error('error getListTickets', error.errorMessage)
    }
  }

  return { idSearch, ticketsList, getIdSearch, getListTickets }
})
