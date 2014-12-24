<!-- listing grid -->

{assign var='grid_mode' value=$smarty.cookies.grid_mode}
{if !$grid_mode}
	{assign var='grid_mode' value='list'}
{/if}

{if $listing_type && !$listing_type.Photo}
	{assign var='grid_mode' value='grid'}
{/if}

{if $periods}
	{assign var='cur_date' value=false}
	{assign var='grid_mode' value='list'}
	{assign var='replace_patter' value=`$smarty.ldelim`day`$smarty.rdelim`}
{/if}

<script>var listings_map = new Array();</script>
<section id="listings" class="{$grid_mode} {if $listing_type && !$listing_type.Photo}no-image{/if} clearfix">
	{foreach from=$listings item='listing' key='key' name='listingsF'}
		{if $periods && $listing.Post_date != $cur_date}
			{if $listing.Date_diff == 1}
				{assign var='divider_name' value=$lang.today}
			{elseif $listing.Date_diff == 2}
				{assign var='divider_name' value=$lang.yesterday}
			{elseif $listing.Date_diff > 2 && $listing.Date_diff < 8}
				{assign var='divider_name' value=$lang.days_ago_pattern|replace:$replace_patter:$listing.Date_diff-1}
			{else}
				{assign var='divider_name' value=$listing.Post_date|date_format:$smarty.const.RL_DATE_FORMAT}
			{/if}
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'divider.tpl' name=$divider_name}
			{assign var='cur_date' value=$listing.Post_date}
		{/if}
		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'listing.tpl' hl=$hl grid_photo=$grid_photo}
	{/foreach}
</section>

<section id="listings_map" class="hide"></section>
<script src="http://maps.googleapis.com/maps/api/js?libraries=places&amp;sensor=false{if $smarty.const.RL_LANG_CODE != '' && $smarty.const.RL_LANG_CODE != 'en'}&amp;language={$smarty.const.RL_LANG_CODE}{/if}"></script>
{*<script type="text/javascript" src="{$rlTplBase}js/hisrc.js"></script>*}

<script type="text/javascript">
//$.hisrc.speedTest();
{literal}

$('#listings div.picture:not(.no-picture) > img').hisrc();

{/literal}
</script>

<!-- listing grid end -->