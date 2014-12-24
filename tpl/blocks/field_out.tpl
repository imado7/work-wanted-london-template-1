<!-- field output tpl -->

<div class="table-cell clearfix{if $small} small{/if}{if ($item.Type == 'checkbox' && $item.Opt1) || $item.Type == 'textarea'} wide-field{if $item.Type == 'textarea'} textarea{/if}{/if}" id="df_field_{$item.Key}">
	{if $item.Type == 'image' && $small}{else}
		<div class="name" title="{$item.name}">{if !$small}<div><span>{$item.name}</span></div>{else}{$item.name}{/if}</div>
	{/if}
	<div class="value{if $item.Type == 'image'} image{/if}">
		{if $item.Type == 'checkbox' && $item.Opt1 && is_array($item.Values)}
			<ul class="checkboxes clearfix">
			{foreach from=$item.Values item='tile' name='checkboxF'}
					{if !empty($item.Condition)}
						{assign var="tit_source" value=$tile.Key}
					{else}
						{assign var="tit_source" value=$tile.ID}
					{/if}
					<li title="{$lang[$tile.pName]}" class="{if $tit_source|in_array:$item.source}active{/if}">
						<img src="{$rlTplBase}img/blank.gif" alt="" />{$lang[$tile.pName]}
					</li>
			{/foreach}
			</ul>
		{else}
			{$item.value}
		{/if}
	</div>
</div>

<!-- field output tpl end -->