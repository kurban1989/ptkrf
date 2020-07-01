<template>
  <div class="card-review">
    <div class="card-review__header">
      <p>{{ title }}</p>
    </div>
    <div class="card-review__body">
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardReview',
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.card-review {
  position: relative;
  width: 630px;
  height: 280px;
  box-shadow: 0 0 8px rgba(0, 0, 1, 0.1);
  margin: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 767px) {
    height: 270px;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20px;
    background: rgb(235,235,235);
    background: -moz-linear-gradient(180deg, rgba(235,235,235,0) 0%, rgba(255,255,255,1) 43%);
    background: -webkit-linear-gradient(180deg, rgba(235,235,235,0) 0%, rgba(255,255,255,1) 43%);
    background: linear-gradient(180deg, rgba(235,235,235,0) 0%, rgba(255,255,255,1) 43%);
  }

  &__header {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    background: #2F295D;
    padding-left: 80px;

    @media (max-width: 767px) {
      padding-left: 25px;
    }

    p {
      color: #fff;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;

      @media (max-width: 767px) {
        font-size: 17px;
        line-height: 22px;
      }
    }
  }

  &__body {
    width: 100%;
    padding-left: 80px;
    padding-top: 40px;
    padding-bottom: 40px;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 767px) {
      padding: 25px;
    }

    p {
      color: #201D33;
      font-size: 20px;
      line-height: 26px;
      word-break: break-word;

      @media (max-width: 767px) {
        font-size: 15px;
        line-height: 21px;
      }
    }
  }
}
</style>
