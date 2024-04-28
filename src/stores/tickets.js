import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

export const useTicketsStore = defineStore("ticketsStore", () => {
  const ticketsList = ref([]);
  const idSearch = ref(null);
  const dispatchStatus = ref(false);
  const userFilter = ref([5]);
  const finishDispatch = ref(true);
  const apiUtl = import.meta.env.VITE_API_URL;

  async function getIdSearch() {
    try {
      const response = await fetch(`${apiUtl}/search`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data && data.searchId) {
        idSearch.value = data.searchId;
      } else {
        throw new Error("No searchId found in the response");
      }
    } catch (error) {
      console.error("Error in getIdSearch:", error);
    }
  }

  async function getListTickets() {
    try {
      finishDispatch.value = true
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
          el.originStops = el.segments?.[0]?.stops?.length || 0
          el.departureStops = el.segments?.[1]?.stops?.length || 0
          if (el.segments && el.segments.length > 1) {
            el.durationFly = (el.segments[0].duration || 0) + (el.segments[1].duration || 0)
          } else {
            el.durationFly = 0
          }
          el.ratio = el.durationFly ? el.price / el.durationFly : 0
          return el
        })
        ticketsList.value = [...ticketsList.value, ...newTickets]
      }
      if (data && data.stop) {
        finishDispatch.value = false
        return
      }
      getListTickets()
    } catch (error) {
      setTimeout(() => {
        getListTickets()
      }, 2000)
    } finally {
      dispatchStatus.value = false
    }
  }
  return {
    idSearch,
    ticketsList,
    getIdSearch,
    getListTickets,
    dispatchStatus,
    userFilter,
    finishDispatch,
  };
});
