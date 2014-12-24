<!-- side bar search form -->

{if $search_forms}

	<section class="side_block_search">
		{if $search_forms|@count > 1}
			<!-- tabs -->
			<ul class="tabs search_tabs">
				{foreach from=$search_forms item='search_form' key='sf_key' name='stabsF'}{assign var='zindex' value=20}<li class="{if $smarty.foreach.stabsF.first}active{/if}">{$search_form.name}{/foreach}
			</ul>
			<!-- tabs end -->
		{/if}
		
		{php}global $config; $config['search_fields_position'] = 1;{/php}
		{assign var='items_count' value=10}
	
		<div class="search-block-content{if $search_forms|@count == 1} no-tabs{/if}">
			{foreach from=$search_forms item='search_form' key='sf_key' name='sformsF'}	
				{assign var='spage_key' value=$listing_types[$search_form.listing_type].Page_key}
				{assign var='post_form_key' value=$sf_key}
				
				{if $search_forms|@count > 1}
					<div class="search_tab_area{if !$smarty.foreach.sformsF.first} hide{/if}">
				{/if}
				
				<form method="{$listing_types[$search_form.listing_type].Submit_method}" action="{$rlBase}{if $config.mod_rewrite}{$pages.$spage_key}/{$search_results_url}.html{else}?page={$pages.$spage_key}&amp;{$search_results_url}{/if}">
					<input type="hidden" name="action" value="search" />
					<input type="hidden" name="post_form_key" value="{$sf_key}" />
					
					{if $search_form.arrange_field}
						<input {if !$smarty.foreach.sformsF.first}disabled="disabled"{/if} class="search_tab_hidden" type="hidden" name="f[{$search_form.arrange_field}]" value="{$search_form.arrange_value}" />
					{/if}
					
					{strip}
						{foreach from=$search_form.data item='group' name='qsearchF'}
							{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fields_search_box.tpl' fields=$group.Fields}
						{/foreach}
					{/strip}
					
					<div class="search-item">
						<label>
							<input name="f[with_photo]" type="checkbox" value="true" />
							{$lang.with_photos_only}
						</label>
					</div>
					
					{strip}
					<div class="search-button">
						<input type="submit" name="search" value="{$lang.search}" />
						{if $listing_types[$search_form.listing_type].Advanced_search && $listing_types[$search_form.listing_type].Advanced_search_availability}
							<a title="{$lang.advanced_search}" href="{$rlBase}{if $config.mod_rewrite}{$pages.$spage_key}/{$advanced_search_url}.html{else}?page={$pages.$spage_key}&amp;{$advanced_search_url}{/if}">{$lang.advanced_search}</a>
						{/if}
					</div>
					{/strip}
					
				</form>
				
				{if $search_forms|@count > 1}
					</div>
				{/if}
			{/foreach}	
		</div>
	</section>
		
	<script type="text/javascript">
		{if $search_forms|@count > 1}
			flynax.searchTabs();
		{/if}
		flynax.multiCatsHandler();
	</script>
{/if}

<!-- side bar search form end -->