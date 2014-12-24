<!-- languages selector -->

{if $languages|@count > 1}
	<span class="circle" id="lang-selector">
		<span class="default">{$smarty.const.RL_LANG_CODE|ucfirst}</span>
		<span class="content hide">
			<ul class="lang-selector">
				{foreach from=$languages item='lang_item'}
					<li>
						<a class="font1{if $lang_item.Code|lower == $smarty.const.RL_LANG_CODE|lower} active{/if}" title="{$lang_item.name}" href="{if $lang_url_home}{$lang_url_home}{else}{$smarty.const.RL_URL_HOME}{/if}{if $config.mod_rewrite}{$lang_item.dCode}{$pageLink|replace:'&':'&amp;'}{else}?language={$lang_item.Code}{/if}">{$lang_item.name}</a>
					</li>
				{/foreach}
			</ul>
			<span></span>
		</span>
	</span>
{/if}

<!-- languages selector end -->