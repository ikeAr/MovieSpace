<template>
  <div style="display: table;height:100%;width:100%">
    <div class="g-center">
      <h1 style="text-align:center">That didn't work</h1>
      <p
        style="text-align:center"
      >We're sorry, but {{usernaem}}can't be found in the moviespace.store directory. Please try again later, while we try to automatically fix this for you.</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      usernaem: sessionStorage.getItem(usernaem)
    };
  }
};
</script>