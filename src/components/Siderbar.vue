<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mb-1 text-muted font-weight-bold"
      >
        <span>管理員</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/productsmanage">
            <i class="fas fa-shopping-cart"></i> 產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/ordersmanage">
            <i class="far fa-list-alt"></i> 訂單管理
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/couponsmanage">
            <i class="fas fa-money-bill"></i> 優惠卷管理
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/messagesmanage">
            <i class="far fa-comments"></i> 留言板管理
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/usersmanage">
            <i class="fas fa-users"></i> 使用者管理
          </router-link>
        </li>
      </ul>
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted font-weight-bold"
      >
        <span>購物頁</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            <i class="fas fa-shopping-cart"></i> James Shop
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
