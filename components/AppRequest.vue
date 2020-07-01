<template>
  <div class="request">
    <div class="container relative">
      <h2>Оформите заявку онлайн!</h2>
      <p class="request__sub-h">
        Заполните форму внизу и наш сотрудник свяжется с вами!
      </p>
    </div>

    <AppMainForm />
    <div class="container relative">
      <h2>Способ оплаты</h2>
      <p class="request__sub-h">
        Оплата услуг осуществляется исключительно по карте.
      </p>
      <p class="flex logo-banks request--logo-banks">
        <span />
        <span />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppRequest',
  components: {
    AppMainForm: () => import('~/components/elements/AppMainForm.vue')
  }
}
</script>
<style lang="scss">
.request {
  width: 100vw;
  background: #E1ECF6;
  padding: 100px 0;

  @media (max-width: 767px) {
    padding: 50px 0;
  }

  h2 {
    margin-bottom: 20px;
  }

  &__sub-h {
    font-size: 20px;
    margin-bottom: 45px;
    color: #201D33;

    @media (max-width: 767px) {
      font-size: 18px;
      margin-bottom: 30px;
    }
  }

  &--logo-banks {
    span {
      margin-right: 80px;

      &:nth-child(1) {
        width: 102px;
        height: 60px;
      }
      &:nth-child(2) {
        width: 186px;
        height: 60px;
      }
    }
  }
}
</style>
