<!-- my packages tpl -->

{if $renew_id}
	
	{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id='plan_block' name=$lang.plan_details}
		<ul class="packages">
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'my_package_item.tpl' package=$pack_info renew=true}
		</ul>
	{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}

	<form onsubmit="return flynax.isGatewaySelected();" name="payment" method="post" action="{$rlBase}{if $config.mod_rewrite}{$pages.payment}.html{else}?page={$pages.payment}{/if}">
		<!-- select a payment gateway -->
		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id='gateways' name=$lang.payment_gateways}
			
			<ul id="payment_gateways">
				{if $config.use_paypal}
				<li>
					<img alt="" src="{$smarty.const.RL_LIBS_URL}payment/paypal/paypal.png" />
					<p><input {if $smarty.post.gateway == 'paypal' || !$smarty.post.gateway}checked="checked"{/if} type="radio" name="gateway" value="paypal" /></p>
				</li>
				{/if}
				{if $config.use_2co}
				<li>
					<img alt="" src="{$smarty.const.RL_LIBS_URL}payment/2co/2co.png" />
					<p><input {if $smarty.post.gateway == '2co'}checked="checked"{/if} type="radio" name="gateway" value="2co" /></p>
				</li>
				{/if}
				
				{rlHook name='paymentGateway'}
			</ul>
		
			<script type="text/javascript">
				flynax.paymentGateway();
			</script>
			
		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}
		<!-- select a payment gateway end -->
		
		<input type="submit" value="{$lang.checkout}" />
	</form>
	
