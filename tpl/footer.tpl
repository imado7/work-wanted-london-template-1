	<footer class="clearfix">
		<div class="point1 clearfix">
			<div class="top-line">
				<span class="scroll-top angel-gradient-light"></span>

				<div class="logo">
					<a href="{$rlBase}" title="{$config.site_name}">
						<img alt="{$config.site_name}" src="{$rlTplBase}img/blank.gif" />
					</a>
				</div>
				
				<nav class="footer-menu">
					{include file='menus'|cat:$smarty.const.RL_DS|cat:'footer_menu.tpl'}
				</nav>
			</div>

			<div class="bottom-line">
				&copy; {$smarty.now|date_format:'%Y'}, {$lang.powered_by} <a title="{$lang.powered_by} {$lang.copy_rights}" href="{$lang.flynax_url}">{$lang.copy_rights}</a>

				<img class="payment-methods-img" src="{$rlTplBase}img/blank.gif" />

				<div class="icons">
					<a title="{$lang.subscribe_rss}" href="{$rlBase}{if $config.mod_rewrite}{$pages.rss_feed}/{if $rss}{if $rss.item}{$rss.item}/{/if}{if $rss.id}{$rss.id}/{/if}{else}news/{/if}{else}?page={$pages.rss_feed}{if $rss}{if $rss.item}&amp;item={$rss.item}{/if}{if $rss.id}&amp;id={$rss.id}{/if}{else}&amp;item=news{/if}{/if}" target="_blank"><img alt="RSS Feed" src="{$rlTplBase}img/blank.gif" class="rss" /></a>
					<a target="_blank" title="{$lang.join_us_on_facebook}" href="{$config.responsive_42_fb}"><img alt="facebook" src="{$rlTplBase}img/blank.gif" class="facebook" /></a>
					<a target="_blank" title="{$lang.join_us_on_twitter}" href="{$config.responsive_42_twitter}"><img alt="twitter" src="{$rlTplBase}img/blank.gif" class="twitter" /></a>
				</div>
			</div>
		</div>
	</footer>

	{if !$isLogin}
		<div id="login_modal_source" class="hide">
			<div class="tmp-dom">
				<div class="caption_padding">{$lang.login}</div>
				
				{if $loginAttemptsLeft > 0 && $config.security_login_attempt_user_module}
					<div class="attention">{$loginAttemptsMess}</div>
				{elseif $loginAttemptsLeft <= 0 && $config.security_login_attempt_user_module}
					<div class="attention">
						{assign var='periodVar' value=`$smarty.ldelim`period`$smarty.rdelim`}
						{assign var='replace' value='<b>'|cat:$config.security_login_attempt_user_period|cat:'</b>'}
						{assign var='regReplace' value='<span class="red">$1</span>'}
						{$lang.login_attempt_error|replace:$periodVar:$replace|regex_replace:'/\[(.*)\]/':$regReplace}
					</div>
				{/if}
				
				<form {if $loginAttemptsLeft <= 0 && $config.security_login_attempt_user_module}onsubmit="return false;"{/if} action="{$rlBase}{if $config.mod_rewrite}{$pages.login}.html{else}?page={$pages.login}{/if}" method="post">
					<input type="hidden" name="action" value="login" />

					<div class="submit-cell">
						<div class="name">{$lang.username}</div>
						<div class="field">
							<input {if $loginAttemptsLeft <= 0 && $config.security_login_attempt_user_module}disabled="disabled" class="disabled"{/if} type="text" name="username" maxlength="35" value="{$smarty.post.username}" />
						</div>
					</div>
					<div class="submit-cell">
						<div class="name">{$lang.password}</div>
						<div class="field">
							<input {if $loginAttemptsLeft <= 0 && $config.security_login_attempt_user_module}disabled="disabled" class="disabled"{/if} type="password" name="password" maxlength="35" />
						</div>
					</div>

					<div class="submit-cell buttons">
						<div class="name"></div>
						<div class="field">
							<input {if $loginAttemptsLeft <= 0 && $config.security_login_attempt_user_module}disabled="disabled" class="disabled"{/if} type="submit" value="{$lang.login}" />

							<div style="padding: 10px 0 0 0;">{$lang.forgot_pass} <a title="{$lang.remind_pass}" class="brown_12" href="{$rlBase}{if $config.mod_rewrite}{$pages.remind}.html{else}?page={$pages.remind}{/if}">{$lang.remind}</a></div>
						</div>
					</div>
				</form>
			</div>
		</div>
	{/if}
	
	{rlHook name='tplFooter'}
</body>
</html>