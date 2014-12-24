<!-- add listing photo -->

{rlHook name='addPhotoTop'}

<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}jquery/jquery.jcrop.js"></script>
<script src="{$rlTplBase}js/crop.js" type="text/javascript"></script>

<style type="text/css">
@import url("{$smarty.const.RL_LIBS_URL}jquery/jcrop/jquery.Jcrop.css");
</style>

<div class="content-padding">
	{if $listing.fields}
		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id='photo_listing_details' name=$lang.listing_details tall=true}

		<a class="link-large" target="_blank" href="{$rlBase}{if $config.mod_rewrite}{$pages[$listing_type.Page_key]}/{$listing.Category_path}/{str2path string=$listing.listing_title}-{$listing.ID}.html{else}?page={$pages[$listing_type.Page_key]}&amp;id={$listing.ID}{/if}">{if $listing.listing_title}{$listing.listing_title}{else}{assign var='phrase' value='pages+title+view_details'}{$lang.$phrase}{/if}</a>

		<table class="table" style="margin-top: 10px;">
		{foreach from=$listing.fields item='field' name='detailsF'}
		<tr>
			<td class="name"><div><span>{$field.name}</span></div></td>
			<td class="value">{$field.value}</td>
		</tr>
		{/foreach}
		</table>
		
		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}
	{/if}
	
	{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id='crop_area' name=$lang.pictures_manager}
	{include file='blocks'|cat:$smarty.const.RL_DS|cat:'photo_manager.tpl'}
	{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}

	<!-- file crop -->
	<div id="width_detect"></div>
	<div id="crop_block" class="hide">
		<div style="margin: 15px 0 0;"></div>
		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id='crop_area' name=$lang.photo_cropping}
	
		<div class="dark">{$lang.crop_notice}</div>
		<div id="crop_obj" style="padding: 10px 0;"></div>
	
		<input type="button" class="button" value="{$lang.rl_accept}" id="crop_accept" /> 
		<a class="close" id="crop_cancel" href="">{$lang.cancel}</a>
	
		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}
	</div>
	<!-- file crop end -->
</div>

{rlHook name='addPhotoBottom'}

<!-- add listing photo end -->