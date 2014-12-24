<!-- add listing video -->

<div class="content-padding" id="area_video">
	{rlHook name='addVideoTop'}
	
	{if $listing.Plan_video || $listing.Video_unlim}
	
		{if $listing.fields}
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id='video_listing_details' name=$lang.listing_details tall=true}
			
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
				{foreach from=$videos item='video'}
					<li id="video_{$video.ID}" class="active">
						{if $video.Type == 'local'}
							<img class="item cursor-move" src="{$smarty.const.RL_FILES_URL}{$video.Preview}" alt="" />
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
							<a class="youtube fancybox.iframe" href="http://www.youtube.com/embed/{$video.Preview}?autoplay=1"><img class="item cursor-move" src="{$l_youtube_thumbnail|replace:$replace:$video.Preview}" alt="" /></a>
						{/if}
						<div class="video_navbar">
							<span class="delete icon" title="{$lang.delete}"></span>
						</div>
					</li>
				{/foreach}
				</ul>
				<div class="clear"></div>
			{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}
		{/if}
		
		<script type="text/javascript">//<![CDATA[
		var video_listing_id = {$listing.ID};
		var sort_save = false;
		{literal}
		
		/* preview video handler */
		if ( $('ul.thumbnails > li > a.youtube').length > 0 ) {
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
		$('#area_video ul.thumbnails .delete').each(function(){
			$(this).flModal({
				caption: '{/literal}{$lang.warning}{literal}',
				content: '{/literal}{$lang.delete_confirm}{literal}',
				prompt: 'xajax_deleteVideo('+ $(this).closest('li').attr('id').split('_')[1] +', "'+ $(this).closest('li').attr('id') +'")',
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
		
	{else}
		<div class="info">{$lang.no_video_allowed}</div>
	{/if}
	
	{rlHook name='addVideoBottom'}
</div>

<!-- add listing video end -->