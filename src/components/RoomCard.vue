<template>
  <div class="roomWrap position-relative">
    <div class="room-img position-absolute fixed-top"
          :style="{ 'background-image': 'url('+ roomBg +')'}">
    </div>
    <div class="room-info position-absolute fixed-bottom flex-ccl">
      <div class="room-type-main">{{roomName}}</div>
      <div class="room-type-sub">{{subTitle}}</div>
      <div class="room-price flex-rsbb">
        <div class="normal-price flex-rlb">{{normalPriceTxt}}
          <div class="normal-day">平日</div>
        </div>
        <div class="holiday">{{holidayPriceTxt}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomCard',
  props: {
    roomBg: String,
    roomName: String,
    roomNormalPrice: Number,
    roomHolidayPrice: Number
  },
  data () {
    return {
      subTitleMap: {
        'Single Room': '單人房',
        'Deluxe Single Room': '豪華單人房',
        'Double Room': '單床雙人房',
        'Deluxe Double Room': '豪華單床雙人房',
        'Twin Room': '雙床雙人房',
        'Deluxe Twin Room': '豪華雙床雙人房'
      }
    }
  },
  computed: {
    subTitle: function () {
      return this.subTitleMap[this.roomName]
    },
    normalPriceTxt: function () {
      return `NT.${this.roomNormalPrice}`
    },
    holidayPriceTxt: function () {
      return `NT.${this.roomHolidayPrice} 假日`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.roomWrap {
  width: 300px;
  height: 350px;
  margin-bottom: 58px;
  background: $clr-gray-f7;
  box-shadow: 2px 2px 9px 0 rgba(0,0,0,0.18);
  &:hover {
    box-shadow: 2px 2px 9px 4px rgba(0,0,0,0.18);
  }
}
.room-img {
  width: 100%;
  height: 280px;
  background: $clr-gray-f7;
  background-size: cover;
}
.room-info {
  width: 100%;
  height: 70px;
  background: $clr-gray-f7;
  padding-left: 30px;
  padding-right: 24px;
  transition: .2s;
  &:hover {
    height: 132px;
  }
  &:hover .room-type-sub{
    display: block;
  }
  &:hover .room-price{
    display: flex;
  }

  .room-type-main {
    font-size: $f-size-2;
    color: $clr-font-lv1;
    letter-spacing: 1.46px;
  }
  .room-type-sub {
    display: none;
    font-size: $f-size-1;
    color: $clr-font-lv2;
    letter-spacing: 1.25px;
    margin-top: 2px;
  }
  .room-price {
    display: none;
    width: 100%;
    margin-top: 23px;
    .normal-price {
      font-size: $f-size-3;
      font-weight: lighter;
      color: $clr-font-lv1;
      letter-spacing: 2.19px;
      .normal-day {
        font-size: $f-size-1;
        font-weight: normal;
        color: $clr-font-lv2;
        letter-spacing: 1.25px;
        line-height: $f-size-1 * 1.5;
        padding-left: 3px;
      }
    }
    .holiday {
      font-size: $f-size-1;
      color: $clr-font-lv2;
      letter-spacing: 1.25px;
      line-height: $f-size-1 * 1.5;
    }
  }
}
</style>
