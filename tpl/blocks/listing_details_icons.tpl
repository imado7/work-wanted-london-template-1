<!-- icons bar on listing details page -->

<div class="listing-details-icons">{strip}
	{if $listing_data.Account_ID == $account_info.ID}
		<a class="button" href="{$rlBase}{if $config.mod_rewrite}{$pages.edit_listing}.html?id={$listing_data.ID}{else}?page={$pages.edit_listing}&amp;id={$listing_data.ID}{/if}">{$lang.edit_listing}</a>
	{else}
		{rlHook name='listingDetailsNavIcons'}

		<a target="_blank" href="{$rlBase}{if $config.mod_rewrite}{$pages.print}.html?item=listing&amp;id={$listing_data.ID}{else}?page={$pages.print}&amp;item=listing&amp;id={$listing_data.ID}{/if}" title="{$lang.print_page}" class="print"><span></span></a>
		<span id="fav_{$listing_data.ID}" class="favorite add" title="{$lang.add_to_favorites}"><span></span></span>
	{/if}
{/strip}</div>

<!-- icons bar on listing details page end -->