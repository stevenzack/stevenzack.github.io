<script lang="ts">
  import "$lib/leafapp.css";
</script>

<!-- <h5 class="brand">Steven's Blog</h5> -->
<ul role="menubar" class="w">
  <li class="r p">
    <img class="mr" src="https://avatars.githubusercontent.com/u/18564615?v=4" alt="avatar" width="12" height="12">
    <b>Steven's Blog</b>
  </li>
  <li role="menuitem" tabindex="0">File</li>
  <li role="menuitem" tabindex="0">Edit</li>
  <li role="menuitem" tabindex="0">View</li>
  <li role="menuitem" tabindex="0">
    Eng/文
    <ul role="menu">
      <li role="menuitem">
        <a href="/"> English </a>
      </li>
      <li role="menuitem">
        <a href="#"> 中文 </a>
      </li>
    </ul>
  </li>
</ul>
<div class="c">
  <div class="cs w maxwmd">
    <slot />
  </div>
</div>

<style>
  .brand {
    font-size: 24px;
  }
</style>
