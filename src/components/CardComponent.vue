<script setup>
import { computed, toRefs } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import defaultLogo from '@/assets/img/fake-comp-logo.png'

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

const formatedPrice = computed(() => {
  if (ticketPrice.value > 0) {
    const formattedPrice = ticketPrice.value.toLocaleString('uk-UA')
    return `${formattedPrice} ₴`
  }
  return '- ₴'
})

const formatedImage = computed(() => {
  if (companyName.value) {
    return `https://pics.avs.io/99/36/${companyName.value}.png`
  }
  return defaultLogo
})

const formDateDepart = computed(() => {
  if (!timeDeparture.value) {
    return 'Час недоступний'
  }
  if (!departureDuration.value) {
    return 'Тривалість недоступна'
  }
  const startTime = new Date(timeDeparture.value)
  const endTime = new Date(startTime.getTime() + departureDuration.value * 60000)
  const startTimeFormatted = formatTime(startTime)
  const endTimeFormatted = formatTime(endTime)
  return `${startTimeFormatted} – ${endTimeFormatted}`
})

const formDateArrive = computed(() => {
  if (!timeArrives.value) {
    return 'Час недоступний'
  }
  if (!arrivasDuration.value) {
    return 'Тривалість недоступна'
  }
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
  const stopsCount = originStops.value?.length || 0
  if (stopsCount === 0) {
    return 'Без пересадок'
  }
  const stopWord = stopsCount === 1 ? 'пересадка' : 'пересадки'
  return `${stopsCount} ${stopWord}`
})

const countStopDeparture = computed(() => {
  const stopsCount = departureStops.value?.length || 0
  if (stopsCount === 0) {
    return 'Без пересадок'
  }
  const stopWord = stopsCount === 1 ? 'пересадка' : 'пересадки'
  return `${stopsCount} ${stopWord}`
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
  if (date) {
    return date.toISOString().substring(11, 16)
  }
}

function setDefaultLogo(event) {
  event.target.src = defaultLogo
}
</script>

<template>
  <div class="card-container">
    <div class="card-header">
      <data class="card-price" :value="ticketPrice">{{ formatedPrice }}</data>
      <img
        :src="formatedImage"
        @error="setDefaultLogo"
        class="card-image"
        alt="logo company"
        width="99"
        height="31"
      />
    </div>
    <div class="card-body">
      <ul class="departure-list travel-list">
        <li class="travel-item">
          <div class="item-top-data">{{ formatCodeDepurt }}</div>
          <div class="item-bottom-data">
            {{ formDateDepart }}
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
            {{ formDateArrive }}
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
@import '@/assets/styles/mediaWidth.scss';

.card-container {
  padding: 23px 20px 20px;
  background-color: var(--bi-color-background);
  filter: drop-shadow(var(--box-shadow-style));
  box-shadow: var(--box-shadow-style);
  border-radius: 4px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
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
  font-weight: 600;

  @media screen and (max-width: $max-mobile-width) {
    font-size: 10px;
  }
}

.item-bottom-data {
  color: var(--bi-color-text);
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (max-width: $max-mobile-width) {
    font-size: 10px;
  }
}

.list-code-data {
  margin-right: 4px;
  color: var(--bi-color-text);
  font-size: 14px;
  line-height: 1.5;

  &:last-child {
    margin-right: 0;

    .cust-coma {
      display: none;
    }
  }
}
</style>
