<script lang="ts">
  import { getRoute } from "$lib/toolkit/route";
  import { getStr } from "$lib/lang/lang";
  import StrIds from "$lib/lang/strids";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<svelte:head>
  <title>
    {data.title}|{getStr(StrIds.appName)}
  </title>
</svelte:head>

<br />
<div class="c w">
  <div class="cst maxw w">
    {#if data.children.length !== 0}
      <a href="/">首页/</a>
      <h1>{data.id}</h1>
      <hr />
      <ol>
        {#each data.children as v}
          <li>
            <a href={getRoute("/a/"+data.id+'/' + v.title)}>
              {v.title}
            </a>
          </li>
        {/each}
      </ol>
    {:else}
      <div class="rs">
        <div class="cst maxwsm w p">
          <div class="r">
            <a data-sveltekit-reload style="text-transform: uppercase;" class="m plainlink" href="/">{getStr(StrIds.home)} </a>
            &gt;
            <span class="m">{data.title} </span>
          </div>
          <div>
            {#each data.keywords as v}
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a class="m" style="text-decoration: none;" href="javascript:;">{v}</a>
            {/each}
          </div>
          <br />
          <h3 style="text-align: center;font-family: 'Lucida Console', 'Courier New', monospace;">{data.title}</h3>
          <div class="c">
            {#if data.publishTime}
              <small>
                {getStr(StrIds.time)} :
                {data.publishTime}
              </small>
            {/if}
            {#if data.author}
              <small>
                {getStr(StrIds.author)} :
                {data.author}
              </small>
            {/if}
          </div>
          <hr />
          <div>
            {@html data.content.replaceAll("<img ", '<img width="90%" ')}
          </div>
          <hr />
        </div>

        <!-- 右侧推荐阅读列表 -->
        <div class="c g grey mobilehide">
          <br /><br />
          <big style="margin-left: 24px;"> {getStr(StrIds.recommendedArticle)} </big>
          <ul>
            {#each data.children as v}
              <li class="my">
                <a data-sveltekit-reload class="plainlink" href={getRoute("/a/" + v.id, true)}>{v.title} </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <!-- 右侧推荐阅读列表 -->
      <div class="c g grey desktophide">
        <br /><br />
        <big style="margin-left: 24px;"> {getStr(StrIds.recommendedArticle)} </big>
        <ul>
          {#each data.children as v}
            <li class="my">
              <a data-sveltekit-reload class="plainlink" href={getRoute("/a/" + v.id, true)}>{v.title} </a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>
