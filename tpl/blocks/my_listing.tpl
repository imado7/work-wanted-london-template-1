<!-- my listing item -->

{if $listing.Listing_type}
	{assign var='listing_type' value=$listing_types[$listing.Listing_type]}
{/if}

<article class="item{if $listing.Featured_expire} featured{/if}" id="listing_{$listing.ID}">{strip}
	<div class="info">
		{if $listing_type.Photo}
			{assign var='hrsrc' value=$smarty.const.RL_FILES_URL|cat:$listing.Main_photo|regex_replace:'/\.([^\/]+)$/':'_large.$1'}
			{assign var='hrsrc_path' value=$smarty.const.RL_FILES|cat:$listing.Main_photo|regex_replace:'/\.([^\/]+)$/':'_large.$1'}

			{if $listing_type.Page}<a title="{$listing.listing_title}" {if $config.view_details_new_window}target="_blank"{/if} href="{$rlBase}{if $config.mod_rewrite}{$pages[$listing_type.Page_key]}/{$listing.Path}/{str2path string=$listing.listing_title}-{$listing.ID}.html{if $hl}?highlight{/if}{else}?page={$pages[$listing_type.Page_key]}&amp;id={$listing.ID}{if $hl}&amp;highlight{/if}{/if}">{/if}
				<div class="picture{if !$listing.Main_photo} no-picture{/if}">
					{if $listing.Featured_expire}<div class="label"><div title="{$lang.featured}">{$lang.featured}</div></div>{/if}
					<img alt="{$listing.listing_title}" src="{$rlTplBase}img/blank_10x7.gif" {if $listing.Main_photo}data-1x="{$smarty.const.RL_FILES_URL}{$listing.Main_photo}" data-2x="{if $hrsrc_path|is_file}{$hrsrc}{else}{$smarty.const.RL_FILES_URL}{$listing.Main_photo}{/if}"{/if} />
					{if !empty($listing.Main_photo) && $config.grid_photos_count}
						<span><span><span></span></span>{$listing.Photos_count}</span>
					{/if}
				</div>
				<div class="title"><span>{$listing.listing_title}</span></div>
			{if $listing_type.Page}</a>{/if}
		{else}
			{assign var='f_first' value=true}
			<table class="table">
				{foreach from=$listing.fields item='item' key='field' name='fListings'}
				{if !empty($item.value) && $item.Details_page}
				<tr id="ml_field_{$listing.ID}_{$item.Key}">
					{if $config.sf_display_fields}
					<td class="name">{$item.name}:</td>
					{/if}
					<td class="value {if $f_first}first{/if}">
						{if $f_first && $listing_type.Page}
							<a {if $config.view_details_new_window}target="_blank"{/if} href="{$rlBase}{if $config.mod_rewrite}{$pages[$listing_type.Page_key]}/{$listing.Path}/{str2path string=$listing.listing_title}-{$listing.ID}.html{else}?page={$pages[$listing_type.Page_key]}&amp;id={$listing.ID}{/if}">{$item.value}</a>
						{else}
							{$item.value}
						{/if}
					</td>
				</tr>
				{assign var='f_first' value=false}
				{/if}
				{/foreach}
				
				{rlHook name='listingAfterFields'}
			</table>
		{/if}
	</div>
	<div class="navigation">
		<ul>
			{rlHook name='myListingsIconTop'}

			{if $listings_type.Photo && ($listing.Plan_image > 0 || $listing.Image_unlim)}
			<li class="nav-icon">
				<a class="add-photo" href="{$rlBase}{if $config.mod_rewrite}{$pages.add_photo}.html?id={$listing.ID}{else}?page={$pages.add_photo}&amp;id={$listing.ID}{/if}"><span>{$lang.add_photo}</span>&nbsp;</a>
			</li>
			{/if}
			{if $listings_type.Video && ($listing.Plan_video > 0 || $listing.Video_unlim)}
			<li class="nav-icon">
				<a class="add-video" href="{$rlBase}{if $config.mod_rewrite}{$pages.add_video}.html?id={$listing.ID}{else}?page={$pages.add_video}&amp;id={$listing.ID}{/if}"><span>{$lang.add_video}</span>&nbsp;</a>
			</li>
			{/if}
			<li class="nav-icon">
				<a class="edit" href="{$rlBase}{if $config.mod_rewrite}{$pages.edit_listing}.html?id={$listing.ID}{else}?page={$pages.edit_listing}&amp;id={$listing.ID}{/if}"><span>{$lang.edit_listing}</span>&nbsp;</a>
			</li>

			{rlHook name='myListingsIcon'}
		</ul>
	</div>
	<div class="stat">
		<ul>
			<li class="two-inline left">
				<div class="statuses">
					{if $listing.Status == 'incomplete'}
						<a href="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}.html?incomplete={$listing.ID}&amp;step={$listing.Last_step}{else}?page={$pageInfo.Path}&amp;incomplete={$listing.ID}&amp;step={$listing.Last_step}{/if}" class="{$listing.Status}">{$lang[$listing.Status]}</a>
					{elseif $listing.Status == 'expired' || $listing.Status == 'approval'}
						<a href="{$rlBase}{if $config.mod_rewrite}{$pages.upgrade_listing}.html?id={$listing.ID}{else}?page={$pages.upgrade_listing}&amp;id={$listing.ID}{/if}" class="{$listing.Status}">{$lang[$listing.Status]}</a>
					{else}
						<span {if $listing.Status == 'pending'}title="{$lang.waiting_approval}"{/if} class="{$listing.Status}">{$lang[$listing.Status]}</span>
					{/if}
				</div>
				<div class="ralign">
					<span class="icon delete" id="delete_listing_{$listing.ID}" title="{$lang.delete}"></span>
				</div>
			</li>
			<li><span class="name">{$lang.added}</span> {$listing.Date|date_format:$smarty.const.RL_DATE_FORMAT}</li>
			{if $listing.Plan_expire}
			<li><span class="name">{$lang.active_till}</span> {if $listing.Plan_expire == $listing.Pay_date}{$lang.unlimited}{else}{$listing.Plan_expire|date_format:$smarty.const.RL_DATE_FORMAT}{/if}</li>
			{/if}
			{if $listing.Plan_key}
			<li>
				<span class="name">{$lang.plan}</span> {$lang[$listing.Plan_key]}
				<div style="padding-top: 0px"><a href="{$rlBase}{if $config.mod_rewrite}{$pages.upgrade_listing}.html?id={$listing.ID}{else}?page={$pages.upgrade_listing}&amp;id={$listing.ID}{/if}">{$lang.upgrade_plan}</a></div>
			</li>
			{/if}
			{if $listing.Featured_expire}
			<li>
				<span class="name">{$lang.featured_till}</span> {if $listing.Featured_expire == $listing.Featured_date}{$lang.unlimited}{else}{$listing.Featured_expire|date_format:$smarty.const.RL_DATE_FORMAT}{/if}
			</li>
			{/if}
			{if !$listing.Featured_expire && $listing.Status == 'active' && $available_plans}
				<li>
					<a title="{$lang.make_featured}" class="nav_icon text_button" href="{$rlBase}{if $config.mod_rewrite}{$pages.upgrade_listing}/featured.html?id={$listing.ID}{else}?page={$pages.upgrade_listing}&amp;id={$listing.ID}&amp;featured{/if}">
					{$lang.make_featured}
				</a>
				</li>
			{/if}

			{rlHook name='myListingsafterStatFields'}
		</ul>
	</div>
{/strip}</article>

<!-- my listing item end -->