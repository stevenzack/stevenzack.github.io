<script lang="ts">
  import "$lib/leafapp.css";
</script>

<div class="c">
  <div class="cs w maxwsm p">
    <h3 class="brand">Steven's Blog</h3>
    <ul role="menubar" class="w">
      <li role="menuitem" tabindex="0">File</li>
      <li role="menuitem" tabindex="0">Edit</li>
      <li role="menuitem" tabindex="0">View</li>
      <li role="menuitem" tabindex="0">
        Eng/文
        <ul role="menu">
          <li role="menuitem">
              <a href="/">
              English 
            </a>
          </li>
          <li role="menuitem">
            <a href="#">
              中文 
            </a>
          </li>
        </ul>
      </li>
    </ul>
    <slot />
  </div>
</div>

<style>
  .brand {
    font-size: 24px;
  }
</style>
