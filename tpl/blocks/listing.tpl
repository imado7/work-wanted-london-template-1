<!-- listing item -->

{if $listing.Listing_type}
	{assign var='listing_type' value=$listing_types[$listing.Listing_type]}
{/if}

<article class="item {if $listing.Featured} featured{/if}">
	<div class="main-column clearfix">
		{if $listing_type.Photo}
			{if $listing.Main_photo}
				{assign var='hrsrc' value=$smarty.const.RL_FILES_URL|cat:$listing.Main_photo|regex_replace:'/\.([^\/]+)$/':'_large.$1'}
				{assign var='hrsrc_path' value=$smarty.const.RL_FILES|cat:$listing.Main_photo|regex_replace:'/\.([^\/]+)$/':'_large.$1'}
			{/if}

			{if $listing_type.Page}<a title="{$listing.listing_title}" {if $config.view_details_new_window}target="_blank"{/if} href="{$rlBase}{if $config.mod_rewrite}{$pages[$listing_type.Page_key]}/{$listing.Path}/{str2path string=$listing.listing_title}-{$listing.ID}.html{if $hl}?highlight{/if}{else}?page={$pages[$listing_type.Page_key]}&amp;id={$listing.ID}{if $hl}&amp;highlight{/if}{/if}">{/if}
				<div class="picture{if !$listing.Main_photo} no-picture{/if}">
					{if $listing.Featured}<div class="label"><div title="{$lang.featured}">{$lang.featured}</div></div>{/if}
					<img alt="{$listing.listing_title}" src="{$rlTplBase}img/blank_10x7.gif" {if $listing.Main_photo}data-1x="{$smarty.const.RL_FILES_URL}{$listing.Main_photo}" data-2x="{if $hrsrc_path|is_file}{$hrsrc}{else}{$smarty.const.RL_FILES_URL}{$listing.Main_photo}{/if}"{/if} />
					{if !empty($listing.Main_photo) && $config.grid_photos_count}
						<span><span></span>{$listing.Photos_count}</span>
					{/if}
				</div>
			{if $listing_type.Page}</a>{/if}
		{/if}

		<div class="data-container">
			<div class="two-inline">
				<div class="">{rlHook name='listingAfterPrice'}</div>
				{assign var='price_value' value=''}
				{foreach from=$listing.fields item='item' key='field' name='fListings'}
					{if !empty($item.value) && $item.Details_page && $item.Key|strpos:'price' !== false}
						<div class="price-tag">{$item.value}</div>
						{assign var='price_value' value=$item.value}
						{break}
					{/if}
				{/foreach}
			</div>
			
			<ul class="info">
				<li class="title">
					{if $listing_type.Page}
						<a class="link-large" title="{$listing.listing_title}" {if $config.view_details_new_window}target="_blank"{/if} href="{$rlBase}{if $config.mod_rewrite}{$pages[$listing_type.Page_key]}/{$listing.Path}/{str2path string=$listing.listing_title}-{$listing.ID}.html{if $hl}?highlight{/if}{else}?page={$pages[$listing_type.Page_key]}&amp;id={$listing.ID}{if $hl}&amp;highlight{/if}{/if}">{$listing.listing_title}</a>
					{else}
						{$listing.listing_title}
					{/if}
				</li>
				<li class="fields">
					{assign var='f_first' value=true}
					{foreach from=$listing.fields item='item' key='field' name='fListings'}{strip}
						{if !empty($item.value) && $item.Details_page && $item.Key|strpos:'price' === false}
							{if !$f_first}, {/if}{$item.value}
							{assign var='f_first' value=false}
						{/if}
					{/strip}{/foreach}
					
					{rlHook name='listingAfterFields'}
				</li>
				<li class="middle">
					{rlHook name='listingBeforeStats'}

					<ul class="nav-column{if !$price_value} stick-top{/if}">
						<li id="fav_{$listing.ID}" class="favorite add" title="{$lang.add_to_favorites}"><span class="icon"></span><span class="link">{$lang.add_to_favorites}</span></li>
						{rlHook name='listingNavIcons'}
					</ul>

					{rlHook name='listingAfterStats'}

					{if $config.display_posted_date}<span title="{$lang.posted_date}" class="hint date">{$listing.Date|date_format:$smarty.const.RL_DATE_FORMAT}</span>{/if}
				</li>
			</ul>
		</div>
	</div>

	<span class="category-info hide"> {if $listing_type.Page}<a href="{$rlBase}{if $config.mod_rewrite}{$pages[$listing_type.Page_key]}/{$listing.Path}{if $listing_type.Cat_postfix}.html{else}/{/if}{else}?page={$pages[$listing_type.Page_key]}&amp;category={$listing.Category_ID}{/if}"{/if}>{$listing.name}{if $listing_type.Page}</a>{/if}
	</span>
	
	{if $listing.Loc_latitude && $listing.Loc_longitude}
		<script>listings_map.push(new Array('{$listing.Loc_latitude},{$listing.Loc_longitude}', '<div class="map-balloon{if $listing.Featured} featured{/if}">{if $listing_type.Page}<a title="{$listing.listing_title|escape}" {if $config.view_details_new_window}target="_blank"{/if} href="{$rlBase}{if $config.mod_rewrite}{$pages[$listing_type.Page_key]}/{$listing.Path}/{str2path string=$listing.listing_title}-{$listing.ID}.html{if $hl}?highlight{/if}{else}?page={$pages[$listing_type.Page_key]}&amp;id={$listing.ID}{if $hl}&amp;highlight{/if}{/if}">{/if}<div class="picture{if !$listing.Main_photo} no-picture{/if}">{if $listing.Featured}<div class="f-label"><div title="{$lang.featured}">{$lang.featured}</div></div>{/if}<img alt="{$listing.listing_title|escape}" src="{$rlTplBase}img/blank.gif" {if $listing.Main_photo}style="background-image: url({$smarty.const.RL_URL_HOME}files/{$listing.Main_photo});"{/if} />{if !empty($listing.Main_photo) && $config.grid_photos_count}<span><span><span></span></span>{$listing.Photos_count}</span>{/if}</div>{if $listing_type.Page}</a>{/if}{if $price_value}<div class="price-tag">{$price_value}</div>{/if}<div class="title"><a class="link-large" href="{$rlBase}{if $config.mod_rewrite}{$pages[$listing_type.Page_key]}/{$listing.Path}/{str2path string=$listing.listing_title}-{$listing.ID}.html{if $hl}?highlight{/if}{else}?page={$pages[$listing_type.Page_key]}&amp;id={$listing.ID}{if $hl}&amp;highlight{/if}{/if}">{$listing.listing_title|escape}</a></div></div>', 'direct'));</script>
	{/if}
</article>

<!-- listing item end -->