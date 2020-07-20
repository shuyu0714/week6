<template>
  <div class="wrap position-relative">
    <!-- default bg -->
    <div :class="['bg', 'position-absolute', 'fixed-top', {'active': (!curShowRoomID) }]"
          :style="{'background-image': 'url(' + defaultBg + ')'}"></div>
    <!-- loop background -->
    <div v-for="room in roomsIntro" :key="room.id"
          :class="['bg', 'position-absolute', 'fixed-top', {'active': (curShowRoomID === room.id) }]"
          :style="{'background-image': 'url(' + room.imageUrl + ')'}"></div>
    <!-- web content -->
    <div class="container">
      <div class="row a1-header">
        <!-- header -->
        <div class="col-12 flex-ccc">
          <!-- logo -->
          <img src='../assets/logo_white.svg'>
          <!-- contact -->
          <div class="flex-rcc a2-contact">
            <!-- social media -->
            <div class="flex-rcc">
              <img class="brand-icon" src="../assets/brand_instagram.svg" alt="">
              <img class="brand-icon" src="../assets/brand_facebook.svg" alt="">
            </div>
            <!-- line -->
            <div class="contact-line"/>
            <!-- contact information -->
            <div class="flex-ccl">
              <!-- info: phone -->
              <div class="flex-rlc contact-detail">
                <img class="icon" src="../assets/icon_phone.svg" alt="">
                <p>02-17264937</p>
              </div>
              <!-- info: envelope -->
              <div class="flex-rlc contact-detail">
                <img class="icon" src="../assets/icon_envelope.svg" alt="">
                <p>whitespace@whitespace.com.tw</p>
              </div>
              <!-- info: home -->
              <div class="flex-rlc contact-detail">
                <img class="icon" src="../assets/icon_home.svg" alt="">
                <p>台北市羅斯福路八段23號</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row a1-rooms">
        <div class="col-12 col-md-6 col-lg-4 flex-rcc"
              v-for="room in roomsIntro"
              :key="room.id"
              @click="clickRoom(room)">
          <RoomCard :roomBg="room.imageUrl"
                    :roomName="room.name"
                    :roomNormalPrice="room.normalDayPrice"
                    :roomHolidayPrice="room.holidayPrice" />
        </div>
      </div>
    </div>
    <!-- loading -->
    <Loading></Loading>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loading from '@/components/Loading.vue'
import RoomCard from '@/components/RoomCard.vue'

export default {
  name: 'Rooms',
  components: {
    Loading,
    RoomCard
  },
  data () {
    return {
      defaultBg: 'https://images.unsplash.com/photo-1558976825-6b1b03a03719?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      curShowRoomID: null
    }
  },
  mounted () {
    this.getRooms()
    setInterval(() => {
      if (this.roomsIntro.length > 0) {
        const idx = Math.floor(Math.random() * this.roomsIntro.length)
        this.curShowRoomID = this.roomsIntro[idx].id
      }
    }, 5000)
  },
  methods: {
    clickRoom (room) {
      this.$router.push({ name: 'RoomInfo', params: { id: room.id } })
    },
    ...mapActions(['getRooms'])
  },
  computed: {
    ...mapGetters(['roomsIntro'])
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.wrap {
  width: 100%;
  height: 100%;
  .bg {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: 0;
    opacity: 0;
    transition: opacity 1s linear;
  }
  .active {
    opacity: 1;
  }
}
.a1-header {
  padding-top: 13%;
  padding-bottom: 155px;
}
.a2-contact {
  width: 100%;
  margin-top: 4%;
}
.brand-icon {
  height: $f-size-2 * 1.5;
  width: $f-size-2 * 1.5;
  margin: $f-size-1 * 0.5;
}
.contact-line {
  width: 1px;
  height: $f-size-3 * 1.5 * 3;
  margin: 0 $f-size-2 * 1.5;
  background: $clr-white;
}
.contact-detail {
  color: $clr-white;
  line-height: $f-size-3 * 1.5;
  .icon {
    height: $f-size-3;
    width: $f-size-3;
    margin: $f-size-3 * 0.25 0;
    margin-right: $f-size-3;
  }
}
</style>
