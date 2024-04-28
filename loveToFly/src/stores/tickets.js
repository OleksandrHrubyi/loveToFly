import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const useTicketsStore = defineStore('ticketsStore', () => {
  const ticketsList = ref([])
  const idSearch = ref(null)
  const dispatchStatus = ref(false)
  const userFilter = ref([5])
  const finishDispatch = ref(true)
  const apiUtl = import.meta.env.VITE_API_URL

  async function getIdSearch() {
    try {
      const response = await fetch(`${apiUtl}/search`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data && data.searchId) {
        idSearch.value = data.searchId
      } else {
        throw new Error('No searchId found in the response')
      }
    } catch (error) {
      console.error('Error in getIdSearch:', error)
    }
  }

  async function getListTickets() {
    while (finishDispatch.value) {
      try {
        dispatchStatus.value = true
        const response = await fetch(`${apiUtl}/tickets?searchId=${idSearch.value}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()

        if (!data) continue
        if (data.tickets) {
          const newTickets = data.tickets.map((ticket) => {
            const { segments } = ticket
            return {
              ...ticket,
              keyId: uuidv4(),
              originStops: segments?.[0]?.stops?.length || 0,
              departureStops: segments?.[1]?.stops?.length || 0,
              durationFly:
                segments.length > 1 ? (segments[0].duration || 0) + (segments[1].duration || 0) : 0,
              ratio: ticket.price / (ticket.durationFly || 1)
            }
          })
          ticketsList.value = [...ticketsList.value, ...newTickets]
        }

        if (data.stop) {
          finishDispatch.value = false
          return
        }
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } finally {
        dispatchStatus.value = false
      }
    }
  }

  return {
    idSearch,
    ticketsList,
    getIdSearch,
    getListTickets,
    dispatchStatus,
    userFilter,
    finishDispatch
  }
})
