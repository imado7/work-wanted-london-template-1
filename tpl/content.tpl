<!-- page content -->

{assign var='featured_gallary' value=false}

<div id="wrapper">
	<div id="push-header"></div>
	
	<section id="main_container">
		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'bread_crumbs.tpl'}

		<div class="inside-container point1 clearfix">
			<!-- long top blocks area -->
			{if $blocks.long_top}	
				<div class="ling_top_block">
					{foreach from=$blocks item='block'}
					{if $block.Side == 'long_top'}
						{include file='blocks'|cat:$smarty.const.RL_DS|cat:'blocks_manager.tpl' block=$block}
					{/if}
					{/foreach}
				</div>
			{/if}
			<!-- long top blocks area -->
		
			<!-- right sidebar -->
			{if $blocks.left && $pageInfo.Controller != 'listing_details'}
				<aside class="left">
					{strip}
					{foreach from=$blocks item='block'}
					{if $block.Side == 'left'}
						{include file='blocks'|cat:$smarty.const.RL_DS|cat:'blocks_manager.tpl' block=$block}
					{/if}
					{/foreach}
					{/strip}
				</aside>
			{/if}
			<!-- right sidebar -->

			<section id="content">
				{if $pageInfo.Key != 'home' && !$no_h1}
					{if $navIcons}
						<div class="h1-nav">
							<nav id="content_nav_icons">
								{rlHook name='pageNavIcons'}

								{if $pageInfo.Controller == 'listing_details'}
									{include file='blocks'|cat:$smarty.const.RL_DS|cat:'listing_details_icons.tpl'}
								{/if}
								
								{if !empty($navIcons)}
									{foreach from=$navIcons item='icon'}
										{$icon}
									{/foreach}
								{/if}
							</nav>

							<h1>{$pageInfo.name}</h1>
						</div>
					{else}
						<h1>{$pageInfo.name}</h1>
					{/if}
				{/if}
				
				{if $pageInfo.Key == 'home'}
					{assign var='alphabet_array' value=','|explode:$lang.alphabet_characters}
					{assign var='reduce' value=0}
					{if 'All'|in_array:$alphabet_array}
						{assign var='reduce' value=1}
					{/if}
					{math assign='char_width' equation='round(100/(count-reduce), 3, 1)' count=$alphabet_array|@count reduce=$reduce}

					<div class="category-alphabet">
						<ul>
							{foreach from=$alphabet_array item='character'}{strip}
							{if $character|@mb_strlen:'utf-8' == 1}
								<li style="width: {$char_width}%;"><span>{$character}</span></li>
							{/if}
							{/strip}{/foreach}<li style="width: {$char_width}%;"><span>#</span></li>
						</ul>

						<div class="hide" id="cat_alphabet_cont"><div class="loading hide">{$lang.loading}</div></div>
					</div>
				{/if}

				<div id="system_message">
					<script type="text/javascript">//<![CDATA[
						var fixed_message = {if $fixed_message}false{else}true{/if};
						var message_text = '', error_fields = '';
						var message_type = 'error';
						{if isset($errors)}
							error_fields = {if $error_fields}'{$error_fields}'{else}false{/if};
							message_text += '<ul>';
							{foreach from=$errors item='error'}message_text += '<li>{$error|regex_replace:"/[\r\t\n]/":"<br />"}</li>';{/foreach}
							message_text += '</ul>';
						{/if}
						{if isset($pNotice)}
							message_text = '{$pNotice}';
							message_type = 'notice';
						{/if}
						{if isset($pAlert)}
							var message_text = '{$pAlert}';
							message_type = 'warning';
						{/if}
						{literal}
						$(document).ready(function(){
							if ( message_text ) {
								printMessage(message_type, message_text, error_fields, fixed_message);
							}
						});
						{/literal}
					//]]>
					</script>
					
					<!-- no javascript mode -->
					{if !$smarty.const.IS_BOT}
					<noscript>
					<div class="warning">
						<div class="inner">
							<div class="icon"></div>
							<div class="message">{$lang.no_javascript_warning}</div>
						</div>
					</div>
					</noscript>
					{/if}
					<!-- no javascript mode end -->
				</div>
				
				{if $blocks.top}
				<!-- top blocks area -->
				<aside class="top">
					{foreach from=$blocks item='block'}
					{if $block.Side == 'top'}
						{include file='blocks'|cat:$smarty.const.RL_DS|cat:'blocks_manager.tpl' block=$block}
					{/if}
					{/foreach}
				<!-- top blocks area end -->
				</aside>
				{/if}
				
				<section id="controller_area">{strip}
					{if $pageInfo.Page_type == 'system'}
						{include file=$content}
					{else}
						<div class="content-padding">{$staticContent}</div>
					{/if}
				{/strip}</section>
				
				<!-- middle blocks area -->
				{if $blocks.middle}
				<aside class="middle">
					{foreach from=$blocks item='block'}
						{if $block.Side == 'middle'}
							{include file='blocks'|cat:$smarty.const.RL_DS|cat:'blocks_manager.tpl' block=$block}
						{/if}
					{/foreach}
				</aside>
				{/if}
				<!-- middle blocks area end -->
				
				{if $blocks.middle_left || $blocks.middle_right}
				<!-- middle blocks area -->
				<aside class="two-middle clearfix">
					<div class="middle-left">
						<div>
							{foreach from=$blocks item='block'}
							{if $block.Side == 'middle_left'}
								{include file='blocks'|cat:$smarty.const.RL_DS|cat:'blocks_manager.tpl' block=$block}
							{/if}
							{/foreach}
						</div>
					</div>

					<div class="middle-right">
						<div>
							{foreach from=$blocks item='block'}
							{if $block.Side == 'middle_right'}
								{include file='blocks'|cat:$smarty.const.RL_DS|cat:'blocks_manager.tpl' block=$block}
							{/if}
							{/foreach}
						</div>
					</div>
				</aside>
				<!-- middle blocks area end -->
				{/if}
				
				{if $blocks.bottom}
				<!-- bottom blocks area -->
				<aside class="bottom">
					{foreach from=$blocks item='block'}
					{if $block.Side == 'bottom'}
						{include file='blocks'|cat:$smarty.const.RL_DS|cat:'blocks_manager.tpl' block=$block}
					{/if}
					{/foreach}
				</aside>
				<!-- bottom blocks area end -->
				{/if}
			</section>
		</div>
	</section>

	<div class="header-banner-cont">
		<div class="point1">
			<div id="header-banner">
				{include file='blocks'|cat:$smarty.const.RL_DS|cat:'header_banner.tpl'}
			</div>
		</div>
	</div>
	
	<div id="push-footer"></div>
</div>

<!-- page content end -->