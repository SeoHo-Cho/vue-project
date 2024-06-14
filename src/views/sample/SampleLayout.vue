<template>
  <div>
    <RouterLink :to="{ path: '/sample/sample-common-function' }">공통함수</RouterLink><br />
    <RouterLink :to="{ path: '/sample/sample-validate-default' }">기본 Validation</RouterLink><br />
    <RouterLink :to="{ path: '/sample/sample-validate-custom' }">커스텀 Validation</RouterLink><br />
    <RouterLink :to="{ path: '/sample/sample-api' }">샘플api</RouterLink><br />
    <RouterLink :to="{ path: '/sample/sample-directive' }">샘플디렉티브</RouterLink><br />
    <RouterLink :to="{ path: '/sample/sample-async-component' }">샘플비동기컴포넌트</RouterLink><br />
    <RouterLink :to="{ path: '/sample/sample-async-component2' }">샘플 비동기컴포넌트2</RouterLink><br />
    <RouterLink :to="{ path: '/sample/sample-tree-component' }">샘플트리 컴포넌트</RouterLink><br />
    <RouterLink :to="{ path: '/sample/sample-table' }">테이블 샘플</RouterLink><br />
    <br />
    <router-view></router-view>
  </div>
</template>

<script setup></script>
<style></style>
