<template>
    <div>
        <b-card 
            border-variant="light" 
            header="Criação de atividade esportiva" 
            header-text-variant="light"
            class="card-activity-sporty"
            >
            <b-card-body>
                <b-form-group
                label="Evento"
                label-for="input-event"
                >
                <b-form-input id="input-event" v-model="name" value-zone="UTC-3"></b-form-input>
                </b-form-group>

                <b-form-group
                label="descrição"
                label-for="input-description"
                >
                <b-form-textarea
                    id="input-description"
                    v-model="description"
                    rows="3"
                ></b-form-textarea>
                </b-form-group>

                <b-row>
                    <b-col cols="4">
                        <b-form-group
                            label="De:"
                            label-for="de"
                        >
                            <datetime v-model="date" class="theme-purple"/>
                        </b-form-group>
                    </b-col>

                    <b-col>
                        <b-form-radio v-model="selected"  size="lg"  name="radios" value="0">
                        Não se repete
                        </b-form-radio>
                        <b-form-radio v-model="selected"  size="lg"  name="radios" value="1">
                        Repetir
                        </b-form-radio>
                    </b-col>
                
                </b-row>

                <b-row>
                    <b-col cols="2">
                        <b-form-group
                            label="Inicio:"
                            label-for="inicio"
                        >
                            <b-form-select v-model="start_time" :options="options"></b-form-select>
                        </b-form-group>
                    </b-col>

                    <b-col cols="2">
                        <b-form-group
                            label="Termino:"
                            label-for="termino"
                        >
                        <b-form-select v-model="end_time" :options="options"></b-form-select>
                        </b-form-group>
                    </b-col>

                    <b-col>
                        <div class="range-position mt-2">
                        <b-form-group
                            :label="`intervalo de semanas: ${interval_repeat}`"
                            label-for="inicio"
                        >

                        <b-form-input 
                            :disabled="!repeat_week" 
                            v-model="interval_repeat"  
                            type="range" 
                            min="0" max="100"
                        >
                        </b-form-input>
                        
                        </b-form-group>
                        
                        </div>
                    </b-col>
                </b-row>
                
                <div class="d-flex justify-content-end">
                    <button class="btn btn-purple" @click="emitSave">salvar</button>
                </div>

            </b-card-body>
        </b-card>
    </div>

</template>

<script>
import { Datetime } from 'vue-datetime';

export default {
  name: 'CardCreationActivity',
  components: {
    datetime: Datetime
  },
  data() {
      return {
          name: null,
          description:null,
          start_time:null,
          end_time:null,
          selected: null,
          repeat_week: false,
          interval_repeat:0,
          date:null,
          options: [
          { value: null, text: 'Please select time' },
          { value: '06:00',  text: '06:00' },
          { value: '07:00',  text: '07:00' },
          { value: '08:00',  text: '08:00' },
          { value: '09:00',  text: '09:00' },
          { value: '10:00',  text: '10:00' },
          { value: '11:00',  text: '11:00' },
          { value: '12:00',  text: '12:00' },
          { value: '13:00',  text: '13:00' },
          { value: '14:00',  text: '14:00' },
          { value: '15:00',  text: '15:00' }
        ]
        }
    },
    methods: {
        emitSave() {
            this.$emit('save', {
               name: this.name,
               description: this.description,
               date: this.date,
               start_time: this.start_time,
               end_time: this.end_time,
               selected: this.selected,
               repeat_week: this.repeat_week,
               interval_repeat: this.interval_repeat
            })
        }
    },
    watch: {
        selected() {
            if(this.selected == 0) {
                this.repeat_week = false
                this.interval_repeat = 0
                return ;
            }
            this.repeat_week = true
        }
    }
}
</script>
