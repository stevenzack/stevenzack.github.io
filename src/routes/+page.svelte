<script lang="ts">
    import { getRoute } from "$lib/toolkit/route";
    import type { PageData } from "./$types";

  export let data:PageData;

</script>

<div class="c">
  <div class="w maxwsm">
    <h1>
      Steven's Blog
    </h1>
    <hr>
    <ol>
      {#each data.articles as v}
        <li>
          <a href={getRoute('/a/'+v.title)}>
            {v.title}
          </a>
        </li>
      {/each}
    </ol>
  </div>
</div>