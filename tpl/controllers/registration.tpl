<!-- registration controller -->

<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}jquery/jquery.qtip.js"></script>
<script type="text/javascript">flynax.qtip(); flynax.phoneField();</script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}ckeditor/ckeditor.js"></script>

<script>
{literal}
flynax.switchStep = function(step){
	$('ul.steps > li').removeClass('current');
	$('ul.steps li#step_'+step).prevAll().attr('class', 'past');
	$('ul.steps li#step_'+step).addClass('current');
	$('div.step_area').hide();
	$('div.area_'+step).show();
	$('input[name=reg_step]').val(step);
	
	this.currentStep = step;
};
{/literal}
</script>

<!-- steps -->
<ul class="steps">
	{math assign='step_width' equation='round(100/count, 3)' count=$reg_steps|@count}
	{foreach from=$reg_steps item='step' name='stepsF' key='step_key'}
		<li  style="width: {$step_width}%;" id="step_{$step_key}" class="{if $smarty.foreach.stepsF.first}current{/if}">
			<a href="javascript:void(0)" {if $smarty.foreach.stepsF.iteration == 1}onclick="flynax.switchStep('profile');"{/if} title="{$step.name}">{if $step.caption} <span>{$lang.step}</span> {$smarty.foreach.stepsF.iteration}{else}{$step.name}{/if}</a>
		</td>
	{/foreach}
</ul>
<!-- steps -->

<h1>{$pageInfo.name}</h1>

