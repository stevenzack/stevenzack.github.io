<script>

    import { getStr } from "$lib/lang/lang";
    import StrIds from "$lib/lang/strids";

</script>
<div class="c">
    <div class="w maxwsm">
        <h1>{getStr(StrIds.about)} </h1>
        <hr>
        <div>
            {getStr(StrIds.author)} : {getStr(StrIds.stevenzack)}
        </div>
        <div>
            {getStr(StrIds.email)} : <a href="mailto:zigzigcheers@gmail.com">zigzigcheers@gmail.com</a>
        </div>
    </div>
</div>