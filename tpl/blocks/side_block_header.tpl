<section class="side_block{if $block.Key|strpos:'ltcb_' === 0}{if ','|explode:$types|@count <= 1} categories-box-nav{/if}{/if}{if $block_class} {$block_class}{/if}">
	<h3>{if $name}{$name}{else}{$block.name}{/if}</h3>
	<div class="clearfix">