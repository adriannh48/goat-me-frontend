<template>
  <div>
      <div class="container-fluid d-flex justify-content-center mt-3 mb-3">
        <CardCreationActivity  @save="submit"/>
      </div>
      <div class="container-fluid" >
        <VueCal :time="false" locale="pt-br" class="calender" :events="events" />
      </div>
  </div>
</template>

<script>

import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/pt-br.js'

import CardCreationActivity from '../components/CardCreationActivity'
import EventService from '../services/eventService'

export default {
  name: 'Home',
  components: {
     VueCal,
     CardCreationActivity
  },
  data() {
      return {
        name: '',
        selected: '',
        events: []     
      }
  },
  async mounted() {
    
     let response = await EventService.getAll()

      let data = response.data.resData.map(event => {
        return {
           start: event.date,
           end  : event.end_date,
           title: event.name,
           content: event.start_time + ' ' + event.end_time,
           class: 'leisure'
        }
     })

    
     this.events = data

  },
  methods: {
    async submit(data) {

        if(!data.name) {
          this.$toast.error('nome vazio!')
          return ;
        } 
        if(!data.date) {
          this.$toast.error('descrição vazio!')
          return ;
        }
        if(!data.description) {
          this.$toast.error('descrição vazio!')
          return ;
        }
        if(!data.selected) {
          this.$toast.error('selecione uma opção!')
          return ;
        }
        if(!data.start_time) {
          this.$toast.error('selecione um horario inicio!')
          return ;
        }
        if(!data.end_time) {
          this.$toast.error('selecione um horario fim!')
          return ;
        }

        let request = {
            name: data.name,
            description: data.description,
            date: data.date,
            repeat_week: data.repeat_week,
            start_time: data.start_time,
            end_time: data.end_time,
            interval_week: data.interval_repeat
        }

        let response = await EventService.create(request)

        if(response.data.status) {
            this.$toast.success('evento salvo!')
            this.events.push({
                start: response.data.resData.date,
                end  : response.data.resData.end_date,
                title: response.data.resData.name,
                content: response.data.resData.start_time + ' ' + response.data.resData.end_time,
                class: 'leisure'
            })
        }
    }
  }
}
</script>
