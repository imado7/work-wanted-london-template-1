<!-- messages area DOM -->
	
{foreach from=$messages item='message' name='messagesF'}
<li class="{if $message.To != $account_info.ID}me{/if}{if $message.Hide} removed{/if}" id="message_{$message.ID}">
	{$message.Message|nl2br|replace:'\n':'<br />'}
	<div class="date">
		{if $message.Date|date_format:$smarty.const.RL_DATE_FORMAT == $smarty.now|date_format:$smarty.const.RL_DATE_FORMAT}
			{$message.Date|date_format:'%H:%M'}
		{else}
			{$message.Date|date_format:$smarty.const.RL_DATE_FORMAT}
		{/if}
		{if $message.Hide}
			<span class="red" title="{$lang.removed_by|replace:'[name]':$contact.Full_name}">{$lang.removed_by|replace:'[name]':$contact.Full_name}</span>
		{/if}
	</div>
	<span class="delete" title="{$lang.delete}"></span>
</li>
{/foreach}
	
<!-- messages area DOM end -->