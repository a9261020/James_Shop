<template>
  <div class="coupongame">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-7 text-center">
          <div class="box my-4 py-4">
            <h2>歡迎來到終極密碼</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.box {
  line-height: 28px;
  box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.6);
  background-color: rgba(256, 256, 256, 0.9);
  border-radius: 20px;
}

.coupongame {
  background-image: url("../../../public/static/couponBACK.jpg");
  background-size: cover;
  background-position: 50%;
  position: relative;
}
.coupongame::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(201, 186, 186, 0.7);
}
</style>
