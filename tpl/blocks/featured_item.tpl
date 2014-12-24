<li {if $featured_listing.ID}id="fli_{$featured_listing.ID}"{/if} {if !$featured_listing.Main_photo}class="no-picture"{/if}>
	{if $listing_types.$type.Photo}
		{if $featured_listing.Main_photo}
			{assign var='hrsrc' value=$smarty.const.RL_FILES_URL|cat:$featured_listing.Main_photo|regex_replace:'/\.([^\/]+)$/':'_large.$1'}
			{assign var='hrsrc_path' value=$smarty.const.RL_FILES|cat:$featured_listing.Main_photo|regex_replace:'/\.([^\/]+)$/':'_large.$1'}
		{/if}

		{if $listing_types.$type.Page}<a title="{$featured_listing.listing_title}" {if $config.featured_new_window}target="_blank"{/if} href="{$rlBase}{if $config.mod_rewrite}{if $featured_listing.custom}{$pages.add_listing}.html{else}{$pages.$page_key}/{$featured_listing.Path}/{str2path string=$featured_listing.listing_title}-{$featured_listing.ID}.html{/if}{else}?page={if $featured_listing.custom}{$pages.add_listing}{else}{$pages.$page_key}{/if}&amp;id={$featured_listing.ID}{/if}">{/if}
			<img alt="{$featured_listing.listing_title}" src="{$rlTplBase}img/blank_10x7.gif" {if $featured_listing.Main_photo}data-1x="{$smarty.const.RL_FILES_URL}{$featured_listing.Main_photo}" data-2x="{if $hrsrc_path|is_file}{$hrsrc}{else}{$smarty.const.RL_FILES_URL}{$featured_listing.Main_photo}{/if}"{/if} {if $featured_gallery}{if $featured_listing.Main_photo}style="background-image: url({if !$featured_listing.custom}{$smarty.const.RL_FILES_URL}{/if}{$featured_listing.Main_photo});"{/if} {if $hrsrc_path|is_file}accesskey="{$hrsrc}"{/if}{/if} />
		{if $listing_types.$type.Page}</a>{/if}
	{/if}
	
	<ul {if !$featured_listing.fields.price.value}class="no-price"{/if}>
	{assign var='first_field' value=true}
	{foreach from=$featured_listing.fields item='item' key='field' name='fieldsF'}
		{if !empty($item.value) && $item.Details_page}
			<li title="{$item.value|strip_tags}" class="{if $item.Key == 'price'}price_tag two-inline{/if}" id="flf_{$featured_listing.ID}_{$item.Key}">
				{if $first_field && $item.Key != 'price'}
					{if $listing_types.$type.Page}<a {if $config.featured_new_window}target="_blank"{/if} href="{$rlBase}{if $config.mod_rewrite}{$pages.$page_key}/{$featured_listing.Path}/{str2path string=$featured_listing.listing_title}-{$featured_listing.ID}.html{else}?page={$pages.$page_key}&amp;id={$featured_listing.ID}{/if}">{/if}
						{$item.value}
					{if $listing_types.$type.Page}</a>{/if}
				{else}
					{rlHook name='tplFeaturedItemPrice'}
					<div>{$item.value}</div>
				{/if}
			</li>
			{if $item.Key != 'price'}{assign var='first_field' value=false}{/if}
		{/if}
	{/foreach}
	</ul>
</li>