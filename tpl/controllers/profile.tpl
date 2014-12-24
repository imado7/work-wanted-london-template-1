<!-- my profile -->

<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}jquery/jquery.qtip.js"></script>
<script type="text/javascript">flynax.qtip();</script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}ckeditor/ckeditor.js"></script>

<!-- tabs -->
<ul class="tabs">
	{foreach from=$tabs item='tab' name='tabF'}{strip}
		{if $tab.key == 'password'}{continue}{/if}
		<li {if $smarty.foreach.tabF.first}class="active"{/if} id="tab_{$tab.key}">{$tab.name}</li>
	{/strip}{/foreach}
</ul>
<!-- tabs end -->

<div class="content-padding">

	<!-- profile -->
	<div id="area_profile" class="tab_area {if $smarty.request.info == 'account'}hide{/if}">
		<form style="margin-bottom: 30px;" method="post" action="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}.html{else}?page={$pageInfo.Path}{/if}" enctype="multipart/form-data">
			<input type="hidden" name="info" value="profile" />
			<input type="hidden" name="fromPost_profile" value="1" />

			<div class="submit-cell">
				<div class="name">{$lang.mail}</div>
				<div class="field single-field">
					<input type="text" name="profile[mail]" maxlength="150" {if $smarty.post.profile.mail}value="{$smarty.post.profile.mail}"{/if} />
					{if $config.account_edit_email_confirmation}
						<div id="email_change_notice" class="notice_message {if !$aInfo.Mail_tmp}hide{/if}">
							{if $aInfo.Mail_tmp}
								{$lang.account_edit_email_confirmation_info|replace:'[e-mail]':$aInfo.Mail_tmp}
							{else}
								<b>{$lang.notice}</b>: {$lang.account_edit_email_confirmation_notice}
								<script type="text/javascript">
								{literal}
								
								$(document).ready(function(){
									$('input[name="profile[mail]"]').focus(function(){
										$('#email_change_notice').fadeIn('slow');
									});
								});
								
								{/literal}
								</script>
							{/if}
						</div>
					{/if}

					<label style="padding: 15px 0 5px;display: block;">
						<input value="1" type="checkbox" {if $smarty.post.profile.display_email}checked="checked"{/if} name="profile[display_email]" /> {$lang.display_email}
					</label>

					{rlHook name='tplProfileCheckbox'} <!-- > 4.3.0 -->
				</div>
			</div>

			{if $account_info.Own_location}
			<div class="submit-cell">
				<div class="name">{$lang.personal_address}</div>
				<div class="field {if $profile_info.Own_address}checkbox-field{/if}">
					{if $profile_info.Own_address}
						<a target="_blank" href="{$profile_info.Personal_address}">
							{$profile_info.Personal_address}
						</a>
					{else}
						{if $config.account_wildcard}
							http://<input type="text" style="width: 90px;" maxlength="30" name="profile[location]" {if $smarty.post.profile.location}value="{$smarty.post.profile.location}"{/if} />.{$domain}
						{else}
							http://{$domain}/<input type="text" style="width: 90px;" maxlength="30" name="profile[location]" {if $smarty.post.profile.location}value="{$smarty.post.profile.location}"{/if} />
						{/if}
						<div class="notice_message">{$lang.latin_characters_only}</div>
					{/if}
				</div>
			</div>
			{/if}

			<div class="submit-cell">
				<div class="name"></div>
				<div class="field"><input type="submit" value="{$lang.save}" id="profile_submit" /></div>
			</div>
		</form>
		<!-- profile end -->

		<!-- manage password -->
		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id='change_password_area' name=$lang.manage_password}

		<div class="submit-cell">
			<div class="name">{$lang.current_password}</div>
			<div class="field single-field"><input class="wauto" type="password" id="current_password" size="25" maxlength="30" /></div>
		</div>

		<div class="submit-cell">
			<div class="name">{$lang.new_password}</div>
			<div class="field single-field two-inline left">
				<div><input id="new_password" size="25" class="wauto" type="password" name="profile[password]" maxlength="50" {if $smarty.post.profile.password}value="{$smarty.post.profile.password}"{/if} /></div>
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

					<script type="text/javascript">
					{literal}
					
					$(document).ready(function(){
						flynax.passwordStrength();
						
						$('#new_password').blur(function(){
							if ( rlConfig['account_password_strength'] ) {
								if ( $('#password_strength').val() < 3 ) {
									printMessage('warning', lang['password_weak_warning'])
								}
								else {
									$('div.warning div.close').trigger('click');
								}
							}
						});
					});
						
					{/literal}
					</script>
				{/if}
			</div>
		</div>

		<div class="submit-cell">
			<div class="name">{$lang.new_password_repeat}</div>
			<div class="field single-field"><input class="wauto" size="25" type="password" id="password_repeat" maxlength="30" /></div>
		</div>

		<div class="submit-cell buttons">
			<div class="name"></div>
			<div class="field"><input id="change_password" type="button" value="{$lang.change}" /></div>
		</div>

		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}

		<script>
		{literal}

		$(document).ready(function(){
			$('#change_password').click(function(){
				xajax_changePass( $('#current_password').val(), $('#new_password').val(), $('#password_repeat').val() );
				$(this).val('{/literal}{$lang.loading}{literal}');
			});
		});

		{/literal}
		</script>
	</div>
	<!-- manage password tab -->

	<!-- account -->
	{if !empty($profile_info.Fields)}
		<div id="area_account" class="tab_area {if $smarty.request.info != 'account'}hide{/if}">
			<form method="post" action="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}.html{else}?page={$pageInfo.Path}{/if}" enctype="multipart/form-data">
				<input type="hidden" name="info" value="account" />
				<input type="hidden" name="fromPost_account" value="1" />
				
				{include file='blocks'|cat:$smarty.const.RL_DS|cat:'reg_account.tpl' fields=$profile_info.Fields}

				<div class="submit-cell">
					<div class="name"></div>
					<div class="field"><input type="submit" name="finish" value="{$lang.edit}" /></div>
				</div>
			</form>
		</div>
	{/if}
	<!-- account end -->
</div>

<script type="text/javascript" src="{$rlTplBase}js/ajaxfileupload.js"></script>

<script type="text/javascript">
lang['not_image_file'] = "{$lang.not_image_file}";
lang['uploading_completed'] = "{$lang.uploading_completed}";
var current_thumbnail = {if $profile_info.Photo}'{$smarty.const.RL_FILES_URL}{$profile_info.Photo}'{else}false{/if};
var request_data = '{$smarty.request.info}';
{literal}

var uploadThumbHandler = function(){
	console.log($(this).closest('form').attr('action'))
	$.ajaxFileUpload ({
		url: $('form.my-profile-sidebar').attr('action'), 
		secureuri: false,
		fileElementId: 'thumbnail_input',
		dataType: 'json',
		success: function (data, status) {
			if ( typeof(data.error) != 'undefined' ) {
				if ( data.error ) {
					printMessage('error', 'Unable to save the image on the server, please contact support.');
				} else {
					printMessage('notice', lang['uploading_completed']);
				}
			}
		},
		error: function (data, status, e) {
			printMessage('error', 'Unable to save the image on the server, please contact support.');
		}
	});
}

$(document).ready(function(){
	$('ul.tabs li#tab_account').one('click', function(){
		flynax.mlTabs();
	});

	$('#thumbnail_input').imgPreview({
		current: current_thumbnail
	});

	if ( request_data == 'account' ) {
		$('#tab_account').trigger('click');
	}
});

{/literal}
</script>

{rlHook name='profileBlock'}

<!-- my profile end -->