{elseif $purchase}

	{if empty($available_packages)}
		<div class="info">{$lang.no_available_packages}</div>
	{else}
		<form onsubmit="return flynax.isGatewaySelected();" name="payment" method="post" action="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}/purchase.html{else}?page={$pageInfo.Path}&amp;purchase{/if}">
			<input type="hidden" name="action" value="submit" />
			
			<!-- select a plan -->
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id='plans' name=$lang.select_plan tall=true}
			
			{if $available_packages|@count > 5}<div class="plans-container">{/if}
			<ul class="plans low{if $available_packages|@count > 5} more-5{else} count-{$available_packages|@count}{/if}">
				{foreach from=$available_packages item='plan' name='plansF'}{strip}
					{assign var='item_disabled' value=false}
					{if $plan.ID|in_array:$used_plans_id}
						{assign var='item_disabled' value=true}
					{/if}

					<li class="clearfix">
						<div class="frame{if $plan.Color} colored{/if}{if $item_disabled} disabled{/if}" {if $plan.Color}style="background-color: #{$plan.Color};border-color: #{$plan.Color};"{/if}>
							<span class="name">{$plan.name}</span>
							<span class="price">
								{if isset($plan.Listings_remains)}
									&#8212;
								{else}
									{if $config.system_currency_position == 'before'}{$config.system_currency}{/if}
									{$plan.Price}
									{if $config.system_currency_position == 'after'}{$config.system_currency}{/if}
								{/if}
							</span>
							<span title="{$lang.plan_type}" class="type">
								{assign var='l_type' value=$plan.Type|cat:'_plan_short'}{$lang.$l_type}
							</span><span title="{$lang.listing_live}" class="count">
								{if $plan.Listing_period}{$plan.Listing_period} {$lang.days}{else}{$lang.unlimited}{/if}
							</span>
							<span title="{$lang.images_number}" class="count">
								{if $plan.Image_unlim}{$lang.unlimited}{else}{$plan.Image} {$lang.photos_count}{/if}
							</span>
							<span title="{$lang.number_of_videos}" class="count">
								{if $plan.Video_unlim}{$lang.unlimited}{else}{$plan.Video} {$lang.video}{/if}
							</span>
						</div>

						<div class="selector">
							<label {if $item_disabled}class="hint" title="{$lang.plan_limit_using_deny}"{/if}><input id="plan_{$plan.ID}" class="multiline" {if $item_disabled}disabled="disabled" {/if} type="radio" name="plan" value="{$plan.ID}" {if $plan.ID == $smarty.post.plan && !$item_disabled}checked="checked"{/if} /></label>
						</div>
					</li>
				{/strip}{/foreach}
			</ul>
			{if $available_packages|@count > 5}</div>{/if}
			
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}
			
			<script type="text/javascript">
			var plans = Array();
			var selected_plan_id = 0;
			var last_plan_id = 0;
			{foreach from=$available_packages item='plan'}
			plans[{$plan.ID}] = new Array();
			plans[{$plan.ID}]['Key'] = '{$plan.Key}';
			plans[{$plan.ID}]['Price'] = {$plan.Price};
			plans[{$plan.ID}]['Featured'] = {$plan.Featured};
			plans[{$plan.ID}]['Advanced_mode'] = {$plan.Advanced_mode};
			plans[{$plan.ID}]['Package_ID'] = {if $plan.Package_ID}{$plan.Package_ID}{else}false{/if};
			plans[{$plan.ID}]['Standard_listings'] = {$plan.Standard_listings};
			plans[{$plan.ID}]['Featured_listings'] = {$plan.Featured_listings};
			plans[{$plan.ID}]['Standard_remains'] = {if $plan.Standard_remains}{$plan.Standard_remains}{else}false{/if};
			plans[{$plan.ID}]['Featured_remains'] = {if $plan.Featured_remains}{$plan.Featured_remains}{else}false{/if};
			plans[{$plan.ID}]['Listings_remains'] = {if $plan.Listings_remains}{$plan.Listings_remains}{else}false{/if};
			{/foreach}
		
			{literal}
		
			$(document).ready(function(){
				$('ul.plans > li > div.selector input').click(function(){
					flynax.planClick(this);
				});

				$('ul.plans div.frame:not(.disabled)').click(function(){
					$(this).next().find('input[type=radio]:not(.hide):first').trigger('click');
				});

				if ( $('ul.plans input[name=plan]:checked').length == 0 ) {
					$('ul.plans input[name=plan]:not(:disabled):first').attr('checked', true);
				}
				
				$('#fs_gateways').hide();
				flynax.planClick($('ul.plans input[name=plan]:checked'));
			});
			
			{/literal}
			</script>
			<!-- select a plan end -->
	
			<!-- select a payment gateway -->
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id='gateways' name=$lang.payment_gateways}
				
				<ul id="payment_gateways">
					{if $config.use_paypal}
					<li>
						<img alt="" src="{$smarty.const.RL_LIBS_URL}payment/paypal/paypal.png" />
						<p><input {if $smarty.post.gateway == 'paypal' || !$smarty.post.gateway}checked="checked"{/if} type="radio" name="gateway" value="paypal" /></p>
					</li>
					{/if}
					{if $config.use_2co}
					<li>
						<img alt="" src="{$smarty.const.RL_LIBS_URL}payment/2co/2co.png" />
						<p><input {if $smarty.post.gateway == '2co'}checked="checked"{/if} type="radio" name="gateway" value="2co" /></p>
					</li>
					{/if}
					
					{rlHook name='paymentGateway'}
				</ul>
			
				<script type="text/javascript">
					flynax.paymentGateway();
				</script>
				
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}
			<!-- select a payment gateway end -->
			
			<input type="submit" value="{$lang.checkout}" />
			
		</form>
	{/if}

