<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="{$smarty.const.RL_LANG_CODE|lower}">
<head>

<title>{foreach from=$title item='title_item' name='titleF'}{if $smarty.foreach.titleF.first}{$title_item}{else} &#171; {$title_item}{/if}{/foreach}</title>

<meta http-equiv="X-UA-Compatible" content="IE=9" />
<meta name="generator" content="Flynax Classifieds Software" />
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1" />

<meta name="description" content="{$pageInfo.meta_description|strip_tags}" />
<meta name="Keywords" content="{$pageInfo.meta_keywords|strip_tags}" />

<link rel="stylesheet" href="{$rlTplBase}css/style.css" />
{if $pageInfo.Controller == 'listing_details'}
	<link rel="stylesheet" href="{$rlTplBase}css/fancybox.css" />
{/if}
<link rel="stylesheet" href="{$rlTplBase}css/jquery.ui.css" />
<link rel="shortcut icon" href="{$rlTplBase}img/favicon.ico" />

{if $pageInfo.canonical}
<link rel="canonical" href="{$pageInfo.canonical}" />
{/if}

<!--[if lt IE 9]>
<script src="{$rlTplBase}js/ie/css3-mediaqueries.js"></script>
<script src="{$rlTplBase}js/ie/html5shiv.js"></script>
<script src="{$rlTplBase}js/ie/selectivizr-min.js"></script>
<![endif]-->

<link href='http://fonts.googleapis.com/css?family=Alegreya+Sans:300,400,500&subset=latin,latin-ext' rel='stylesheet' type='text/css'>

{if $smarty.const.RL_LANG_DIR == 'rtl'}
	<link rel="stylesheet" href="{$rlTplBase}css/rtl.css" />
	{assign var='text_dir' value='right'}
	{assign var='text_dir_rev' value='left'}
{else}
	{assign var='text_dir' value='left'}
	{assign var='text_dir_rev' value='right'}
{/if}

{if $rss}
	<link rel="alternate" type="application/rss+xml" title="{$rss.title}" href="{$rlBase}{if $config.mod_rewrite}{$pages.rss_feed}/{if $rss.item}{$rss.item}/{/if}{if $rss.id}{$rss.id}/{/if}{else}?page={$pages.rss_feed}{if $rss.item}&amp;item={$rss.item}{/if}{if $rss.id}&amp;id={$rss.id}{/if}{/if}" />
{/if}

<script src="{$smarty.const.RL_LIBS_URL}jquery/jquery.js"></script>

<script src="{$smarty.const.RL_LIBS_URL}javascript/flynax.lib.js"></script>
<script src="{$smarty.const.RL_LIBS_URL}jquery/jquery.ui.js"></script>
<script src="{$smarty.const.RL_LIBS_URL}jquery/datePicker/i18n/ui.datepicker-{$smarty.const.RL_LANG_CODE|lower}.js"></script>

{rlHook name='tplHeaderCommon'}

{include file='js_config.tpl'}

<script src="{$rlTplBase}js/lib.js"></script>

{rlHook name='tplHeader'}

{$ajaxJavascripts}

</head>
<body class="{if $pageInfo.Key == 'home'}home-page{/if}{if !$blocks.left || $pageInfo.Controller == 'listing_details'} no-sidebar{/if}{if $bread_crumbs|@count > 2 && $pageInfo.Key != 'home'} bc-exists{/if}" {if $smarty.const.RL_LANG_DIR == 'rtl'}dir="rtl"{/if}>
	<header>
		<section class="point1">
			<div id="logo">
				<a href="{$rlBase}" title="{$config.site_name}">
					<img alt="{$config.site_name}" src="{$rlTplBase}img/blank.gif" />
				</a>
			</div>

			<div id="top-navigation" class="clearfix">
				{include file='blocks'|cat:$smarty.const.RL_DS|cat:'user_navbar.tpl'}
				{include file='blocks'|cat:$smarty.const.RL_DS|cat:'lang_selector.tpl'}

				{rlHook name='tplHeaderUserNav'}
			</div>

			{rlHook name='tplHeaderNav'}
		</section>
		<section class="main-menu">
			<nav class="point1 clearfix">
				<div class="kw-search angel-gradient-light">
					{strip}
					<span class="lens"><span></span></span>
				 	<span class="field">
						<form method="post" action="{$rlBase}{if $config.mod_rewrite}{$pages.search}.html{else}?page={$pages.search}{/if}">
							<input type="hidden" name="form" value="keyword_search" />
							{assign var='ks_phrase' value='blocks+name+keyword_search'}
							<input placeholder="{$lang.$ks_phrase}" id="autocomplete" type="text" maxlength="255" name="f[keyword_search]" {if $smarty.post.f.keyword_search}value="{$smarty.post.f.keyword_search}"{/if}/>
						</form>
					</span>
					{/strip}
					<span class="close"></span>
					
					<script>
						var ac_php = '{$rlTplBase}request.ajax.php';
						var view_details = '{$lang.view_details}';
						var join_date = '{$lang.join_date}';
						var category_phrase = '{$lang.category}';
					</script>
				</div>
				
				{include file='menus'|cat:$smarty.const.RL_DS|cat:'main_menu.tpl'}
			</nav>
		</section>
	</header>