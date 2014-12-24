<!-- accounts tpl -->

{if $account_type}
	
	<!-- account details -->
	{if $account}
		<!-- contact owner form template -->
		<div class="hide" id="contact_owner_form">
			<div class="caption">{$lang.contact_owner}</div>
			
			<form class="light-inputs" name="contact_owner" onsubmit="flynax.contactOwnerSubmit($(this).find('input[type=submit]'));return false;" method="post" action="">
				{if $isLogin}
					<div class="submit-cell">
						<div class="value">
							<div>{$lang.message} <span class="red">*</span></div>
							<textarea id="contact_owner_message" rows="6" cols=""></textarea>
						</div>
					</div>
				{else}
					<div class="submit-cell">
						<div class="name">{$lang.name} <span class="red">*</span></div>
						<div class="field"><input maxlength="100" type="text" id="contact_name" value="{$account_info.First_name} {$account_info.Last_name}" /></div>
					</div>
					<div class="submit-cell">
						<div class="name">{$lang.mail} <span class="red">*</span></div>
						<div class="field"><input maxlength="200" type="text" id="contact_email" value="{$account_info.Mail}" /></div>
					</div>
					<div class="submit-cell">
						<div class="name">{$lang.contact_phone}</div>
						<div class="field"><input maxlength="30" type="text" id="contact_phone" /></div>
					</div>
					<div class="submit-cell">
						<div class="name">{$lang.message} <span class="red">*</span></div>
						<div>
							<textarea id="contact_owner_message" rows="7" cols=""></textarea>
						</div>
					</div>
					<div class="submit-cell">
						<div class="field">
							{include file='captcha.tpl' captcha_id='contact_code'}
						</div>
					</div>
				{/if}
				<div class="submit-cell buttons">
					<div class="field">
						<input type="submit" name="finish" value="{$lang.send}" />
						<a class="red margin close" href="javascript:void(0)">{$lang.cancel}</a>
					</div>
				</div>
			</form>
		</div>
		<!-- contact owner form template end -->

		<!-- account listings -->
		{if !empty($listings)}
		
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'grid_navbar.tpl'}
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'grid.tpl'}

			<!-- paging block -->
			{paging calc=$pInfo.calc total=$listings|@count current=$pInfo.current per_page=$config.listings_per_page custom=$account.Own_address full=true}
			<!-- paging block end -->
		
		{else}
			<div class="info">{$lang.no_dealer_listings}</div>
		{/if}
		<!-- account listings end -->

	{else}
		{if $alphabet_dealers}
			{assign var='dealers' value=$alphabet_dealers}
		{/if}

		<!-- dealers list -->
		{if $dealers}
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'grid_navbar_account.tpl'}

			<script>var accounts_map = new Array();</script>
			<section id="accounts" class="grid clearfix">
				{foreach from=$dealers item='dealer' key='key' name='dealersF'}
					{include file='blocks'|cat:$smarty.const.RL_DS|cat:'dealer.tpl'}
				{/foreach}
			</section>

			<section id="accounts_map" class="hide"></section>
			<script src="http://maps.googleapis.com/maps/api/js?libraries=places&amp;sensor=false{if $smarty.const.RL_LANG_CODE != '' && $smarty.const.RL_LANG_CODE != 'en'}&amp;language={$smarty.const.RL_LANG_CODE}{/if}"></script>
			
			{if $alphabet_dealers}
				{paging calc=$pInfo.calc_alphabet total=$dealers|@count current=$pInfo.current per_page=$config.dealers_per_page url=$char var='character'}
			{else}
				{paging calc=$pInfo.calc total=$dealers|@count current=$pInfo.current per_page=$config.dealers_per_page url=$search_results_url}
			{/if}
		{else}
			<div class="info">{$lang.no_dealers}</div>
		{/if}
		<!-- dealers list end -->
	{/if}

{/if}

<!-- accounts tpl end -->