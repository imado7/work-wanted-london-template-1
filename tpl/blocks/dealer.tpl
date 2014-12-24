<!-- account item -->

<article>
	<div class="main-container clearfix">
		<div class="picture">
			<a title="{$dealer.Full_name}" href="{$dealer.Personal_address}">
				<img alt="{$dealer.Full_name}" src="{$rlTplBase}img/blank.gif" {if $dealer.Photo}style="background-image: url('{$smarty.const.RL_URL_HOME}files/{$dealer.Photo}');"{/if} />
			</a>
		</div>
		<div class="statistics">
			<ul>
				<li class="date" title="{$lang.join_date}">{$dealer.Date|date_format:$smarty.const.RL_DATE_FORMAT}</li>
				{rlHook name='accountAfterStats'}
			</ul>

			{if $dealer.Listings_count}
				<div class="counter">
					<span>{$dealer.Listings_count}</span>
					<span>{$lang.listings}</span>
				</div>
			{/if}
		</div>
	</div>

	<ul class="info">
		<li class="name"><a title="{$lang.visit_owner_page}" href="{$dealer.Personal_address}">{if $dealer.company_name}{$dealer.company_name}{else}{$dealer.Full_name}{/if}</a></li>
		<li class="fields">
			{assign var='phone' value=false}
			{assign var='inline_fields' value=false}

			{foreach from=$dealer.fields item='item' key='field'}
				{if !empty($item.value) && $item.Details_page}
					{if $item.Key|strpos:'phone' || $item.Type == 'phone'}
						{assign var='phone' value=$item.value}
					{else}
						{assign var='inline_fields' value=$inline_fields|cat:', '|cat:$item.value}
						<span>{$item.value}</span>
					{/if}
				{/if}
			{/foreach}

			{rlHook name='accountAfterFields'}
		</li>
		{if $phone}
		<li class="tel">
			<a href="tel:{$phone}">{$phone}</a>
		</li>
		{/if}
	</ul>

	{if $dealer.Loc_latitude && $dealer.Loc_longitude}
		<script>accounts_map.push(new Array('{$dealer.Loc_latitude},{$dealer.Loc_longitude}', '<div class="map-balloon-account"><div class="picture"><a title="{$dealer.Full_name|escape}" href="{$dealer.Personal_address}"><img alt="{$dealer.Full_name}" src="{$rlTplBase}img/blank.gif" {if $dealer.Photo}style="background-image: url({$smarty.const.RL_URL_HOME}files/{$dealer.Photo});"{/if} /></a></div><div class="statistics two-inline left clearfix"><div>{if $dealer.Listings_count}{$dealer.Listings_count} {$lang.listings}{/if}</div><div style="text-align: {$text_dir_rev};">{$dealer.Date|date_format:$smarty.const.RL_DATE_FORMAT}</div></div><ul class="info"><li class="name"><a title="{$lang.visit_owner_page}" href="{$dealer.Personal_address}">{$dealer.Full_name}</a></li><li class="fields">{$inline_fields|ltrim:', '}</li>{if $phone}<li class="tel"><a href="tel:{$phone}">{$phone}</a></li>{/if}</ul></div>', 'direct'));</script>
	{/if}
</article>

<!-- account item end -->