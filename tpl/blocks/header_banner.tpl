<!-- header banner tpl -->

{assign var='banner_placed' value=false}

{if $blocks.header_banner}
	{foreach from=$blocks item='block'}
		{if $block.Side == 'header_banner'}
			{assign var='banner_placed' value=true}
			
			{if $block.Type == 'html'}
				{$block.Content}
			{elseif $block.Type == 'smarty'}
				{insert name="eval" content=$block.Content}
			{elseif $block.Type == 'php'}
				{php}
					eval($this->_tpl_vars['block']['Content']);
				{/php}
			{/if}
			
			{break}
		{/if}
	{/foreach}
{/if}

{if !$banner_placed}
	<div class="no-banner">728x90</div>
{/if}

<!-- header banner tpl end -->