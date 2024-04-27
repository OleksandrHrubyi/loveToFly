<script setup>
import { computed, onMounted, toRefs } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  ticketPrice: {
    type: Number,
    default: 0
  },
  companyName: {
    type: String,
    default: ''
  },
  timeDeparture: {
    type: String,
    default: ''
  },
  departureDuration: {
    type: Number,
    default: 0
  },
  timeArrives: {
    type: String,
    default: ''
  },
  arrivasDuration: {
    type: Number,
    default: 0
  },
  originTitleDepart: {
    type: String,
    default: ''
  },
  destinTitleDepart: {
    type: String,
    default: ''
  },
  originTitleArrivas: {
    type: String,
    default: ''
  },
  destinTitleArrivas: {
    type: String,
    default: ''
  },
  originStops: {
    type: Array,
    default: () => []
  },
  departureStops: {
    type: Array,
    default: () => []
  }
})

const {
  ticketPrice,
  companyName,
  timeDeparture,
  departureDuration,
  timeArrives,
  arrivasDuration,
  originTitleDepart,
  destinTitleDepart,
  originTitleArrivas,
  destinTitleArrivas,
  originStops,
  departureStops
} = toRefs(props)

onMounted(() => {
  console.log('hi')
})

const formatedPrice = computed(() => {
  if (ticketPrice.value > 0) {
    let priceStr = ticketPrice.value.toString()
    if (priceStr.length > 2) {
      priceStr = priceStr.slice(0, 2) + ' ' + priceStr.slice(2)
    }
    return `${priceStr} ₴`
  }
  return '- ₴'
})

const formatedImage = computed(() => {
  return `https://pics.avs.io/99/36/${companyName.value}.png`
})

const formDateDepart = computed(() => {
  const startTime = new Date(timeDeparture.value)
  const endTime = new Date(startTime.getTime() + departureDuration.value * 60000)
  const startTimeFormatted = formatTime(startTime)
  const endTimeFormatted = formatTime(endTime)
  return `${startTimeFormatted} – ${endTimeFormatted}`
})

const formDateArrive = computed(() => {
  const startTime = new Date(timeArrives.value)
  const endTime = new Date(startTime.getTime() + arrivasDuration.value * 60000)
  const startTimeFormatted = formatTime(startTime)
  const endTimeFormatted = formatTime(endTime)
  return `${startTimeFormatted} – ${endTimeFormatted}`
})

const countDuratHoursDep = computed(() => {
  const hours = Math.floor(departureDuration.value / 60)
  const minutes = departureDuration.value % 60
  return `${hours}год  ${minutes}хв`
})

const countDuratHoursArriv = computed(() => {
  const hours = Math.floor(arrivasDuration.value / 60)
  const minutes = arrivasDuration.value % 60
  return `${hours}год  ${minutes}хв`
})

const formatCodeDepurt = computed(() => {
  return `${originTitleDepart.value} – ${destinTitleDepart.value}`
})

const formatCodeArrives = computed(() => {
  return `${originTitleArrivas.value} – ${destinTitleArrivas.value}`
})

const countStopOrigin = computed(() => {
  if (originStops.value && originStops.value.length) {
    if (originStops.value.length > 1) {
      return `${originStops.value.length} пересадки`
    } else {
      return `${originStops.value.length} пересадкa`
    }
  } else {
    return 'Без Пересадок'
  }
})

const countStopDeparture = computed(() => {
  if (departureStops.value && departureStops.value.length) {
    if (departureStops.value.length > 1) {
      return `${departureStops.value.length} пересадки`
    } else {
      return `${departureStops.value.length} пересадкa`
    }
  } else {
    return 'Без Пересадок'
  }
})

const listStopOrigin = computed(() => {
  if (originStops.value && originStops.value.length) {
    return originStops.value.map((airport) => ({
      id: uuidv4(),
      name: airport
    }))
  } else {
    return []
  }
})

const listStopDeparture = computed(() => {
  if (departureStops.value && departureStops.value.length) {
    return departureStops.value.map((airport) => ({
      id: uuidv4(),
      name: airport
    }))
  } else {
    return []
  }
})

function formatTime(date) {
  return date.toISOString().substring(11, 16)
}
</script>

<template>
  <div class="card-container">
    <div class="card-header">
      <data class="card-price" :value="ticketPrice">{{ formatedPrice }}</data>
      <img :src="formatedImage" class="card-image" alt="logo company" />
    </div>
    <div class="card-body">
      <ul class="departure-list travel-list">
        <li class="travel-item">
          <div class="item-top-data">{{ formatCodeDepurt }}</div>
          <div class="item-bottom-data">
            <time>{{ formDateDepart }}</time>
          </div>
        </li>
        <li class="travel-item">
          <div class="item-top-data">Тривалість</div>
          <div class="item-bottom-data">{{ countDuratHoursDep }}</div>
        </li>
        <li class="travel-item">
          <div class="item-top-data">{{ countStopOrigin }}</div>
          <ul class="item-bottom-data">
            <li class="list-code-data" v-for="code in listStopOrigin" :key="code.id">
              {{ code.name }}<span class="cust-coma">,</span>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="arrives-list travel-list">
        <li class="travel-item">
          <div class="item-top-data">{{ formatCodeArrives }}</div>
          <div class="item-bottom-data">
            <time>{{ formDateArrive }} </time>
          </div>
        </li>
        <li class="travel-item">
          <div class="item-top-data">Тривалість</div>
          <div class="item-bottom-data">{{ countDuratHoursArriv }}</div>
        </li>
        <li class="travel-item">
          <div class="item-top-data">{{ countStopDeparture }}</div>
          <div class="item-bottom-data">
            <ul class="item-bottom-data">
              <li class="list-code-data" v-for="code in listStopDeparture" :key="code.id">
                {{ code.name }}<span class="cust-coma">,</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  padding: 20px;
  background-color: var(--bi-color-background);
  filter: drop-shadow(var(--box-shadow-style));
  box-shadow: var(--box-shadow-style);
  border-radius: 4px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.card-image {
  margin-right: 16px;
}

.card-price {
  color: var(--bi-color-brand);
  font-size: 24px;
  font-weight: 600;
  line-height: 1;
}

.travel-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.departure-list {
  margin-bottom: 10px;
}

.travel-item {
  width: calc((100% - 40px) / 3);
}

.item-top-data {
  color: var(--bi-color-neutral-1);
  line-height: 1.5;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.item-bottom-data {
  color: var(--bi-color-text);
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.list-code-data {
  margin-right: 4px;

  &:last-child {
    margin-right: 0;

    .cust-coma {
      display: none;
    }
  }
}
</style>
