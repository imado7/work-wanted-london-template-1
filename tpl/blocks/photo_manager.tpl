<!-- photos manager -->

<div class="info">{$lang.max_file_size_caption} <b>{$max_file_size} MB</b></div>
				
{assign var='width' value=$config.pg_upload_thumbnail_width+4}
{assign var='height' value=$config.pg_upload_thumbnail_height-50+4}
{assign var='replace' value=`$smarty.ldelim`count`$smarty.rdelim`}

<div id="fileupload">
	<form action="{$smarty.const.RL_LIBS_URL}upload/account.php" method="post" enctype="multipart/form-data">
		<span class="files canvas"></span>
		<span title="{$lang.add_photo}" class="draft fileinput-button">
			<span class="icon"></span>
			<span class="title">{$lang.add_photo}</span>
			{if $allowed_photos}<span class="allowed">{$lang.allowed_count|replace:$replace:$allowed_photos}</span>{/if}
			<input type="file" name="files[]" multiple />
		</span>

		{if !$config.img_auto_upload}
			<div><input type="button" class="start" value="{$lang.upload}" /></div>
		{/if}
	</form>
</div>

<style type="text/css">
div#fileupload span.hover
{literal}{{/literal}
	width: {if $config.pg_upload_thumbnail_width}{$config.pg_upload_thumbnail_width}{else}120{/if}px;
	height: {if $config.pg_upload_thumbnail_height}{$config.pg_upload_thumbnail_height}{else}90{/if}px;
{literal}}{/literal}
</style>

{literal}
<!-- The template to display files available for upload -->
<script id="template-upload" type="text/x-tmpl">
{% for (var i=0, file; file=o.files[i]; i++) { %}
	<span class="template-upload fade item active">
		<span class="preview"><span class="fade"></span></span><span class="start"></span>
		<span class="progress progress-success progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="bar" style="width:0%;"></div></span>
		<div class="photo_navbar">
			<img src="{/literal}{$rlTplBase}{literal}img/blank.gif" class="cancel" alt="{/literal}{$lang.delete}{literal}" title="{/literal}{$lang.delete}{literal}" />
		</div>
	</span>
{% } %}
</script>
<!-- The template to display files available for download -->
<script id="template-download" type="text/x-tmpl">
{% for (var i=0, file; file=o.files[i]; i++) { %}
	<span class="template-download fade item active">
		<img class="thumbnail" src="{%=file.thumbnail_url%}" />
		<div class="photo_navbar" id="navbar_{%=file.id%}">
			<span class="primary">
				<input onclick="xajax_makeMain({%=file.listing_id%}, {%=file.id%})" title="{% if (!file.primary) { %}{/literal}{$lang.set_primary}{literal}{% } else { %} {/literal}{$lang.primary}{literal} {% } %}" class="default" {% if (file.primary) { %}checked="checked"{% } %} type="radio" name="primary" />
			</span>
			<input class="hide" type="text" name="description" value="{%=file.description%}" />
			{% if ( file.is_crop ) { %}<img id="crop_photo_{%=file.id%}" dir="{%=file.original%}" title="{/literal}{$lang.crop_photo}{literal}" src="{/literal}{$rlTplBase}{literal}img/blank.gif" class="crop" alt="" />{% } %}
			<img title="{/literal}{$lang.manage_description}{literal}" src="{/literal}{$rlTplBase}{literal}img/blank.gif" class="manage" alt="" />
			<img data-type="{%=file.delete_type%}" data-url="{%=file.delete_url%}" src="{/literal}{$rlTplBase}{literal}img/blank.gif" class="delete" alt="{/literal}{$lang.delete}{literal}" title="{/literal}{$lang.delete}{literal}" />
		</div>
	</span>
{% } %}
</script>
{/literal}

<div id="manage_photo_dom" class="hide">
	<div class="manage-photo light-inputs">
		<div class="two-inline">
			<div><input name="photo-desc-save" type="button" value="{$lang.save}" /></div>
			<div style="padding-{$text_dir_rev}: 15px;"><input style="width: 100%;" placeholder="{$lang.description}" name="photo-desc" type="text" value="" /></div>
		</div>
	</div>
</div>

