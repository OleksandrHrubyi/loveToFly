import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const useTickerStore = defineStore('tickerStore', () => {
  const ticketsList = ref([])
  let idSearch = ref(null)
  let dispatchStatus = ref(false)

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
      dispatchStatus.value = true
      const response = await fetch(
        `https://avs-backend.vercel.app/tickets?searchId=${idSearch.value}`
      )
      if (!response.ok) {
        throw new Error('getListTickets: Network response was not ok ')
      }
      const data = await response.json()
      if (data && data.tickets) {
        const newTickets = data.tickets.map((el) => {
          el.keyId = uuidv4()
          return el
        })
        ticketsList.value = [...ticketsList.value, ...newTickets]
      }
      if (data && data.stop) {
        return
      }
      getListTickets()
    } catch (error) {
      console.error('error getListTickets', error.errorMessage)
      setTimeout(() => {
        getListTickets()
      }, 2000)
    } finally {
      dispatchStatus.value = false
    }
  }

  return { idSearch, ticketsList, getIdSearch, getListTickets, dispatchStatus }
})
