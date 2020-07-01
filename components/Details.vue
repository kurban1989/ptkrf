<template>
  <section class="details" aria-label="services">
    <div class="container grid">
      <div v-for="(item, index) in services" :key="`S${index}`" class="flex services">
        <p>{{ item.title }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import services from '~/resourse/servicesItems.json'

export default {
  name: 'DetailsCargo',
  data () {
    return {
      services
    }
  }
}
</script>
<style lang="scss">
.services {
  position: relative;
  height: 94px;
  align-items: center;
  overflow: hidden;
  border-radius: 5px;
  background: #fff;
  color: inherit;
  grid-column: span 3;
  text-align: center;
  justify-content: center;

  @media (max-width: 1200px) {
    grid-column: span 4;
  }

  @media (max-width: 600px) {
    grid-column: span 2;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 14px;
    display: block;
    background: #BAE0FF;
  }

  p {
    font-size: 16px;
    font-weight: bold;
    line-height: 21px;
  }
}
</style>
