<!-- listings tpl -->

<!-- tabs -->
{if $listing_types|@count > 1}
	<ul class="tabs">
		{foreach from=$listing_types item='tab' key='lt_key' name='tabsF'}
			<li class="{if $requested_type == $lt_key}active{/if}" lang="{$lt_key}" id="tab_{$lt_key|replace:'_':''}">{$tab.name}</li>
		{/foreach}
	</ul>
	
	<script type="text/javascript">
	{literal}
	
	$(document).ready(function(){
		$('ul.tabs li:not(.active)').click(function(){
			var key = $(this).attr('lang');
			
			if ( $('div#area_'+key).find('div#listings').length <= 0 ) {
				xajax_loadRecentlyAdded(key);
			}
		});
		
		if ( flynax.getHash() ) {
			$('div.tabs ul li#tab_'+flynax.getHash().replace(/_/g, '')).trigger('click');
		}
	});
	
	{/literal}
	</script>
{/if}
<!-- tabs end -->

{foreach from=$listing_types item='tab' key='lt_key' name='tabsF'}
	<div class="tab_area{if $requested_type != $lt_key} hide{/if}" id="area_{$lt_key|replace:'_':''}">
		{if $requested_type == $lt_key}
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'recently.tpl'}
		{elseif $requested_type != $lt_key}
			<span class="info">{$lang.loading}</span>
		{/if}
	</div>
{/foreach}

<!-- listings tpl end -->