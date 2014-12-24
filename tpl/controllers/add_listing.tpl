<!-- add listing -->

<script type="text/javascript">flynax.qtip(); flynax.phoneField();</script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}jquery/jquery.textareaCounter.js"></script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}ckeditor/ckeditor.js"></script>

{if $config.img_crop_interface}
	<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}jquery/jquery.jcrop.js"></script>
	<script src="{$rlTplBase}js/crop.js" type="text/javascript"></script>
	
	<style type="text/css">
		@import url("{$smarty.const.RL_LIBS_URL}jquery/jcrop/jquery.Jcrop.css");
	</style>
{/if}

{rlHook name='addListingTopTpl'}

{if !$no_access}

	<!-- steps -->
	{assign var='allow_link' value=true}
	{assign var='current_found' value=false}
	<ul class="steps">
		{math assign='step_width' equation='round(100/count, 3)' count=$steps|@count}
		{foreach from=$steps item='step' name='stepsF' key='step_key'}{strip}
			{if $cur_step == $step_key || !$cur_step}{assign var='allow_link' value=false}{/if}
			<li style="width: {$step_width}%;" class="{if $cur_step}{if $cur_step == $step_key}current{assign var='current_found' value=true}{elseif !$current_found}past{/if}{elseif $smarty.foreach.stepsF.first}current{/if}">
				<a href="{if $allow_link}{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}{if $step_key == 'category'}.html?edit{else}/{$category.Path}/{$steps.$step_key.path}.html{/if}{else}?page={$pageInfo.Path}&amp;id={$category.ID}&amp;step={$steps.$step_key.path}{if $step_key == 'category'}&amp;edit{/if}{/if}{else}javascript:void(0){/if}" title="{$step.name}">{if $step.caption}<span>{$lang.step}</span> {$smarty.foreach.stepsF.iteration}{else}{$step.name}{/if}</a>
			</li>
		{/strip}{/foreach}
	</ul>
	<!-- steps -->

	<h1>{$pageInfo.name}</h1>

	{if !$cur_step}
		<!-- print sections/categories tree -->
		<div class="area_category step_area content-padding">
			{if !$sections}
				{$lang.add_listing_deny}
			{else}
				<div class="info">{$lang.add_listing_notice}</div>

				<ul class="select-type{if $sections|@count <= 1} hide{/if}">
					{foreach from=$sections item='section' name='sectionsF'}{strip}
						{if !$section.Admin_only}
							<li><label><input {if $smarty.foreach.sectionsF.first}checked="checked"{/if} type="radio" name="section" value="{$section.Key}"> {$section.name}</label></li>
						{/if}
					{/strip}{/foreach}
				</ul>

				<ul class="select-category">
					{foreach from=$sections item='section' name='sectionsF'}{strip}
						<li id="type_section_{$section.Key}" class="{if !$smarty.foreach.sectionsF.first}hide{/if}">
							{if !empty($section.Categories)}
								{include file='blocks'|cat:$smarty.const.RL_DS|cat:'category_level.tpl' categories=$section.Categories first=true}
							{else}
								<div><select disabled="disabled"><option value="">{$lang.no_items_in_sections}</option></select></div>
							{/if}
						</li>
					{/strip}{/foreach}
				</ul>

				<div class="form-buttons">
					<a id="next_step" href="javascript:void(0)" class="button disabled">{$lang.next}</a>
				</div>
				
				<script>
				var ct_selectedType = '{$smarty.session.add_listing.selected_type}';
				var ct_selectedID = '{$smarty.session.add_listing.selected_categery}';
				var ct_parentPoints = [{foreach from=$parentPoints item='parent_point' name='parentF'}'{$parent_point}'{if !$smarty.foreach.parentF.last},{/if}{/foreach}];

				{literal}
				
				$(document).ready(function(){
					treeLoadLevel();

					if ( ct_selectedType ) {
						$('ul.select-type input[value='+ct_selectedType+']').trigger('click');
					}

					$('ul.select-type input:checked').trigger('click');	
				});
				
				var treeLoadLevel = function(tpl, callback, section){

					$('ul.select-category select').unbind('change').change(function() {
						/* clear next already created dropdowns */
						$(this).parent().nextAll().remove();

						$(this).find('option[selected=selected]').attr('selected', false);
						$(this).find('option:selected').attr('selected', 'selected')
						
						/* run xajax function */
						if ( $(this).find('option:selected').attr('id') ) {
							var id = parseInt($(this).find('option:selected').attr('id').split('_')[2]);
							if ( !section ) {
								var set_section = $(this).attr('class').replace('section_', '');
							}
							else {
								var set_section = $(this).attr('class') ? $(this).attr('class').replace('section_', '') : section;
							}

							if ( $.browser.msie && $.browser.version <= 8 ) {
								set_section = trim(set_section.replace('slvzr-focus', '').replace('slvzr-hover', ''));
							}

							xajax_getCategoryLevel(id, false, tpl, callback, '', set_section);
						}
						
						/* next button handler */
						if ( $(this).find('option:selected').hasClass('disabled') ) {
							$('a#next_step').attr('href', 'javascript:void(0)').addClass('disabled');
						}
						else {
							$('a#next_step').attr('href', $(this).val()).removeClass('disabled');
						}
					});

					$('ul.select-type li input').unbind().click(function(){
						var key = $(this).val();

						$('ul.select-category > li').hide();
						$('ul.select-category > li > select:first').nextAll().remove();
						$('ul.select-category > li#type_section_'+key).show();
						$('a#next_step').attr('href', 'javascript:void(0)').addClass('disabled');
					});

					$('ul.select-category').scrollLeft(2000);

					if ( media_query != 'desktop' ) {
						$('ul.select-category li select').removeAttr('size');
					}

					if ( ct_parentPoints.length > 0 ) {
						var val = $('ul.select-category option#tree_cat_'+ct_parentPoints[0]).val();
						$('ul.select-category li#type_section_'+ct_selectedType+' select:last').val(val).trigger('change');
						ct_parentPoints.splice(0, 1);
					}
					else if ( ct_parentPoints.length == 0 ) {
						var val = $('ul.select-category option#tree_cat_'+ct_selectedID).val();
						$('ul.select-category li#type_section_'+ct_selectedType+' select:last').val(val).trigger('change');
					}

					$('ul.select-category span.tmp_info a').unbind('click').click(function(){
						$(this).parent().hide();
						$(this).parent().next().show();
					});
					$('ul.select-category span.tmp_input span.red').unbind('click').click(function(){
						$(this).parent().hide();
						$(this).parent().prev().show();
					});
				};
				
				{/literal}
				</script>
			{/if}
		</div>
		<!-- print sections/categories tree end -->
	{else}
		<!-- select a plan -->
		{if $cur_step == 'plan'}
		<div class="area_plan step_area hide">
			<form method="post" action="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}/{$category.Path}/{$steps.$cur_step.path}.html{else}?page={$pageInfo.Path}&amp;id={$category.ID}&amp;step={$steps.$cur_step.path}{/if}">
				<input type="hidden" name="step" value="plan" />

				{if $plans|@count > 5}<div class="plans-container">{/if}
				<ul class="plans{if $plans|@count > 5} more-5{else} count-{$plans|@count}{/if}">
					{foreach from=$plans item='plan' name='plansF'}{strip}
						{assign var='item_disabled' value=false}
						{if $plan.Limit > 0 && $plan.Using == 0 && $plan.Using != ''}
							{assign var='item_disabled' value=true}
						{/if}

						<li id="plan_{$plan.ID}">
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
									<input class="hide" type="radio" name="plan" value="{$plan.ID}" {if $plan.ID == $smarty.post.plan}checked="checked"{/if} />

									<label><input class="multiline" {if $plan.ID == $smarty.post.plan && ($smarty.post.listing_type == 'standard' || !$smarty.post.listing_type)}checked="checked"{/if} {if $plan.Package_ID && empty($plan.Standard_remains) && $plan.Standard_listings != 0}disabled="disabled"{/if} type="radio" name="listing_type" value="standard" /> {$lang.standard_listing} {if $plan.Standard_listings != 0}({if isset($plan.Listings_remains)}{if empty($plan.Standard_remains)}{$lang.used_up}{else}{$plan.Standard_remains}{/if}{else}{$plan.Standard_listings}{/if}){/if}</label>

									<div style="padding-top: 20px;">
										<label><input class="multiline" {if $plan.ID == $smarty.post.plan && $smarty.post.listing_type == 'featured'}checked="checked"{/if} {if $plan.Package_ID && empty($plan.Featured_remains) && $plan.Featured_listings != 0}disabled="disabled"{/if} type="radio" name="listing_type" value="featured" /> {$lang.featured_listing} {if $plan.Featured_listings != 0}({if isset($plan.Listings_remains)}{if empty($plan.Featured_remains)}{$lang.used_up}{else}{$plan.Featured_remains}{/if}{else}{$plan.Featured_listings}{/if}){/if}</label>
									</div>
								{else}
									<label {if $item_disabled}class="hint" title="{$lang.plan_limit_using_deny}"{/if}><input class="multiline" {if $item_disabled}disabled="disabled"{/if} type="radio" name="plan" value="{$plan.ID}" {if $plan.ID == $smarty.post.plan}checked="checked"{/if} /> {if $plan.Featured}{$lang.featured_listing}{else}{$lang.standard_listing}{/if}</label>
								{/if}
							</div>
						</li>
					{/strip}{/foreach}
				</ul>
				{if $plans|@count > 5}</div>{/if}
				
				<div class="form-buttons">
					<a href="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}.html?edit{else}?page={$pageInfo.Path}&amp;edit{/if}">{if $smarty.const.RL_LANG_DIR == 'ltr'}&larr;{else}&rarr;{/if} {$lang.perv_step}</a>
					<input type="submit" value="{$lang.next_step}" />
				</div>
			</form>
			
			<script type="text/javascript">
			var plans = Array();
			var selected_plan_id = 0;
			{foreach from=$plans item='plan'}
			plans[{$plan.ID}] = new Array();
			plans[{$plan.ID}]['Key'] = '{$plan.Key}';
			plans[{$plan.ID}]['Cross'] = {$plan.Cross};
			plans[{$plan.ID}]['Featured'] = {$plan.Featured};
			plans[{$plan.ID}]['Advanced_mode'] = {$plan.Advanced_mode};
			plans[{$plan.ID}]['Package_ID'] = {if $plan.Package_ID}{$plan.Package_ID}{else}false{/if};
			plans[{$plan.ID}]['Standard_listings'] = {$plan.Standard_listings};
			plans[{$plan.ID}]['Featured_listings'] = {$plan.Featured_listings};
			{/foreach}

			{literal}
	
			$(document).ready(function(){
				$('ul.plans > li > div.selector input').click(function(){
					planClickHandler($(this), true);
				});

				$('ul.plans div.frame:not(.disabled)').click(function(){
					$(this).next().find('input[type=radio]:not(.hide):first').trigger('click');
				});

				if ( $('ul.plans input[name=plan]:checked').length == 0 ) {
					$('ul.plans input[name=plan]:not(:disabled):first').attr('checked', true);
				}

				planClickHandler($('ul.plans input[name=plan]:checked'));
			});
			
			var planClickHandler = function(obj, clear){
				if ( obj.length == 0 ) return;

				if ( clear )
					$('ul.plans input').not(obj).attr('checked', false);

				selected_plan_id = obj.closest('li').attr('id').split('_')[1];
				if ( plans[selected_plan_id]['Package_ID'] || plans[selected_plan_id]['Advanced_mode'] ) {
					obj.closest('li').find('input[name=plan]').attr('checked', true);
				}
			}
			
			{/literal}
			</script>
		</div>
		{/if}
		<!-- select a plan end -->
		
		<!-- fill in form -->
		{if $cur_step == 'form'}
		<div class="area_form step_area hide">

			<form enctype="multipart/form-data" method="post" action="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}/{$category.Path}/{$steps.$cur_step.path}.html{else}?page={$pageInfo.Path}&amp;id={$category.ID}&amp;step={$steps.$cur_step.path}{/if}">
				<input type="hidden" name="step" value="form" />
				<input type="hidden" name="fromPost" value="1" />
				
				<!-- crossed categories -->
				{if $plan_info.Cross}
					<input type="hidden" name="crossed_done" value="{if $smarty.session.add_listing.crossed_done}1{/if}" />
				
					<div class="submit-cell">
						<div class="name"><span class="content-padding">{$lang.crossed_categories}</span></div>
						<div class="field">
							<div class="auth">
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
						</div>
					</div>
					
					<script type="text/javascript">
					var plans = Array();
					var selected_plan_id = {if $smarty.session.add_listing.plan_id}{$smarty.session.add_listing.plan_id}{else}0{/if};
					var ca_post = {if $crossed}[{foreach from=$crossed item='crossed_cat' name='crossedF'}['{$crossed_cat}']{if !$smarty.foreach.crossedF.last},{/if}{/foreach}]{else}false{/if};
					var cc_parentPoints = {if $parentPoints}[{foreach from=$parentPoints item='parent_point' name='parentF'}['{$parent_point}']{if !$smarty.foreach.parentF.last},{/if}{/foreach}]{else}false{/if};

					{foreach from=$plans item='plan'}
					plans[{$plan.ID}] = new Array();
					plans[{$plan.ID}]['Key'] = '{$plan.Key}';
					plans[{$plan.ID}]['Cross'] = {$plan.Cross};
					{/foreach}
					
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
				
				<div class="content-padding">
					{rlHook name='addListingPreFields'}

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
				</div>
				
				<script type="text/javascript">
				{literal}
					
				$(document).ready(function(){
					flynax.mlTabs();
					{/literal}{if $config.address_on_map}flynax.onMapHandler();{/if}{literal}
					flynaxTpl.locationHandler();
				});

				{/literal}
				</script>
				
				<!-- login/sing up form -->
				{if $config.add_listing_without_reg && !$isLogin}
					<div class="submit-cell">
						<div class="name"><div class="content-padding">{$lang.authorization}</div></div>
						<div class="field light-inputs">
							<div class="auth">{strip}
								<div class="cell">
									<div>
										<div class="caption">{$lang.sign_in}</div>

										<div class="name">{$lang.username}</div>
										<input class="w180" type="text" name="login[username]" maxlength="25" value="{$smarty.post.login.username}" />

										<div class="name">{$lang.password}</div>
										<input class="w180" type="password" name="login[password]" maxlength="25" />

										<div style="padding-top: 15px;">{$lang.forgot_pass} <a target="_blank" title="{$lang.remind_pass}" href="{$rlBase}{if $config.mod_rewrite}{$pages.remind}.html{else}?page={$pages.remind}{/if}">{$lang.remind}</a></div>
									</div>
								</div>
								<div class="divider">{$lang.or}</div>
								<div class="cell">
									<div>
										<div class="caption">{$lang.sign_up}</div>

										<div class="name">{$lang.your_name}</div>
										<input class="w180" type="text" name="register[name]" maxlength="100" value="{$smarty.post.register.name}" />

										<div class="name">{$lang.your_email}</div>
										<input class="w180" type="text" name="register[email]" maxlength="150" value="{$smarty.post.register.email}"  />
									</div>
								</div>
							{/strip}</div>
						</div>
					</div>
					
					<script type="text/javascript">
					{literal}
					
					$(document).ready(function(){
						$('input[name="register[name]"],input[name="register[email]"]').keydown(function(){
							$('input[name="login[username]"],input[name="login[password]"]').val('');
						});
						$('input[name="login[username]"],input[name="login[password]"]').keydown(function(){
							$('input[name="register[name]"],input[name="register[email]"]').val('');
						});
					});
					
					{/literal}
					</script>
				{/if}
				<!-- login/sing up form end -->

				{if $config.security_img_add_listing}
				<div class="submit-cell">
					<div class="name">{$lang.security_code}</div>
					<div class="field">{include file='captcha.tpl' no_caption=true}</div>
				</div>
				{/if}
				
				<span class="form-buttons form">
					<a href="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}/{$category.Path}/{$steps.plan.path}.html{else}?page={$pageInfo.Path}&amp;id={$category.ID}&amp;step={$steps.plan.path}{/if}">{if $smarty.const.RL_LANG_DIR == 'ltr'}&larr;{else}&rarr;{/if} {$lang.perv_step}</a>
					<input type="submit" value="{$lang.next_step}" />
				</span>
			</form>
		</div>
		{/if}
		<!-- fill in form end -->
		
		<!-- add photo -->
		{if $cur_step == 'photo'}
		<div class="area_photo step_area hide content-padding">
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'photo_manager.tpl'}
			
			<!-- file crop -->
			<div id="width_detect"></div>
			<div id="crop_block" class="hide">
				{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id='crop_area' name=$lang.photo_cropping}
			
				<div>{$lang.crop_notice}</div>
				<div id="crop_obj" style="padding: 10px 0;"></div>
			
				<input type="button" class="button" value="{$lang.rl_accept}" id="crop_accept" /> 
				<a class="close" id="crop_cancel" href="">{$lang.cancel}</a>
			
				{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}
			</div>
			<!-- file crop end -->

			<form method="post" onsubmit="return submit_photo_step();" action="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}/{$category.Path}/{$steps.$cur_step.path}.html{else}?page={$pageInfo.Path}&amp;id={$category.ID}&amp;step={$steps.$cur_step.path}{/if}">
				<input type="hidden" name="step" value="photo" />

				<div class="form-buttons">
				<a href="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}/{$category.Path}/{$prev_step.path}.html{else}?page={$pageInfo.Path}&amp;id={$category.ID}&amp;step={$prev_step.path}{/if}">{if $smarty.const.RL_LANG_DIR == 'ltr'}&larr;{else}&rarr;{/if} {$lang.perv_step}</a>
				<input type="submit" value="{$lang.next_step}" />
			</div>
			</form>
		</div>
		{/if}
		<!-- add photo end -->
		
		<!-- add video -->
		{if $cur_step == 'video'}
		<div id="area_video" class="area_video step_area hide content-padding">

			<div id="video_upload_dom">
				{include file='blocks'|cat:$smarty.const.RL_DS|cat:'video_upload.tpl'}
			</div>
			
			{if $videos}
				<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}player/flowplayer.js"></script>
				<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}jquery/jquery.fancybox.js"></script>
				<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}jquery/fancybox/helpers/jquery.fancybox-buttons.js"></script>
			
				{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id='uploadList' name=$lang.listing_video tall=true}
					{assign var='replace' value=`$smarty.ldelim`key`$smarty.rdelim`}
					<ul class="thumbnails inline">
					{foreach from=$videos item='video'}{strip}
						<li id="video_{$video.ID}" class="active">
							{if $video.Type == 'local'}
								<img class="item cursor-move" style="background-image: url({$smarty.const.RL_FILES_URL}{$video.Preview})" src="{$rlTplBase}img/blank.gif" alt="" />
								<script type="text/javascript">//<![CDATA[
								{literal}
	
								$('#video_{/literal}{$video.ID}{literal} img.item').fancybox({
									padding: 10,
									width: {/literal}{$config.video_width}{literal},
									height: {/literal}{$config.video_height}{literal},
									content: '<a href="{/literal}{$smarty.const.RL_FILES_URL}{$video.Video}{literal}" style="display:block;width:{/literal}{$config.video_width}{literal}px;height:{/literal}{$config.video_height}{literal}px;" id="player"></a>',
									afterShow:	function(){
										flowplayer('player', rlConfig['libs_url']+'player/flowplayer-3.2.7.swf', {
											wmode: 'transparent',
											plugins: {
										        pseudo: {
										            url: rlConfig['libs_url']+'player/flowplayer.pseudostreaming-3.2.9.swf'
										        }
	    									},
	    									 clip: {
										        provider: 'pseudo',
										        url: '{/literal}{$smarty.const.RL_FILES_URL}{$video.Video}{literal}'
										    }
										});
									},
									afterClose: function(){
										$f().stop();
									},
									helpers: {
										media : {},
										overlay: {
											opacity: 0.5
										}
									}
								});
								
								{/literal}
								</script>
							{else}
								<a class="youtube fancybox.iframe" href="http://www.youtube.com/embed/{$video.Preview}?autoplay=1"><img class="item" style="background-image: url(http://img.youtube.com/vi/{$video.Preview}/mqdefault.jpg)" src="{$rlTplBase}img/blank.gif" alt="" /></a>
							{/if}
							<img src="{$rlTplBase}img/blank.gif" class="delete" alt="{$lang.delete}" title="{$lang.delete}" />
						</li>
					{/strip}{/foreach}
					</ul>
					<div class="clear"></div>
				{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}
			{/if}
			
			<script type="text/javascript">//<![CDATA[
			var video_listing_id = {$smarty.session.add_listing.listing_id};
			var sort_save = false;
			{literal}
			
			/* preview video handler */
			if ( $('ul.thumbnails > li > a.youtube').length ) {
				$('ul.thumbnails > li > a.youtube').fancybox({
					padding: 10,
					width: {/literal}{$config.video_width}{literal},
					height: {/literal}{$config.video_height}{literal},
					helpers: {
						media : {},
						overlay: {
							opacity: 0.5
						}
					}
				});
			}
			
			/* delete video handler */
			$('#area_video ul.thumbnails img.delete').each(function(){
				$(this).flModal({
					caption: '{/literal}{$lang.warning}{literal}',
					content: '{/literal}{$lang.delete_confirm}{literal}',
					prompt: 'xajax_deleteVideo('+ $(this).parent().attr('id').split('_')[1] +', "'+ $(this).parent().attr('id') +'")',
					width: 'auto',
					height: 'auto'
				});
			});
			
			$('div#area_video ul.thumbnails').sortable({
				placeholder: 'hover',
				stop: function(event, obj){
					/* save sorting */
					var sort = '';
					var count = 0;
					$('div#area_video ul.thumbnails li').each(function(){
						var id = $(this).attr('id').split('_')[1];
						count++;
						var pos = $('div#area_video ul.thumbnails li').index($(this))+1;
						sort += id+','+pos+';';
					});
					
					if ( sort.length > 0 && count > 1 && sort_save != sort )
					{
						sort_save = sort;
						sort = rtrim(sort, ';');
						xajax_reorderVideo(video_listing_id, sort);
					}
				}
			});
			
			{/literal}
			//]]>
			</script>
			
			<form method="post" action="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}/{$category.Path}/{$steps.$cur_step.path}.html{else}?page={$pageInfo.Path}&amp;id={$category.ID}&amp;step={$steps.$cur_step.path}{/if}">
				<input type="hidden" name="step" value="video" />
				<input type="hidden" name="redirect" value="1" />
				<table class="submit">
				<tr>
					<td class="name button"><a href="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}/{$category.Path}/{$prev_step.path}.html{else}?page={$pageInfo.Path}&amp;id={$category.ID}&amp;step={$prev_step.path}{/if}" class="dark_12">{if $smarty.const.RL_LANG_DIR == 'ltr'}&larr;{else}&rarr;{/if} {$lang.perv_step}</a></td>
					<td class="field button"><input type="submit" value="{$lang.next_step}" /></td>
				</tr>
				</table>
			</form>
		</div>
		{/if}
		<!-- add video end -->
		
		<!-- checkout -->
		{if $cur_step == 'checkout'}
		<div class="area_checkout step_area hide content-padding">

			<div style="padding-bottom: 5px;">{$lang.checkout_step_info}</div>
			
			<form method="post" action="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}/{$category.Path}/{$steps.$cur_step.path}.html{else}?page={$pageInfo.Path}&amp;id={$category.ID}&amp;step={$steps.$cur_step.path}{/if}">
				<input type="hidden" name="step" value="checkout" />
				
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
			
				<table class="submit">
				<tr>
					<td class="name button"><a href="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}/{$category.Path}/{$prev_step.path}.html{else}?page={$pageInfo.Path}&amp;id={$category.ID}&amp;step={$prev_step.path}{/if}" class="dark_12">{if $smarty.const.RL_LANG_DIR == 'ltr'}&larr;{else}&rarr;{/if} {$lang.perv_step}</a></td>
					<td class="field button"><input type="submit" value="{$lang.next_step}" /></td>
				</tr>
				</table>
			</form>
			
			<script type="text/javascript">
				flynax.paymentGateway();
			</script>
		</div>
		{/if}
		<!-- checkout end -->

		{rlHook name='addListingStepActionsTpl'}

		<!-- done -->
		{if $cur_step == 'done'}
		<div class="area_done step_area hide content-padding">
			<div class="text-notice">{if $config.listing_auto_approval}{$lang.notice_after_listing_adding_auto}{else}{$lang.notice_after_listing_adding}{/if}</div>
			{assign var='replace' value='<a href="'|cat:$return_link|cat:'">$1</a>'}
			{$lang.add_one_more_listing|regex_replace:'/\[(.*)\]/':$replace}
		</div>
		{/if}
		<!-- done end -->
	{/if}

	<script type="text/javascript">
	{if $cur_step}
		flynax.switchStep('{$cur_step}');
	{/if}
	</script>

{else}
	<ul>
	{foreach from=$errors item='error'}
		<li>{$error}</li>
	{/foreach}
	</ul>
{/if}

{rlHook name='addListingBottomTpl'}

<!-- add listing end -->