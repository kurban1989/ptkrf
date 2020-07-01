<template>
  <div class="container">
    <hr>
    <br>
    <br>
    <h1 style="color: green;">
      Комментарий успешно подтверждён!
    </h1>
    <br>
    <br>
    <hr>
    <br>
  </div>
</template>
<script>
export default {
  name: 'Confirm',
  async asyncData ({ $axios, params, redirect, query }) {
    if (!params.uid || params.uid.length < 5 || !query.id) {
      redirect('/')
    } else {
      await $axios.post(`${process.env.baseUrl}/api/reviews/confirm`, {
        uid: params.uid,
        visible: 1
      })
    }

    return {}
  }
}
</script>
