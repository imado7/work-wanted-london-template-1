<!-- my listings -->

{if !empty($listings)}

	{if $sorting}
	<div class="grid_navbar">
		<div class="sorting">
			<div class="current{if $grid_mode == 'map'} disabled{/if}">
				{$lang.sort_by}: 
				<span class="link">{if $sort_by}{$sorting[$sort_by].name}{else}{$lang.date}{/if}</span>
				<span class="arrow"></span>
			</div>
			<ul class="fields">
			{foreach from=$sorting item='field_item' key='sort_key' name='fSorting'}
				{if $field_item.Type|in_array:$sf_types}
					{foreach from=$sort_types key='st_key' item='st'}
						<li><a rel="nofollow" {if $sort_by == $sort_key && $sort_type == $st_key}class="active"{/if} title="{$lang.sort_listings_by} {$field_item.name} ({$lang[$st]})" href="{if $config.mod_rewrite}?{else}index.php?{$pageInfo.query_string}&{/if}sort_by={$sort_key}&sort_type={$st_key}">{$field_item.name} ({$lang[$st]})</a></li>
					{/foreach}
				{else}
					<li><a rel="nofollow" {if $sort_by == $sort_key}class="active"{/if} title="{$lang.sort_listings_by} {$field_item.name}" href="{if $config.mod_rewrite}?{else}index.php?{$pageInfo.query_string}&{/if}sort_by={$sort_key}&sort_type=asc">{$field_item.name}</a></li>
				{/if}
			{/foreach}
			{rlHook name='myListingsAfterSorting'}
			</ul>
		</div>
	</div>
	{/if}
	
	{rlHook name='myListingsBeforeListings'}
	
	<section id="listings" class="my-listings list">
	{foreach from=$listings item='listing' key='key'}
		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'my_listing.tpl'}
	{/foreach}
	</section>

	<!-- paging block -->
	{paging calc=$pInfo.calc total=$listings current=$pInfo.current per_page=$config.listings_per_page}
	<!-- paging block end -->

	<script type="text/javascript">
	{literal}
	
	$(document).ready(function(){
		$('.my-listings .delete').each(function(){
			$(this).flModal({
				caption: '{/literal}{$lang.warning}{literal}',
				content: '{/literal}{$lang.notice_delete_listing}{literal}',
				prompt: 'xajax_deleteListing('+ $(this).attr('id').split('_')[2] +')',
				width: 'auto',
				height: 'auto'
			});
		});
	});

	$('#listings div.picture:not(.no-picture) > img').hisrc();

	{/literal}
	</script>
{else}
	<div class="info">
		{assign var='link' value='<a href="'|cat:$add_listing_href|cat:'">$1</a>'}
		{$lang.no_listings_here|regex_replace:'/\[(.+)\]/':$link}
	</div>
{/if}

{rlHook name='myListingsBottom'}

<!-- my listings end -->
