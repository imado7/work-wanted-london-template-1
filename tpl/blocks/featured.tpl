<!-- featured listings block -->

{assign var='page_key' value=$listing_types.$type.Page_key}

{if !empty($listings)}

	<ul class="featured clearfix{if !$listing_types.$type.Photo} lalign{/if}{if $listing_types.$type.Photo} with-pictures{else} list{/if}">{strip}
	{foreach from=$listings item='featured_listing' key='key'}
		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'featured_item.tpl'}
	{/foreach}
	{/strip}</ul>

{else}

	{if $listing_types.$type.Page}
		{if $config.mod_rewrite}
			{assign var='href' value=$rlBase|cat:$pages.add_listing|cat:'.html'}
		{else}
			{assign var='href' value=$rlBase|cat:'?page='|cat:$pages.add_listing}
		{/if}
		{assign var='link' value='<a href="'|cat:$href|cat:'">$1</a>'}
		{$lang.no_listings_here|regex_replace:'/\[(.+)\]/':$link}
	{else}
		{$lang.no_listings_here_submit_deny}
	{/if}
	
{/if}

<!-- featured listings block end -->