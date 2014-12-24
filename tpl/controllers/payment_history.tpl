<!-- payment history tpl -->

{if $transactions}

	<div class="list-table content-padding">
		<div class="header">
			<div class="center" style="width: 40px;">#</div>
			<div>{$lang.item}</div>
			<div style="width: 70px;">{$lang.amount}</div>
			<div style="width: 90px;">{$lang.payment_gateway}</div>
			<div style="width: 150px;">{$lang.txn_id}</div>
			<div style="width: 90px;">{$lang.date}</div>
		</div>

		{foreach from=$transactions item='item' name='transactionF'}
			{math assign='iteration' equation='(((current?current:1)-1)*per_page)+iter' iter=$smarty.foreach.transactionF.iteration current=$pInfo.current per_page=$config.transactions_per_page}
			<div class="row">
				<div class="center iteration no-flex">{$iteration}</div>
				<div data-caption="{$lang.item}" class="content">
					{$item.plan_info}
					<div class="inline">
						{if $item.item_info}
							<a href="{$item.link}">{$item.item_info}</a>
						{else}
							<span class="red">{$lang.item_not_available}</span>
						{/if}
					</div>
				</div>
				<div data-caption="{$lang.amount}">{if $config.system_currency_position == 'before'}{$config.system_currency}{/if} {$item.Total} {if $config.system_currency_position == 'after'}{$config.system_currency}{/if}</div>
				<div data-caption="{$lang.payment_gateway}">{$item.Gateway}</div>
				<div data-caption="{$lang.txn_id}">{$item.Txn_ID}</div>
				<div data-caption="{$lang.date}">{$item.Date|date_format:$smarty.const.RL_DATE_FORMAT}</div>
			</div>
		{/foreach}
	</div>

{else}
	<div class="text-message">{$lang.no_account_transactions}</div>
{/if}
<!-- payment history tpl end -->