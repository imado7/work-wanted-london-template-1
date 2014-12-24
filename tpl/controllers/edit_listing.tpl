<!-- edit listing -->

{rlHook name='editListingTop'}

<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}jquery/numeric.js"></script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}jquery/jquery.qtip.js"></script>
<script type="text/javascript">flynax.qtip(); flynax.phoneField();</script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}jquery/jquery.textareaCounter.js"></script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}ckeditor/ckeditor.js"></script>

<!-- listing fieldset -->
{if !empty($form)}
<div class="content-padding">
	<form method="post" action="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}.html?id={$smarty.get.id}{else}?page={$pageInfo.Path}&amp;id={$smarty.get.id}{/if}" enctype="multipart/form-data">
		<input type="hidden" name="action" value="edit" />
		<input type="hidden" name="fromPost" value="1" />
		
		<!-- crossed categories -->
		{if $plan_info.Cross}
			<input type="hidden" name="crossed_done" value="{if $smarty.session.edit_listing.crossed_done}1{/if}" />
		
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id='crossed' name=$lang.crossed_categories}
			<div class="auth" style="margin-top: 0;">
				<div style="padding: 0 0 10px 0;">
					<div class="dark" id="cc_text">{$lang.crossed_top_text|replace:'[number]':'<b id="cc_number"></b>'}</div>
					<div class="dark hide" id="cc_text_denied">{$lang.crossed_top_text_denied}</div>
				</div>
				
				<!-- print sections/categories tree -->
				<div id="crossed_tree" class="tree{if $smarty.post.crossed_done} hide{/if}">
				{foreach from=$sections item='section'}
					{if !$section.Admin_only}
						{assign var='type_page_key' value='lt_'|cat:$section.Key}
						{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' name=$section.name}
						
						{if !empty($section.Categories)}
							{include file='blocks'|cat:$smarty.const.RL_DS|cat:'category_level_crossed.tpl' categories=$section.Categories first=true}
						{else}
							<div class="dark">{$lang.no_items_in_sections}</div>
						{/if}
					
						{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}
					{/if}
				{/foreach}
				</div>
				<!-- print sections/categories tree end -->
				
				<ul class="hide" id="crossed_selected"><li class="first dark"><b>{$lang.selected_crossed_categories}</b></li></ul>
				<input id="crossed_button" type="button" value="{if $smarty.post.crossed_done}{$lang.manage}{else}{$lang.done}{/if}" />
			</div>
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}
			
			<script type="text/javascript">
			var plans = Array();
			var selected_plan_id = {if $plan_info.ID}{$plan_info.ID}{else}0{/if};
			var ca_post = {if $crossed}[{foreach from=$crossed item='crossed_cat' name='crossedF'}['{$crossed_cat}']{if !$smarty.foreach.crossedF.last},{/if}{/foreach}]{else}false{/if};
			var cc_parentPoints = {if $parentPoints}[{foreach from=$parentPoints item='parent_point' name='parentF'}['{$parent_point}']{if !$smarty.foreach.parentF.last},{/if}{/foreach}]{else}false{/if};

			plans[{$plan_info.ID}] = new Array();
			plans[{$plan_info.ID}]['Key'] = '{$plan_info.Key}';
			plans[{$plan_info.ID}]['Cross'] = {$plan_info.Cross};
			
			{literal}
			
			$(document).ready(function(){
				flynax.treeLoadLevel('crossed', 'crossedTree');
				crossedTree(true, true);
			});
			
			{/literal}
			</script>
			<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}javascript/crossed.js"></script>
		{/if}
		<!-- crossed categories end -->
		
		<!-- plan info -->
		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id='plan_information' name=$lang.plan_detals}
		
		<div class="table-cell">
			<div class="name"><div><span>{$lang.plan}</span></div></div>
			<div class="field">{$plan_info.name} / <a href="{$rlBase}{if $config.mod_rewrite}{$pages.upgrade_listing}.html?id={$smarty.get.id}{else}?page={$pages.upgrade_listing}&amp;id={$smarty.get.id}{/if}">{$lang.change}</a></div>
		</div>
		<div class="table-cell">
			<div class="name"><div><span>{$lang.category}</span></div></div>
			<div class="field">
				<span id="change_category_origin">
					<span>{$category.name}</span> {if $categories_list}/ <a class="brown_12" href="javascript:void(0);">{$lang.change}</a>{/if}
				</span>
				{if $categories_list}
					<span id="change_category_options" class="hide">						
						<select name="edit_category">
							{foreach from=$categories_list item='option'}
								<option {if $option.ID == $category.ID}selected="selected"{/if} {if $option.Lock}disabled="disabled"{/if} style="padding-{$text_dir}: {$option.margin}px;" value="{$option.ID}">{$lang[$option.pName]}{if $option.Lock} ({$lang.locked}){/if}</option>
							{/foreach}
						</select>
						
						<input id="apply_category_changes" class="low" type="button" value="{$lang.change}" />
						<span class="cancel red margin">{$lang.cancel}</span>
					</span>
					
					<script type="text/javascript">
					{literal}
					
					$(document).ready(function(){
						$('#change_category_origin a').click(function(){
							$('#change_category_origin').fadeOut('fast', function(){
								$('#change_category_options').fadeIn();
							});
						});
						$('#change_category_options span.cancel').click(function(){
							$('#change_category_options').fadeOut('fast', function(){
								$('#change_category_origin').fadeIn();
								$('select[name=edit_category] option[selected=selected]').attr('selected', true);
							});
						});
						
						$('#apply_category_changes').flModal({
							caption: '{/literal}{$lang.notice}{literal}',
							content: '{/literal}{$lang.notice_change_listing_category}{literal}',
							prompt: 'xajax_changeListingCategory({/literal}{$listing_data.ID}{literal}, $("select[name=edit_category] option:selected").val());$("#apply_category_changes").val("'+lang['loading']+'");',
							width: 'auto',
							height: 'auto'
						});
					});
					
					{/literal}
					</script>
				{/if}
			</div>
		</div>
		{if $listing_type.Photo && ($plan_info.Image || $plan_info.Image_unlim)}
		<div class="table-cell">
			<div class="name"><div><span>{$lang.listing_photos}</span></div></div>
			<div class="field">{if $plan_info.Image_unlim}{$lang.unlimited}{else}{$plan_info.Image}{/if} / <a class="brown_12" href="{$rlBase}{if $config.mod_rewrite}{$pages.add_photo}.html?id={$smarty.get.id}{else}?page={$pages.add_photo}&amp;id={$smarty.get.id}{/if}">{$lang.manage_photos}</a></div>
		</div>
		{/if}
		{if $listing_type.Video && ($plan_info.Video || $plan_info.Video_unlim)}
		<div class="table-cell">
			<div class="name"><div><span>{$lang.listing_video}</span></div></div>
			<div class="field">{if $plan_info.Video_unlim}{$lang.unlimited}{else}{$plan_info.Video}{/if} / <a class="brown_12" href="{$rlBase}{if $config.mod_rewrite}{$pages.add_video}.html?id={$smarty.get.id}{else}?page={$pages.add_video}&amp;id={$smarty.get.id}{/if}">{$lang.manage_video}</a></div>
		</div>
		{/if}

		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}
		<!-- plan info end -->
		
		{rlHook name='editListingPreFields'}
		
		{foreach from=$form item='group'}
		{if $group.Group_ID}
			{if $group.Fields && $group.Display}
				{assign var='hide' value=false}
			{else}
				{assign var='hide' value=true}
			{/if}

			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id=$group.Key name=$lang[$group.pName]}
			{if $group.Fields}
				{include file='blocks'|cat:$smarty.const.RL_DS|cat:'field.tpl' fields=$group.Fields}
			{else}
				{$lang.no_items_in_group}
			{/if}
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}
		{else}
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'field.tpl' fields=$group.Fields}
		{/if}
		{/foreach}

		{if $config.security_img_edit_listing}
			<div class="submit-cell">
				<div class="name">{$lang.security_code}</div>
				<div class="field">{include file='captcha.tpl' no_caption=true}</div>
			</div>
		{/if}

		<div class="submit-cell buttons">
			<div class="name"></div>
			<div class="field"><input type="submit" value="{$lang.edit}" /></div>
		</div>
	</form>
</div>
{/if}

<script type="text/javascript">
{literal}
$(document).ready(function(){
	$("input.numeric").numeric();
	
	flynax.mlTabs();
	{/literal}{if $config.address_on_map}flynax.onMapHandler();{/if}{literal}
	flynaxTpl.locationHandler();
});
{/literal}
</script>

{rlHook name='editListingBottomTpl'}

<!-- edit listing end -->