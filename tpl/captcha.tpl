{if $table_cell}
<tr>
	<td class="name">{$lang.security_code}<span class="red">*</span></td>
	<td class="field">
		<input type="text" class="text" id="{if $captcha_id}{$captcha_id}_{/if}security_code" name="security_code" maxlength="{$config.security_code_length}" style="width: 50px; margin: 0;" />
		<img style="margin-{$text_dir}: 20px;" id="{if $captcha_id}{$captcha_id}_{/if}security_img" class="{if $captcha_id}{$captcha_id}_{/if}security_img" alt="{$lang.click_refresh}" title="{$lang.click_refresh}" src="{$smarty.const.RL_LIBS_URL}kcaptcha/getImage.php?{$smarty.server.REQUEST_TIME}{if $captcha_id}&amp;id={$captcha_id}{/if}" style="cursor: pointer;" onclick="$(this).attr('src','{$smarty.const.RL_LIBS_URL}kcaptcha/getImage.php?'+Math.random(){if $captcha_id}+'&amp;id={$captcha_id}'{/if});" />
	</td>
</tr>
{else}

	{if !$no_caption}<div>{$lang.security_code} <span class="red">*</span></div>{/if}
	<table>
	<tr>
		<td style="padding-{$text_dir_rev}: 5px;width: 120px;">
			<img id="{if $captcha_id}{$captcha_id}_{/if}security_img" class="{if $captcha_id}{$captcha_id}_{/if}security_img" alt="{$lang.click_refresh}" title="{$lang.click_refresh}" src="{$smarty.const.RL_LIBS_URL}kcaptcha/getImage.php?{$smarty.server.REQUEST_TIME}{if $captcha_id}&amp;id={$captcha_id}{/if}" style="cursor: pointer;" onclick="$(this).attr('src','{$smarty.const.RL_LIBS_URL}kcaptcha/getImage.php?'+Math.random(){if $captcha_id}+'&amp;id={$captcha_id}'{/if});" />
		</td>
		<td valign="bottom">
			<span style="line-height:16px;">{$lang.captcha_info}</span><br />
			<input type="text" class="wauto" id="{if $captcha_id}{$captcha_id}_{/if}security_code" name="security_code" maxlength="{$config.security_code_length}" size="{$config.security_code_length}" style="margin: 0;" />
		</td>
	</tr>
	</table>

{/if}