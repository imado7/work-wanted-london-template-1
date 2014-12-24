<!-- contact person information tpl -->

{if $contact}
{assign var='account' value=$contact}
{/if}

<span class="date">{$account.Date|date_format:$smarty.const.RL_DATE_FORMAT}</span>

<div>
	<div class="picture">
		{if $account.Photo}
			<div class="two-inline left clearfix">
				<div><img alt="{$lang.seller_thumbnail}" src="{$smarty.const.RL_FILES_URL}{$account.Photo}" /></div>

				{if $account.Listings_count && !$contact}
				<div class="counter">
					<a title="{$lang.other_owner_listings}" href="#listings">
						<span class="counter">{$account.Listings_count}</span>
						<span>{$lang.listings}</span>
					</a>
					</div>
				{/if}
			</div>
		{/if}

		{if $config.messages_module && ($isLogin || (!$isLogin && $config.messages_allow_free)) && !$contact}
		<div class="contact">
			<a href="javascript:void(0)" class="contact-seller button" rel="nofollow">{$lang.contact_owner}</a>
		</div>
		{/if}
	</div>

	<div class="info-table">
		{foreach from=$account.Fields item='item' name='fListings'}
			{if !$item.Map && !empty($item.value) && $item.Details_page && $item.Key != 'First_name' && $item.Key != 'Last_name'}
				{include file='blocks'|cat:$smarty.const.RL_DS|cat:'field_out.tpl' small=true}
			{/if}
		{/foreach}
	</div>
</div>

<!-- contact person information tpl end -->