{else}

	{if $packages}
		<ul class="packages">
			{foreach from=$packages item='package' name='packagesF'}
				{include file='blocks'|cat:$smarty.const.RL_DS|cat:'my_package_item.tpl'}
			{/foreach}
		</ul>

		<a href="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}/purchase.html{else}?page={$pageInfo.Path}&amp;purchase{/if}" class="button">{$lang.purchase_new_package}</a>

		{*
		<div class="highlight">
		
		<table class="list">
		<tr class="header">
			<td>{$lang.package_info}</td>
			<td class="divider"></td>
			<td style="width: 180px;">{$lang.features}/{$lang.listings_left}</td>
			<td class="divider"></td>
			<td style="width: 90px;">{$lang.expiration_date}</td>
		</tr>
		{foreach from=$packages item='package' name='packagesF'}
		<tr class="body">
			<td class="first" valign="top">
				<table>
				<tr>
					<td valign="top" class="price"><div>{if $package.Price > 0}{$config.system_currency} {$package.Price}{else}{$lang.free}{/if}</div></td>
					<td valign="top">
						<span class="name">{$package.name}</span>
						
						<ul class="features" style="padding-top: 5px;">
							<li title="{$lang.plan_live_for}" class="period">{$lang.plan_live_for}: {if $package.Plan_period}<b>{$package.Plan_period}</b> {$lang.days}{else}{$lang.unlimited}{/if}</li>
						</ul>
					</td>
				</tr>
				</table>
			</td>
			<td class="divider"></td>
			<td valign="top">
				<ul class="features">
					<li title="{$lang.images_number}" class="pics">{if $package.Image}<b>{$package.Image}</b>{else}<span title="{$lang.unlimited}">-</span>{/if}</li>
					<li title="{$lang.number_of_videos}" class="video">{if $package.Video}<b>{$package.Video}</b>{else}<span title="{$lang.unlimited}">-</span>{/if}</li>
					<li title="{$lang.listing_live_for}" class="period">{if $package.Listing_period}<b>{$package.Listing_period}</b> {$lang.days}{else}<span title="{$lang.unlimited}">-</span>{/if}</li>
				</ul>
				
				<ul class="package_info">
				{if $package.Advanced_mode}
					<li>
						{$lang.standard}:
						<span {if empty($package.Standard_remains) && !empty($package.Standard_listings)}class="overdue"{/if}>
							{if empty($package.Standard_listings)}
								<b>{$lang.unlimited}</b>
							{else}
								{assign var='rRest' value=`$smarty.ldelim`rest`$smarty.rdelim`}
								{assign var='rAmount' value=`$smarty.ldelim`amount`$smarty.rdelim`}
								{$lang.rest_of_amount|replace:$rRest:$package.Standard_remains|replace:$rAmount:$package.Standard_listings}
							{/if}
						</span>
					</li>
					<li>
						{$lang.featured}:
						<span {if empty($package.Featured_remains) && !empty($package.Featured_listings)}class="overdue"{/if}>
							{if empty($package.Featured_listings)}
								<b>{$lang.unlimited}</b>
							{else}
								{assign var='rRest' value=`$smarty.ldelim`rest`$smarty.rdelim`}
								{assign var='rAmount' value=`$smarty.ldelim`amount`$smarty.rdelim`}
								{$lang.rest_of_amount|replace:$rRest:$package.Featured_remains|replace:$rAmount:$package.Featured_listings}
							{/if}
						</span>
					</li>
				{else}
					<li>
						{if $package.Featured}
							{$lang.featured}: 
						{else}
							{$lang.standard}: 
						{/if}
						<span {if empty($package.Listings_remains) && !empty($package.Listing_number)}class="overdue"{/if}>
							{if empty($package.Listing_number)}
								<b>{$lang.unlimited}</b>
							{else}
								{assign var='rRest' value=`$smarty.ldelim`rest`$smarty.rdelim`}
								{assign var='rAmount' value=`$smarty.ldelim`amount`$smarty.rdelim`}
								{$lang.rest_of_amount|replace:$rRest:$package.Listings_remains|replace:$rAmount:$package.Listing_number}
							{/if}
						</span>
					</li>
				{/if}
				</ul>
			</td>
			<td class="divider"></td>
			<td valign="top">
				<span class="{$package.Exp_status}">
					{if $package.Exp_date == 'unlimited'}
						{$lang.unlimited}
					{else}
						{$package.Exp_date|date_format:$smarty.const.RL_DATE_FORMAT}
					{/if}
				</span>
				<div style="text-align: center;padding: 10px 0 0;">
					<a title="{$lang.renew}" href="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}.html?renew={$package.ID}{else}?page={$pageInfo.Path}&amp;renew={$package.ID}{/if}" class="renew"><span></span></a>
				</div>
			</td>
		</tr>
		{/foreach}
		</table>
		
		
		
		</div>
		*}
		
	{else}
	
		{if $config.mod_rewrite}
			{assign var='link' value=$rlBase|cat:$pageInfo.Path|cat:'/purchase.html'}
		{else}
			{assign var='link' value=$rlBase|cat:'?page='|cat:$pageInfo.Path|cat:'&amp;purchase'}
		{/if}
		{assign var='replace' value='<a href="'|cat:$link|cat:'" class="static">$1</a>'}
		<span class="info">{$lang.no_packages_available|regex_replace:'/\[(.*)\]/':$replace}</span>
		
	{/if}
	
{/if}

<!-- my packages tpl end -->