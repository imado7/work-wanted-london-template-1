{if $block.Side == 'left' || $block.Side == 'right'}
	{assign var='style' value='side'}
{else}
	{assign var='style' value='content'}
{/if}

{assign var='block_class' value=false}
{if $block.Key == 'listing_type_categories'}
	{assign var='block_class' value='categories-box stick'}
{elseif $block.Key|strpos:'ltsb_' === 0}
	{assign var='block_class' value='side_block_search filled-in light-inputs stick'}
{elseif $block.Key == 'account_alphabetic_filter'}
	{assign var='block_class' value='filled-in stick'}
{elseif $block.Key == 'account_search'}
	{assign var='block_class' value='filled-in side_block_search stick'}
{elseif $block.Key == 'account_page_info'}
	{assign var='block_class' value='account-info stick'}
{elseif $block.Key == 'account_page_location'}
	{assign var='block_class' value='account-location filled-in stick'}
{elseif $block.Key == 'my_profile_sidebar' || ($block.Key == 'search_by_distance' && $pageInfo.Key == 'search_by_distance')}
	{assign var='block_class' value='stick'}
{elseif $block.Key|strpos:'categoryFilter_' === 0}
	{assign var='block_class' value='filled-in stick'}
{/if}

{if $block.Tpl}
	{include file='blocks'|cat:$smarty.const.RL_DS|cat:$style|cat:'_block_header.tpl' title=$block.name no_padding=$no_padding block_class=$block_class}
{/if}

{if !$block.Tpl}
<section class="no-style{if $block_class}{$blocks_class}{/if}">
{/if}

{if $block.Type == 'html'}
	{$block.Content}
{elseif $block.Type == 'smarty'}
	{insert name="eval" content=$block.Content}
{elseif $block.Type == 'php'}
	{php}
		eval($this->_tpl_vars['block']['Content']);
	{/php}
{/if}

{if !$block.Tpl}
</section>
{/if}

{if $block.Tpl}
	{include file='blocks'|cat:$smarty.const.RL_DS|cat:$style|cat:'_block_footer.tpl'}
{/if}