<script type="text/javascript">
var photo_allowed = {if $plan_info.Image_unlim}undefined{else}{if $plan_info.Image}{$plan_info.Image}{else}0{/if}{/if};
var photo_client_max_size = 10*1024*1024;
var photo_max_size = {if $max_file_size}{$max_file_size|regex_replace:'/[\D]/':''}{else}2{/if}*1024*1024;
var photo_width = {if $config.pg_upload_thumbnail_width}{$config.pg_upload_thumbnail_width}{else}120{/if};
var photo_height = {if $config.pg_upload_thumbnail_height}{$config.pg_upload_thumbnail_height}{else}90{/if};
var photo_orig_width = {if $config.pg_upload_large_width}{$config.pg_upload_large_width}{else}800{/if};
var photo_orig_height = {if $config.pg_upload_large_height}{$config.pg_upload_large_height}{else}600{/if};
var photo_auto_upload = {if $config.img_auto_upload}true{else}false{/if};
var photo_listing_id = {if $listing_id}{$listing_id}{else}{$smarty.session.add_listing.listing_id}{/if};
var photo_user_crop = {if $config.img_crop_interface}true{else}false{/if};
var sort_save = false;
lang['error_maxFileSize'] = "{$lang.error_maxFileSize}";
lang['error_acceptFileTypes'] = "{$lang.error_acceptFileTypes}";
lang['uploading_completed'] = "{$lang.uploading_completed}";
lang['upload'] = "{$lang.upload}";
lang['picture_preparing'] = "{$lang.picture_preparing}";
lang['upload_file'] = "{if $lang.upload_file}{$lang.upload_file}{else}File:{/if}";
lang['upload_no_preview_available'] = "{if $lang.upload_no_preview_available}{$lang.upload_no_preview_available}{else}No preview available<br /> in IE browsers{/if}";
var ph_empty_error = "{$lang.crop_empty_coords}";
var ph_too_small_error = "{$lang.crop_too_small}";
</script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}upload/jquery.ui.widget.js"></script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}upload/tmpl.min.js"></script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}upload/load-image.min.js"></script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}upload/canvas-to-blob.min.js"></script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}upload/bootstrap.min.js"></script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}upload/jquery.iframe-transport.js"></script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}upload/jquery.fileupload.js"></script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}upload/jquery.fileupload-fp.js"></script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}upload/jquery.fileupload-ui.js"></script>
<script type="text/javascript" src="{$smarty.const.RL_LIBS_URL}upload/main.js"></script>
<script>
{literal}
var managePhotoDesc = function(){
	$('#fileupload div.photo_navbar img.manage').each(function(){
		var nav = $(this).closest('div.photo_navbar');
		var id = nav.attr('id').split('_')[1];

		$(this).unbind('click').flModal({
			source: '#manage_photo_dom',
			caption: lang['manage'],
			width: 450,
			height: 'auto',
			ready: function(){
				var value = nav.find('input[name=description]').val();

				$('input[name=photo-desc]').val(value);
				$('input[name=photo-desc-save]').click(function(){
					var new_desc = $('input[name=photo-desc]').val();
					xajax_editDesc(id, new_desc);

					nav.find('input[name=description]').val(new_desc);
					$('#modal_block div.close').trigger('click');
				});
			}
		});
	});
	$("#fileupload span.files").sortable({
		items: 'span.item:not(.template-upload)',
		placeholder: 'hover',
		handle: 'img.thumbnail',
		start: function(event, obj){
			$(obj.item).find('div.photo_navbar').hide();
		},
		stop: function(event, obj){
			$(obj.item).find('div.photo_navbar').show();
			/* save sorting */
			var sort = '';
			var count = 0;
			$('#fileupload span.files span.template-download div.photo_navbar').each(function(){
				var id = $(this).attr('id').split('_')[1];
				count++;
				var pos = $('#fileupload span.files span.item').index($(this).parent())+1;
				sort += id+','+pos+';';
			});
			
			if ( sort.length > 0 && count > 1 && sort_save != sort )
			{
				sort_save = sort;
				sort = rtrim(sort, ';');
				xajax_reorderPhoto(photo_listing_id, sort);
			}
		}
	});
};
{/literal}
</script>

<!-- photos manager end -->