<script lang="ts">
    import { getStr } from "$lib/lang/lang";
    import StrIds from "$lib/lang/strids";
  import "$lib/leafapp.css";
    import { getRoute } from "$lib/toolkit/route";
</script>

<div class={typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "navbar-inverse navbar" : "navbar "}>
  <div class="navbar-inner">
    <div class="container">
      <a class="brand" href="/">
        <img src="https://avatars.githubusercontent.com/u/18564615?v=4" alt="logo" width="24" height="24"/>
        <span class="mobilehide" style="margin-left: 6px;">{getStr(StrIds.appName)}</span>
      </a>
      <div class="nav-collapse collapse navbar-responsive-collapse">
        <ul class="nav">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">{getStr(StrIds.columns)} <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li class="divider"></li>
              <li class="nav-header">Nav header</li>
              <li><a href="#">Separated link</a></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
        </ul>
        <form class="navbar-search pull-left" action="">
          <input type="text" class="search-query span2" placeholder={getStr(StrIds.searchArticles)} />
        </form>
        <ul class="nav pull-right mobilehide">
          <li><a href={getRoute('/about')}>{getStr(StrIds.about)}</a></li>
          <li class="divider-vertical"></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Eng/文 <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li class="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- /.nav-collapse -->
    </div>
  </div>
  <!-- /navbar-inner -->
</div>

<slot />
