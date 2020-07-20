<template>
  <div class="modal fade" :id="pID" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-w-range" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">預約時段</h5>
        </div>
        <div class="modal-body">
          <form>
            <!-- name -->
            <div class="form-group row">
              <label for="inputName" class="col-md-4 col-form-label txt-l">姓名</label>
              <div class="col-md-8">
                <input type="text" class="form-control" id="inputName" placeholder="Name" v-model='name'>
              </div>
            </div>
            <!-- phone -->
            <div class="form-group row">
              <label for="inputPhone" class="col-md-4 col-form-label txt-l">電話</label>
              <div class="col-md-8">
                <input type="tel" class="form-control" id="inputPhone" placeholder="Phone" v-model='phone'>
              </div>
            </div>
            <!-- date -->
            <div class="form-group row row-datepicker">
              <label for="inputPhone" class="col-md-4 col-form-label txt-l">預約起訖</label>
              <div class="col-md-8">
                <v-date-picker id="inputDate"
                                v-model="dateRange"
                                is-expanded
                                :input-props='{
                                  class: "vc-appearance-none vc-border vc-rounded-none vc-border-gray-400 vc-w-full vc-py-2 vc-px-3 vc-text-gray-800 vc-bg-white vc-leading-tight focus:vc-outline-none focus:vc-shadow-outline"
                                }'
                                :popover="{ visibility: 'click' }"
                                color="blue"
                                mode="range"
                                :disabled-dates="pDisabledDate"/>
              </div>
            </div>
            <!-- price detail -->
            <div class="form-group row row-price-bg flex-ccsb">
              <!-- normal days -->
              <div class="price-item flex-rsbc">
                <div class="name">平日時段</div>
                <div class="days">{{normalDayTxt}}</div>
              </div>
              <!-- holiday days -->
              <div class="price-item flex-rsbc">
                <div class="name">假日時段</div>
                <div class="days">{{holidayTxt}}</div>
              </div>
            </div>
            <!-- total price -->
            <div class="form-group row row-total-price">
              <div class="col-12 txt-r">{{totalPrice}}</div>
            </div>
            <!-- buttons -->
            <div class="form-group row row-buttons">
              <div class="col-6">
                <button type="button" class="btn btn-cancel" data-dismiss="modal">取消</button>
              </div>
              <div class="col-6">
                <button type="submit" class="btn btn-confirm" data-dismiss="modal" :disabled="!validated"
                @click="submit">確定預約</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DialogBooking',
  props: {
    pID: String,
    pRoomID: String,
    pDisabledDate: Array,
    pNormalDayPrice: Number,
    pHoliDayPrice: Number
  },
  data () {
    return {
      name: '',
      phone: '',
      dateRange: {}
    }
  },
  methods: {
    submit () {
      if (this.validated) {
        const payload = {
          roomID: this.pRoomID,
          name: this.name,
          phone: this.phone,
          dates: []
        }
        const curDate = new Date(this.dateRange.start)
        const endDate = new Date(this.dateRange.end)
        while (curDate.getTime() < endDate.getTime()) {
          payload.dates.push(`${curDate.getFullYear()}-${this.dec0X(curDate.getMonth() + 1, 2)}-${this.dec0X(curDate.getDate(), 2)}`)
          // next day
          curDate.setDate(curDate.getDate() + 1)
        }
        // call action
        this.bookRoom(payload)
      }
    },
    // fill zeros to the number (ex: 9 with 3 display digits => 009)
    dec0X (num, length) {
      return (Array(length).join('0') + num).slice(-length)
    },
    ...mapActions(['bookRoom'])
  },
  computed: {
    bookingDays () {
      if (this.dateRange && this.dateRange.start && this.dateRange.end) {
        // dateRange is legal
        let nNormalDay = 0
        let nHoliday = 0
        const curDate = new Date(this.dateRange.start)
        const endDate = new Date(this.dateRange.end)
        // check each day is holiday in loop
        while (curDate.getTime() < endDate.getTime()) {
          const dayOfWeek = curDate.getDay()
          if (dayOfWeek === 0 || dayOfWeek === 6) {
            nHoliday += 1
          } else {
            nNormalDay += 1
          }
          // next day
          curDate.setDate(curDate.getDate() + 1)
        }
        return [nNormalDay, nHoliday]
      }
      return [0, 0]
    },
    normalDayPrices () {
      return this.pNormalDayPrice * this.bookingDays[0]
    },
    holidayPrices () {
      return this.pHoliDayPrice * this.bookingDays[1]
    },
    normalDayTxt () {
      return `NT.${this.normalDayPrices} (${this.bookingDays[0]}夜)`
    },
    holidayTxt () {
      return `NT.${this.holidayPrices} (${this.bookingDays[1]}夜)`
    },
    totalPrice () {
      return `NT.${this.normalDayPrices + this.holidayPrices}`
    },
    validated () {
      return (this.name.length > 0 && this.phone.length > 0 && this.dateRange.start && this.dateRange.end)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/_mixins.scss';
@import '../styles/_variables.scss';
$side-width: 2rem;

// modify bootstrap defaul
.modal-w-range {
  min-width: 280px;
  max-width: 400px;
}
.modal-content {
  border-radius: 0;
}
.modal-title {
  font-size: $f-size-4;
  color: $clr-black;
  letter-spacing: 2.51px;
  text-align: center;
}
.modal-body {
  padding: 1rem $side-width 2rem;
}
.btn {
  border-radius: 0;
}
.form-control {
  border-radius: 0;
}

// custom
.row-datepicker {
  margin-bottom: 2rem;
}
.row-price-bg {
  background: $clr-gray-f0;
  @include mx(-$side-width);
  padding: 1rem 0;
}
.price-item {
  font-size: $f-size-1;
  line-height: 1.5;
  color: $clr-font-lv2;
  letter-spacing: 1.25px;
  margin: 0 10%;
}
.row-total-price {
  font-size: $f-size-4;
  line-height: 1.5;
  color: $clr-font-notice;
  letter-spacing: 2.72px;
  margin-bottom: 2rem;
}
.row-buttons {
  margin-bottom: 0;
}
.btn-cancel {
  font-size: $f-size-2;
  color: $clr-font-lv2;
  background: $clr-cancel;
  &:hover {
    // background: $clr-cancel * 0.85;
  }
}
.btn-confirm {
  font-size: $f-size-2;
  color: $clr-white;
  background: $clr-confirm;
  &:hover {
    // background: $clr-confirm * 0.1;
  }
  &:disabled {
    // background: $clr-confirm * 1.5;
  }
}
</style>
