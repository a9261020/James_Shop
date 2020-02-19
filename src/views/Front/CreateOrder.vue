<template>
  <div>
    <ul class="mb-4 step">
      <li class="bg-light" :class="{'bg-dark text-light active': step === 1}">
        <strong>STEP</strong>
        <h3>
          <strong>01</strong>
        </h3>
        <p class="h6">確認購物清單</p>
      </li>
      <li class="bg-light" :class="{'bg-dark text-light active': step === 2}">
        <strong>STEP</strong>
        <h3>
          <strong>02</strong>
        </h3>
        <p class="h6">填寫訂購資料</p>
      </li>
      <li class="bg-light" :class="{'bg-dark text-light active': step === 3}">
        <strong>STEP</strong>
        <h3>
          <strong>03</strong>
        </h3>
        <p class="h6">付款/完成訂單</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1
    };
  }
};
</script>
