	<!-- upgrade listing plan -->

{if isset($smarty.get.completed)}

	<span class="info">
		{assign var='replace' value='<a href="'|cat:$link|cat:'">$1</a>'}
		{$lang.notice_payment_listing_completed|regex_replace:'/\[(.*)\]/':$replace}
	</span>

{else}

	{rlHook name='upgradeListingTop'}

	<div class="highlight">
		<form method="post" action="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}{if $featured}/featured{/if}.html?id={$smarty.get.id}{else}?page={$pageInfo.Path}&amp;id={$smarty.get.id}{if $featured}&amp;featured{/if}{/if}">
			<input type="hidden" name="upgrade" value="true" />
			<input type="hidden" name="from_post" value="1" />
			
			<!-- select a plan -->
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id='plans' name=$lang.select_plan tall=true}

			{if $plans|@count > 5}<div class="plans-container">{/if}
			<ul class="plans{if $plans|@count > 5} more-5{else} count-{$plans|@count}{/if}">
				{foreach from=$plans item='plan' name='plansF'}{strip}
					{assign var='item_disabled' value=false}
					{if $plan.Limit > 0 && $plan.Using == 0 && $plan.Using != ''}
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
							{if $plan.Advanced_mode}
								<input id="plan_{$plan.ID}" class="hide" type="radio" name="plan" value="{$plan.ID}" {if $plan.ID == $smarty.post.plan}checked="checked"{/if} />

								<label><input class="multiline" {if $plan.ID == $smarty.post.plan && ($smarty.post.listing_type == 'standard' || !$smarty.post.listing_type)}checked="checked"{/if} {if $plan.Package_ID && empty($plan.Standard_remains) && $plan.Standard_listings != 0}disabled="disabled"{/if} type="radio" name="listing_type" value="standard" /> {$lang.standard_listing} {if $plan.Standard_listings != 0}({if isset($plan.Listings_remains)}{if empty($plan.Standard_remains)}{$lang.used_up}{else}{$plan.Standard_remains}{/if}{else}{$plan.Standard_listings}{/if}){/if}</label>

								<div style="padding-top: 20px;">
									<label><input class="multiline" {if $plan.ID == $smarty.post.plan && $smarty.post.listing_type == 'featured'}checked="checked"{/if} {if $plan.Package_ID && empty($plan.Featured_remains) && $plan.Featured_listings != 0}disabled="disabled"{/if} type="radio" name="listing_type" value="featured" /> {$lang.featured_listing} {if $plan.Featured_listings != 0}({if isset($plan.Listings_remains)}{if empty($plan.Featured_remains)}{$lang.used_up}{else}{$plan.Featured_remains}{/if}{else}{$plan.Featured_listings}{/if}){/if}</label>
								</div>
							{else}
								<label {if $item_disabled}class="hint" title="{$lang.plan_limit_using_deny}"{/if}><input id="plan_{$plan.ID}" class="multiline" {if $item_disabled}disabled="disabled" {/if} type="radio" name="plan" value="{$plan.ID}" {if $plan.ID == $smarty.post.plan && !$item_disabled}checked="checked"{/if} /> {if $plan.Featured || $featured}{$lang.featured_listing}{else}{$lang.standard_listing}{/if}</label>
							{/if}
						</div>
					</li>
				{/strip}{/foreach}
			</ul>
			{if $plans|@count > 5}</div>{/if}

			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}
			
			<script type="text/javascript">
			var plans = Array();
			var selected_plan_id = 0;
			var last_plan_id = 0;
			{foreach from=$plans item='plan'}
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
					var input = this;

					$('ul.plans input').not(this).attr('checked', false);

					selected_plan_id = $(this).attr('name') == 'plan' ? $(this).attr('id').split('_')[1] : $(this).closest('div.selector').find('input[name=plan]').attr('id').split('_')[1];

					if ( plans[selected_plan_id]['Package_ID'] || plans[selected_plan_id]['Advanced_mode'] ) {
						input = $(this).closest('li').find('input[name=plan]');
						input.attr('checked', true);
					}

					flynax.planClick(input);
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
			
			<div class="content-padding"><input type="submit" value="{$lang.upgrade}" /></div>
			
		</form>
	</div>
		
	{rlHook name='upgradeListingBottom'}
	
{/if}

<!-- upgrade listing plan end -->