<script setup>
import { ref } from 'vue'
import { onMounted, computed } from 'vue'
import { useTickerStore } from '@/stores/tickets'
import FilterTickets from '@/components/FilterTickets.vue'
import CardComponent from '@/components/CardComponent.vue'
import { filters } from '@/constants/filtersData'

const countList = 5
let stateFilter = ref(1)
let limitCard = ref(5)

const userStore = useTickerStore()

onMounted(async () => {
  await userStore.getIdSearch()
  await userStore.getListTickets()
  console.log(userStore.ticketsList)
})

const filteredTicker = computed(() => {
  return userStore.ticketsList.slice(0, limitCard.value)
})

function handlebtnFilter(id) {
  stateFilter.value = id
}

function showMoreCard() {
  console.log('hi')
  limitCard.value += countList
}
</script>

<template>
  <section class="main-section" aria-label="Основний контент">
    <h1 class="visually-hidden">Авіа білети</h1>
    <div class="container flex-container">
      <div><FilterTickets /></div>
      <div class="main-list-container">
        <ul class="list-btn-filter">
          <li v-for="item in filters" :key="item.id" class="list-btn-item">
            <button
              @click="handlebtnFilter(item.id)"
              class="btn-filter"
              :class="[
                { 'active-btn-filter': stateFilter === item.id },
                { 'left-border': stateFilter === 1 && item.id === 3 },
                { 'right-border': stateFilter === 3 && item.id === 1 }
              ]"
            >
              {{ item.name }}
            </button>
          </li>
        </ul>

        <ul class="main-list-card">
          <li class="main-card-item" v-for="card in filteredTicker" :key="card.keyId">
            <CardComponent
              :ticketPrice="card.price"
              :companyName="card.carrier"
              :timeDeparture="card.segments?.[0]?.date || ''"
              :departureDuration="card.segments?.[0]?.duration || 0"
              :timeArrives="card.segments?.[1]?.date || ''"
              :arrivasDuration="card.segments?.[1]?.duration || 0"
              :originTitleDepart="card.segments?.[0]?.origin || ''"
              :destinTitleDepart="card.segments?.[0]?.destination || ''"
              :originTitleArrivas="card.segments?.[1]?.origin || ''"
              :destinTitleArrivas="card.segments?.[1]?.destination || ''"
              :originStops="card.segments?.[0]?.stops || []"
              :departureStops="card.segments?.[1]?.stops || []"
            />
          </li>
        </ul>
        <div>
          <button @click="showMoreCard" class="show-more-btn">Завантажити ще 5 квитків</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.main-section {
  padding-bottom: 50px;
}

.container {
  max-width: 786px;
  padding: 0 16px;
  margin: 0 auto;
}

.flex-container {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.main-list-container {
  width: 100%;
}

.btn-filter {
  padding: 15px;
  color: var(--bi-color-text);
  text-align: center;
  font-size: 12px;
  font-family: 'Open Sans';
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all var(--transition-style);
  border-top: 1px solid var(--bi-color-border-2);
  border-bottom: 1px solid var(--bi-color-border-2);
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  width: 100%;
  user-select: none;
}

.list-btn-filter {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
}

.list-btn-item {
  width: calc(100% / 3);
  &:first-child {
    .btn-filter {
      border-left: 1px solid var(--bi-color-border-2);
      border-radius: 6px 0 0px 6px;
    }
    .active-btn-filter {
      border-left: 1px solid var(--bi-color-brand);
    }
  }

  &:last-child {
    .btn-filter {
      border-right: 1px solid var(--bi-color-border-2);
      border-radius: 0 6px 6px 0;
    }

    .active-btn-filter {
      border-right: 1px solid var(--bi-color-brand);
    }
  }
}

.active-btn-filter {
  color: var(--bi-color-active-text);
  background-color: var(--bi-color-brand);
  border-top: 1px solid var(--bi-color-brand);
  border-bottom: 1px solid var(--bi-color-brand);
}

.left-border {
  border-left: 1px solid var(--bi-color-border-2);
}

.right-border {
  border-right: 1px solid var(--bi-color-border-2);
}

.main-list-card {
  margin-bottom: 20px;
}

.show-more-btn {
  background-color: var(--bi-color-brand);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bi-color-active-text);
  font-size: 12px;
  line-height: 1.6;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 15px 20px;
  border-radius: 6px;
  user-select: none;
}
.main-card-item {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
