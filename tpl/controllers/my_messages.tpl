<!-- saved search tpl -->

{if !empty($contact)}	
	{if empty($messages)}
	
		<div class="text-message">{$lang.no_messages}</div>
		
	{else}

		<div id="messages_cont">
			<ul id="messages_area">
				{include file='blocks'|cat:$smarty.const.RL_DS|cat:'messages_area.tpl'}
			</ul>
		</div>

		<div class="send-controls">
			<textarea rows="4" cols="" id="message_text"></textarea>
			<div><input onclick="xajax_sendMessage('{$contact.ID}', $('#message_text').val(), {if $contact.Admin}1{else}0{/if});" type="button" value="{$lang.send}" /></div>
		</div>		
		
		<script src="http://maps.googleapis.com/maps/api/js?libraries=places&amp;sensor=false{if $smarty.const.RL_LANG_CODE != '' && $smarty.const.RL_LANG_CODE != 'en'}&amp;language={$smarty.const.RL_LANG_CODE}{/if}"></script>
		<script type="text/javascript">
		var period = {$config.messages_refresh};
		var message_count = 0;

		{literal}

		setInterval(function(){
			xajax_refreshMessagesArea('{/literal}{$contact.ID}{literal}');
		}, period*1000);
		
		$(document).ready(function(){
			message_count = $('ul#messages_area > li').length;

			$('#messages_cont').mCustomScrollbar({
				advanced: {	updateOnContentResize: true }
			});
			$('#messages_cont').mCustomScrollbar('scrollTo', 'bottom');
			
			messageRemoveHandler();

			$('#message_text').textareaCount({
				'maxCharacterSize': rlConfig['messages_length'],
				'warningNumber': 20
			});
			
			$('#message_text').keydown( function(e) {
				if ( e.ctrlKey && e.keyCode == 13 ) {
					{/literal}xajax_sendMessage('{$contact.ID}', $(this).val(), {if $contact.Admin}1{else}0{/if});{literal}
				}
			});

			flynaxTpl.accountDetails();
		});
		

		var messageRemoveHandler = function() {
			$('#messages_area li > span').each(function(){
				var id = $(this).parent().attr('id').split('_')[1];
				$(this).flModal({
					caption: '{/literal}{$lang.warning}{literal}',
					content: '{/literal}{$lang.remove_message_notice}{literal}',
					prompt: 'mRemoveMsg('+id+')',
					width: 'auto',
					height: 'auto'
				});
			});
		}

		var checkboxControl = function(){
			messageRemoveHandler();

			var length = $('ul#messages_area > li').length;

			if ( length > message_count ) {
				$('#messages_cont').mCustomScrollbar('scrollTo', 'bottom');
			}

			message_count = length;
		}

		var mRemoveMsg = function(id) {			
			if ( id ) {
				xajax_removeMsg(id, {/literal}{$contact.ID}{literal});
			}
		}
		
		{/literal}
		</script>
		
	{/if}

{else}

	{if !empty($contacts)}
		<div class="content-padding">
			<table class="list contacts-list">
			<tr class="header">
				<td class="last" style="width: 23px;">
					<label><input class="inline" type="checkbox" id="check_all" /></label>
				</td>
				<td style="width: 200px;">{$lang.user}</td>
				<td>{$lang.message}</td>			
			</tr>
			{foreach from=$contacts item='item' name='searchF' key='contact_id'}
				{assign var='status_key' value=$item.Status}
				<tr class="body" id="item_{$contact_id}">
					<td>
						<label><input type="checkbox" name="del_mess" class="inline del_mess" id="contact_{$item.From}" /></label>
					</td>
					<td valign="top">
						<div class="picture">
							<a href="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}.html?id={$item.From}{else}?page={$pageInfo.Path}&amp;id={$item.From}{/if}{if $item.Admin}&amp;administrator{/if}" title="{$lang.chat_with} {$item.Full_name}">
								<img class="account-picture" alt="{$item.Full_name}" src="{$rlTplBase}img/blank.gif" {if $item.Photo}style="background-image: url('{$smarty.const.RL_URL_HOME}files/{$item.Photo}');"{/if} />
								{if $item.Status == 'new' && $item.Count > 0}<span title="{$item.Count} {$lang.new_message}" class="new"></span>{/if}
							</a>
						</div>
					</td>
					<td class="info">
						<div class="name">{$item.Full_name}{if $item.Admin} <span>({$lang.website_admin})</span>{/if} {if $item.Status == 'new'}<span title="{$item.Count} {$lang.new_message}" class="new"></span>{/if}</div>
						<div class="date">{$item.Date|date_format:$smarty.const.RL_DATE_FORMAT}</div>

						<a href="{$rlBase}{if $config.mod_rewrite}{$pageInfo.Path}.html?id={$item.From}{else}?page={$pageInfo.Path}&amp;id={$item.From}{/if}{if $item.Admin}&amp;administrator{/if}">{$item.Message|nl2br|replace:'\n':'<br />'}</a>
					</td>
				</tr>
			{/foreach}
			</table>
			
			<div class="mass-actions">
				<a class="close remove_contacts" href="javascript:void(0)" title="{$lang.remove_selected_messages}">{$lang.remove_selected}</a>
			</div>
		</div>
		
		<script type="text/javascript">
		{literal}
		
		$(document).ready(function(){
			$('.del_mess').click(function(){
				if ( $('.del_mess:checked').length == 0 ) {
					$('#check_all').attr('checked', false);
				}
			});
			
			$('#check_all').click(function(){
				if ( $(this).is(':checked') ) {
					$('.del_mess').attr('checked', true);
				}
				else {
					$('.del_mess').attr('checked', false);
				}
			});
			
			$('.remove_contacts').click(function(){
				var ids = '';
				$('.del_mess').each(function(){
					if ( $(this).is(':checked') ) {
						ids += $(this).attr('id').split('_')[1]+',';
					}
				});
				ids = ids.substring(0, ids.length-1);
				
				if ( ids != '' ) {
					$(this).flModal({
						caption: '{/literal}{$lang.warning}{literal}',
						content: '{/literal}{$lang.remove_contact_notice}{literal}',
						prompt: 'xajax_removeContacts("'+ ids +'")',
						width: 'auto',
						height: 'auto',
						click: false
					});
				}
			});
		});
		
		{/literal}
		</script>
		
	{else}
		<div class="text-message">{$lang.no_messages}</div>
	{/if}
{/if}

<!-- saved search tpl end -->