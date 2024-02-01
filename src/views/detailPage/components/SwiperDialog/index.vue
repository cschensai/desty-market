<template>
  <el-dialog
    class="swiper-dialog"
    v-model="props.visible"
    destroy-on-close
    align-center
    center
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <img v-if="props.assets.length > 1" @click="handlePrev" class="swiper-left-arrow" v-lazy="'https://static.desty.app/desty-market/left-arrow.png?x-oss-process=style/img-webp'" alt="desty market" />
    <img v-if="props.assets.length > 1" @click="handleNext" class="swiper-right-arrow" v-lazy="'https://static.desty.app/desty-market/right-arrow.png?x-oss-process=style/img-webp'" alt="desty market" />
    <swiper
      class="swiper-box"
      :loop="props.assets.length > 1"
      @swiper="setSwiperRef"
    >
      <swiper-slide v-for="(item, index) in props.assets" :key="index" lazy="true">
        <iframe
          v-if="item.urlType === 1"
          width="100%"
          height="100%"
          :src="item.url"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <img class="swiper-img" v-if="item.urlType === 2" v-lazy="`${item.url}?x-oss-process=style/img-webp`"
             alt="desty market" />
      </swiper-slide>
    </swiper>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { ElDialog } from 'element-plus';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const swiperRef = ref(null);
const store = useStore();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  imgIndex: {
    type: Number,
    default: 0,
  },
  assets: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['handleClose']);

// close dialog
function handleClose() {
  emit('handleClose');
}


function setSwiperRef (swiper) {
  swiperRef.value = swiper;
  swiperRef.value.slideToLoop(props.imgIndex);
};
// 上一张
function handlePrev() {
  swiperRef.value?.slidePrev();
}

// 下一张
function handleNext() {
  swiperRef.value?.slideNext();
}

</script>

<style lang="less">
.el-dialog.swiper-dialog {
  position: relative;
  background-color: transparent;
  width: 940px;
  height: max-content;
  box-shadow: none;
  .swiper-left-arrow,
  .swiper-right-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 56px;
    height: 56px;
  }
  .swiper-left-arrow {
    left: -100px;
  }
  .swiper-right-arrow {
    right: -100px;
  }
  .el-dialog__header {
    background-color: transparent;
    padding: 0;
    margin-bottom: 0;
    .el-dialog__headerbtn {
      top: -52px !important;
      .el-dialog__close {
        color: #fff !important;
        font-size: 40px !important;
      }
    }
  }
  .el-dialog__body {
    width: 100%;
    height: 600px;
    padding: 0;
    border-radius: 40px;
    .swiper-box {
      border-radius: 40px;
      width: 100%;
      height: 100%;
      .swiper-slide {
        width: 100% !important;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        .swiper-img {
          width: 100%;
          border-radius: 40px;
          // height: 100%;
          // object-fit: contain;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .el-dialog.swiper-dialog {
    width: 312px;
    .swiper-left-arrow,
    .swiper-right-arrow  {
        z-index: 2;
        width: 32px;
        height: 32px;
     }
    .swiper-left-arrow {
        left: 10px;
      }
      .swiper-right-arrow {
        right: 10px;
      }
    .el-dialog__header {
      .el-dialog__headerbtn {
        .el-dialog__close {
          font-size: 30px !important;
        }
      }
    }
    .el-dialog__body {
      height: 214px;
      border-radius: 20px;
      .swiper-box {
        border-radius: 20px;
        .swiper-slide {
          .swiper-img {
            border-radius: 20px;
          }
        }
      }
    }
  }
}
</style>