<div class="content-padding">
	{if $smarty.get.step == 'done'}
		<div class="area_done">
			<div class="caption">{$lang.registration_complete_caption}</div>
			
			{if $account_types.$registr_account_type.Auto_login && !$account_types.$registr_account_type.Email_confirmation && !$account_types.$registr_account_type.Admin_confirmation}
				{if $config.mod_rewrite}
					{assign var='add_listing' value=$pages.add_listing|cat:'.html'}
				{else}
					{assign var='add_listing' value='?page='|cat:$pages.add_listing}
				{/if}
				{assign var='replace' value='<a href="'|cat:$rlBase|cat:$add_listing|cat:'">$1</a>'}
				{$lang.registration_complete_auto_login|regex_replace:'/\[(.*)\]/':$replace}
			{else}
				{if $account_types.$registr_account_type.Email_confirmation}
					{assign var='replace' value=`$smarty.ldelim`email`$smarty.rdelim`}
					{$lang.registration_complete_incomplete|replace:$replace:$smarty.session.ses_registration_data.email}
				{else}
					{if $account_types.$registr_account_type.Admin_confirmation}
						{$lang.registration_complete_pending}
					{else}
						{if $config.mod_rewrite}
							{assign var='account_area_link' value=$rlBase|cat:$pages.login|cat:'.html'}
						{else}
							{assign var='account_area_link' value=$rlBase|cat:'?page='|cat:$pages.login}
						{/if}
						{assign var='replace' value='<a href="'|cat:$account_area_link|cat:'">$1</a>'}
						{$lang.registration_complete_active|regex_replace:'/\[(.*)\]/':$replace}
					{/if}
				{/if}
			{/if}
		</div>
		<script type="text/javascript">flynax.switchStep('done');</script>
	{else}
		<form name="account_reg_form" method="post" action="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}.html{else}?page={$pageInfo.Path}{/if}" enctype="multipart/form-data">
			<input type="hidden" name="registration" value="1" />
			<input type="hidden" name="reg_step" value="" />
			
			<div class="area_profile step_area">
				<div class="submit-cell">
					<div class="name">{$lang.username}</div>
					<div class="field single-field">
						<input size="35" class="wauto" type="text" name="profile[username]" maxlength="50" {if $smarty.post.profile.username}value="{$smarty.post.profile.username}"{/if} />
					</div>
				</div>

				<div class="submit-cell">
					<div class="name">{$lang.password}</div>
					<div class="field single-field two-inline left">
						<div><input size="25" class="wauto" type="password" name="profile[password]" maxlength="50" {if $smarty.post.profile.password}value="{$smarty.post.profile.password}"{/if} /></div>
						{if $config.account_password_strength}
							<div>
								<input type="hidden" id="password_strength" value="" />
								<div class="password_strength">
									<div class="scale">
										<div class="color"></div>
										<div class="shine"></div>
									</div>
									<div id="pass_strength"></div>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<div class="submit-cell">
					<div class="name">{$lang.password_repeat}</div>
					<div class="field single-field">
						<input size="25" class="wauto" type="password" name="profile[password_repeat]" maxlength="50" {if $smarty.post.profile.password}value="{$smarty.post.profile.password}"{/if} />
					</div>
				</div>

				<div class="submit-cell">
					<div class="name">{$lang.mail}</div>
					<div class="field single-field">
						<div><input size="45" class="wauto" type="text" name="profile[mail]" {if $smarty.post.profile.mail}value="{$smarty.post.profile.mail}"{/if} /></div>
						<div class="options">
							<label style="padding: 15px 0 5px;display: block;">
								<input value="1" type="checkbox" {if isset($smarty.post.profile.display_email)}checked="checked"{/if} name="profile[display_email]" /> {$lang.display_email}
							</label>
							{rlHook name='tplRegistrationCheckbox'}<!-- > 4.1.0 -->
						</div>
					</div>
				</div>

				<div class="submit-cell">
					<div class="name">{$lang.account_type}</div>
					<div class="field single-field">
						{if $account_types|@count > 1}
							<select name="profile[type]">
								<option value="0">{$lang.select}</option>
								{foreach from=$account_types item='account_type'}
									<option value="{$account_type.ID}" {if $smarty.post.profile.type == $account_type.ID}selected="selected"{/if}>{$account_type.name}</option>
								{/foreach}
							</select>
							
							{foreach from=$account_types item='account_type'}
								{if $account_type.desc}<div class="qtip_cont">{$account_type.desc}</div><img class="qtip hide desc_{$account_type.ID}" src="{$rlTplBase}img/blank.gif" alt="" />{/if}
							{/foreach}
						{else}
							{foreach from=$account_types item='account_type' name='typesF'}
								{assign var='own_location' value=$account_type.Own_location}
								<span class="default_size">{$account_type.name}</span>
								<select name="profile[type]" class="hide">
									<option value="{$account_type.ID}" selected="selected">{$account_type.name}</option>
								</select>
								{if $account_type.desc}
								<div class="qtip_cont">{$account_type.desc}</div><img title="" class="qtip" src="{$rlTplBase}img/blank.gif" alt="" />
								{/if}
							{/foreach}
						{/if}
					</div>
				</div>
				
				<div id="personal_address_field" class="{if $account_types|@count > 1 || !$own_location}hide{/if}">
					<div class="submit-cell">
						<div class="name">{$lang.personal_address}</div>
						<div class="field single-field">
							{if $config.account_wildcard}
								http://<input type="text" style="width: 90px;" maxlength="30" name="profile[location]" {if $smarty.post.profile.location}value="{$smarty.post.profile.location}"{/if} />.{$domain}
							{else}
								http://{$domain}/<input type="text" style="width: 90px;" maxlength="30" name="profile[location]" {if $smarty.post.profile.location}value="{$smarty.post.profile.location}"{/if} />
							{/if}

							<div class="notice">{$lang.latin_characters_only}</div>
						</div>
					</div>
				</div>
				
				{if $config.security_img_registration}
					<div class="submit-cell">
						<div class="name">{$lang.security_code}</div>
						<div class="field">{include file='captcha.tpl' no_caption=true}</div>
					</div>
				{/if}

				<div class="submit-cell buttons">
					<div class="name"></div>
					<div class="field"><input type="submit" value="{$lang.next_step}" id="profile_submit" /></div>
				</div>
				
				<script type="text/javascript">
				var reg_account_fields = false;
				var reg_account_type = false;
				var reg_account_submit = false;
				var account_types = new Array();
				
				{foreach from=$account_types item='account_type'}
					account_types[{$account_type.ID}] = {if $account_type.Own_location}1{else}0{/if};
				{/foreach}
				
				flynax.registration({if $fields}true{/if});
				flynax.passwordStrength();

				{if $smarty.post.reg_step == 'account'}
					reg_account_submit = true;
					var reg_step = '{$smarty.post.reg_step}';
					{literal}
					$(document).ready(function(){
						flynax.switchStep(reg_step);
						flynax.mlTabs();
					});
					{/literal}
				{/if}
				</script>
			</div>
			
			<div class="area_account step_area hide">
				<div id="account_table">
					{if $fields}
						{include file='blocks'|cat:$smarty.const.RL_DS|cat:'reg_account.tpl'}
					{/if}
				</div>

				<div class="hide eval">flynaxTpl.customInput();</div>

				<span class="form-buttons form">	
					<a href="javascript:void(0)" onclick="reg_account_submit = false;flynax.switchStep('profile');">{if $smarty.const.RL_LANG_DIR == 'ltr'}&larr;{else}&rarr;{/if} {$lang.perv_step}</a>
					<input type="submit" value="{$lang.next_step}" />
				</span>
			</div>
		</form>
	{/if}
</div>

<!-- registration controller end -->